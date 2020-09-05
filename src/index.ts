import WebSocket, { AddressInfo } from 'ws';
import express from 'express';
import http from 'http';
import { GameState } from '../../dsptw-client/src/models/GameState';
import { SocketCommand } from '../../dsptw-client/src/models/SocketCommand';
import { SocketEvent } from '../../dsptw-client/src/models/SocketEvent';
import { GameEvent } from '../../dsptw-client/src/models/GameEvent';
import { Game } from './Game';
import { log } from './Log';
import { version } from '../package.json';
import { config } from './Config';
import { GameEmitType } from './GameEmitType';

(async () => {
    const app = express();
    app.use('/static', express.static(config.staticAssets))
    app.use(express.static(config.staticClient))
    const server = http.createServer(app);
    const socketServer = new WebSocket.Server({ server })

    const sockets: WebSocket[] = [];

    const game = new Game();
    await game.loadEpisode(config.episode);

    socketServer.on('connection', (socket) => {
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
                case SocketCommand.PreviousQuestion:
                    game.nextQuestion();
                    break;
                case SocketCommand.NextQuestion:
                    game.nextQuestion();
                    break;
                case SocketCommand.PreviousRound:
                    game.previousRound();
                    break;
                case SocketCommand.NextRound:
                    game.nextRound();
                    break;
                case SocketCommand.PlayVideo:
                    broadcast(SocketEvent.PlayVideo, data.videoIndex);
                    break;
                case SocketCommand.PlayApplause:
                    broadcast(SocketEvent.GameEvent, GameEvent.Applause);
                    break;
                default:
                    log.warn('not a valid socket command');
            }
        });
        socket.send(JSON.stringify({
            event: SocketEvent.Version,
            data: version
        }));
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

    game.on(GameEmitType.GameStateUpdate, (gameState: GameState) => {
        broadcast(SocketEvent.GameStateUpdate, gameState);
    });

    game.on(GameEmitType.GameEvent, (gameEvent: GameEvent) => {
        broadcast(SocketEvent.GameEvent, gameEvent);
    });

    function broadcast(event: string, data: any) {
        for (const socket of sockets) {
            socket.send(JSON.stringify({
                event,
                data,
            }));
        }
    }

    server.listen(config.port, () => {
        const address = server.address() as AddressInfo;
        if (!address) {
            log.error('Error creating server');
            process.exit(-1);
        } else {
            log.info(`Trivial time players view is available at http://localhost:${address.port}`);
            log.info(`Presenter view available at http://localhost:${address.port}/?presenter=true`);
        }
    });
})();

