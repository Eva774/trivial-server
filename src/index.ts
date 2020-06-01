import WebSocket from 'ws';
import { GameState } from '../../dsptw-common/models/GameState';
import { SocketEvent } from '../../dsptw-common/models/SocketEvent';
import { Game } from './Game';
import { log } from './Log';

// TODO set port in config
const server = new WebSocket.Server({ port: 8080 });
const sockets: WebSocket[] = [];

const game = new Game();

server.on('connection', (socket) => {
    log.debug('New socket connection incoming');
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
            case 'setPlayerName':
                game.setPlayerName(data.playerIndex, data.name);
                break;
            case 'setPlayerTime':
                game.setPlayerTime(data.playerIndex, data.time);
                break;
            default:
                log.warn('not a command');
        }
    });
    // TODO make consistent with other events
    socket.send(JSON.stringify({ version: '0.1' }));
    broadcast(SocketEvent.GameStateUpdate, game.getState());
    socket.on('close', () => {
        log.debug('Socket connection closed');
        sockets.splice(sockets.indexOf(socket), 1);
    });
    sockets.push(socket);
});

game.on('gameStateUpdate', (gameState: GameState) => {
    broadcast(SocketEvent.GameStateUpdate, gameState);
});

function broadcast(event: string, data: any) {
    for (const socket of sockets) {
        socket.send(JSON.stringify({
            event,
            data,
        }));
    }
}

log.info('De slimste Preparees server started on port 8080');
