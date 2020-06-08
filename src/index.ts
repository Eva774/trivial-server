import WebSocket from 'ws';
import { GameState } from '../../dsptw-client/src/models/GameState';
import { SocketCommand } from '../../dsptw-client/src/models/SocketCommand';
import { SocketEvent } from '../../dsptw-client/src/models/SocketEvent';
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

        switch (data.command as SocketCommand) {
            case SocketCommand.StartTime:
                game.startTime();
                break;
            case SocketCommand.StopTime:
                game.stopTime();
                break;
            case SocketCommand.CorrectAnswer:
                game.correctAnswer(data.foundIndex, data.playerIndex);
                break;
            case SocketCommand.NextQuestion:
                game.nextQuestion();
                break;
            case SocketCommand.SetCurrentQuestion:
                game.setCurrentQuestion(data.currentQuestion);
                break;
            case SocketCommand.NextImage:
                game.nextImage();
                break;
            case SocketCommand.SetView:
                game.setView(data.view);
                break;
            case SocketCommand.NextRound:
                game.nextRound();
                break;
            case SocketCommand.NextStartingPlayer:
                game.nextStartingPlayer();
                break;
            case SocketCommand.NextPlayerToComplete:
                game.nextPlayerToComplete();
                break;
            case SocketCommand.SetPlayerName:
                game.setPlayerName(data.playerIndex, data.name);
                break;
            case SocketCommand.SetPlayerTime:
                game.setPlayerTime(data.playerIndex, data.time);
                break;
            default:
                log.warn('not a valid socket command');
        }
    });
    // TODO make consistent with other events
    socket.send(JSON.stringify({ version: '0.1' }));
    socket.send(JSON.stringify({
        event: SocketEvent.GameStateUpdate,
        data: game.getState(),
    }));
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
