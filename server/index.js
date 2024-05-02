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
    if(process.env.RESTORE_CHAT_HISTORY_ON_CONNECT){
        chatController.getMessages().then((result) => {
            if(result.code === 0){
                ws.send(JSON.stringify(result.data))
            }
            else{
                console.log(result.data)
            }
        })
    }

    //Log websocket errors
    ws.on('error', console.error);

    //Incoming message handler
    ws.on('message', function message(data) {
        try {
            chatController.saveMessage(JSON.parse(data)).then((result) => {
                if(result.code === 0){
                    //Send message to all connected users
                    wss.clients.forEach(function each(client) {
                        chatController.getLastMessage().then((getLastMessageResult) => {
                            if(getLastMessageResult.code === 0){
                                client.send(JSON.stringify(getLastMessageResult.data))
                            }
                            else{
                                console.log(getLastMessageResult.data)
                            }
                        })
                    });
                }else{
                    console.log(result.data)
                }
            })
        }catch(e){
            console.log("Error parsing JSON data")
        }
    });

    ws.on("close", function disconnect() {
        //Send message to all connected users
        wss.clients.forEach(function each(client) {
            client.send("A user has disconnected")
        });
    })
});

/*
//TODO:
[X] Inicializar el servidor en X puerto
[X] Manejador de conexiones entrantes al chat
[X] manejador para cuando entra un nuevo mensaje al chat
[ ] manejador para cuando alguien escribe una letra
[ ] manejador para cuando alguien se desconecta del chat
 */