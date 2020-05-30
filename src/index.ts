import WebSocket from 'ws';
import { Game } from './Game';
import { log } from './Log';
import { GameState } from './models/GameState';

const server = new WebSocket.Server({ port: 8080 });
const sockets: WebSocket[] = [];

const game = new Game();

server.on('connection', (socket) => {
    socket.on('message', (rawData) => {
        log.debug(`received from a client: ${rawData}`);

        let data;
        try {
            data = JSON.parse(rawData.toString());
        } catch (e) {
            log.warn('Received invalid JSON');
            return;
        }

        switch (data.command) {
            case 'startTime':
                game.startTime();
                break;
            case 'stopTime':
                game.stopTime();
                break;
            case 'correctAnswer':
                game.correctAnswer(data.foundIndex, data.playerIndex);
                break;
            case 'nextQuestion':
                game.nextQuestion();
                break;
            case 'nextRound':
                game.nextRound();
                break;
            case 'nextPlayer':
                game.nextPlayer();
                break;
            default:
                console.warn('not a command');
        }
    });
    socket.send(JSON.stringify({ version: '0.1' }));
    socket.on('close', () => {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    sockets.push(socket);
});

game.on('update', (gameState: GameState) => {
    broadcast('update', gameState);
});

function broadcast(event: string, data: any) {
    for (const socket of sockets) {
        socket.emit(event, JSON.stringify(data));
    }
}

log.info('De Slimste Preparees ter wereld server started on port 8080');
