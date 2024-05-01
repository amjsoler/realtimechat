import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log('Server started on http://localhost:8080');
})

wss.on('connection', function connection(ws) {
    console.log("A User has been connected")

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    //.send('something');
});

/*
//TODO:
[X] Inicializar el servidor en X puerto
[X] Manejador de conexiones entrantes al chat
[ ] manejador para cuando entra un nuevo mensaje al chat
[ ] manejador para cuando alguien escribe una letra
[ ] manejador para cuando alguien se desconecta del chat
 */