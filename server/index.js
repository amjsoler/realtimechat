import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log('Server started on localhost:8080');
})

let chatHistory = []
let lastMessage = 0

wss.on('connection', function connection(ws) {
    const isBinary = false;

    console.log("A User has been connected")

    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {

        //TODO: Aquí habría que comprobar el tipo del mensaje para discernir si es un mensaje completo o una única letra

        const dataParsed = JSON.parse(data)

        chatHistory.push(dataParsed)
        console.log(chatHistory)
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