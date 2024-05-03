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
    if(process.env.RESTORE_CHAT_HISTORY_ON_CONNECT === "true"){
        const getMessagesResult = chatController.getMessages()

        if(getMessagesResult.code === 0){
            ws.send(JSON.stringify({msgType: "chatHistory", data: getMessagesResult.data}))
        }
        else{
            console.log(getMessagesResult.data)
        }
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
    try {
        const saveMessageResult = chatController.saveMessage(JSON.parse(data));

        if(saveMessageResult.code === 0){
            //Send message to all connected users
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({msgType: "lastMessage", data: saveMessageResult.data}))
            });
        }else{
            console.log(saveMessageResult.data)
        }
    }catch(e) {
        console.log("Error at saveMessageHandler", e)

    }
}

function saveTypingHandler(data) {
    try{
        const updateMessageResult = chatController.updateTypingMessageInStorage(JSON.parse(data));

        if(updateMessageResult.code === 0){
            //Send message to all connected users
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({msgType: "typing", data: updateMessageResult.data}))
            });
        }else{
            console.log(updateMessageResult.data)
        }
    }catch(e){
        console.log("Error at saveTypingHandler", e)
    }
}