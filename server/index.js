import { WebSocketServer } from 'ws';
import  ChatController  from './controllers/ChatController.js';

const port = process.env.WS_SERVER_PORT ?? 8080

const chatController = new ChatController()

//Create a new WebSocketServer
const wss = new WebSocketServer({ port: port }, () => {
    console.log(`WebSocket server started on localhost:${port}`)
})

//Incoming connection handler
wss.on('connection', function connection(ws) {
    //restore all messages on connection
    if(process.env.RESTORE_CHAT_HISTORY_ON_CONNECT == true){
        chatController.getMessages().then((result) => {
            if(result.code === 0){
                ws.send(JSON.stringify({msgType: "chatHistory", data: result.data}))
            }
            else{
                console.log(result.data)
            }
        })
    }

    //Incoming message handler
    ws.on('message', function message(data) {
        try {
            const jsonData = JSON.parse(data)

            //Check the type of the message (message, typing)
            if(jsonData.msgType === "message")
                saveMessageHandler(data)
            else if(jsonData.msgType === "typing")
                saveTypingHandler(data)

        }catch(e){
            console.log("Error parsing JSON data")
        }
    })
})

function saveMessageHandler(data) {
    let lastMessage = null

    chatController.saveMessage(JSON.parse(data)).then((result) => {

        if(result.code === 0){
            chatController.getLastMessage().then((result) => {
                if(result.code === 0){
                    lastMessage = result.data

                    //Send message to all connected users
                    wss.clients.forEach(function each(client) {
                        client.send(JSON.stringify({msgType: "lastMessage", data: lastMessage}))
                    });
                }
                else{
                    console.log(result.data)
                }
            })
        }else{
            console.log(result.data)
        }
    })
}

function saveTypingHandler(data) {
    chatController.updateTypingMessageInStorage(JSON.parse(data)).then((result) => {
        if(result.code === 0){
            let lastTypingMessage = null

            chatController.getLastTypingMessageOfUser(JSON.parse(data).user).then((getLastMessageResult) => {
                if(getLastMessageResult.code === 0){
                    lastTypingMessage = getLastMessageResult.data

                    //Send message to all connected users
                    wss.clients.forEach(function each(client) {
                        client.send(JSON.stringify({msgType: "typing", data: getLastMessageResult.data}))
                    });
                }
                else{
                    console.log(getLastMessageResult.data)
                }
            })
        }else{
            console.log(result.data)
        }
    })
}