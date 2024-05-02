import { WebSocketServer } from 'ws';
import  ChatController  from './controllers/ChatController.js';
import {chatRepository} from "./repositories/ChatRepository.js";

//TODO: Refactor port number into env file
const port = 8080

const chatController = new ChatController()

//Create a new WebSocketServer
const wss = new WebSocketServer({ port: port }, () => {
    console.log(`WebSocket server started on localhost:${port}`)
})

//Incoming connection handler
wss.on('connection', function connection(ws) {
    ws.send("A User has been connected")
    console.log("A User has been connected")

    //Log websocket errors
    ws.on('error', console.error);

    //Incoming message handler
    ws.on('message', function message(data) {
        try {
            chatController.saveMessage(JSON.parse(data))

            console.log(chatRepository)
        }catch(e){
            console.log("Error parsing JSON data")
        }
    });

    ws.on("close", function disconnect() {
        //TODO: Aquí se podría mandar un mensaje a todos los usuarios para informar de que alguien se ha desconectado
        console.log("A User has been disconnected")
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