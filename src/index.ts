import WebSocket from 'ws';
import { Game } from './Game';
import { GameState } from './models/GameState';

const server = new WebSocket.Server({ port: 8080 });
server.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log(`received from a client: ${message}`);
    });
    socket.send(JSON.stringify({ hey: 'ho' }));
});

const game = new Game();

game.on('update', (gameState: GameState) => {
    // TODO: send gameState to sockets
});
