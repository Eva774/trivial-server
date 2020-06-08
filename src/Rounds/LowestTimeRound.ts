import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { log } from '../Log';
import { Round } from './Round';

export abstract class LowestTimeRound extends Round {

    private playerStartingOrder: number[] = [0, 1, 2];
    private playerCompleteOrder: number[] = [0, 1, 2];
    private players: PlayerState[];

    constructor(players: PlayerState[]) {
        super();
        this.players = players;

    }

    public calculateNextStartingPlayer() {
        log.debug('calculateNextStartingPlayer');
        log.debug('playerStartingOrder before', this.playerStartingOrder);
        log.debug('playerCompleteOrder before', this.playerCompleteOrder);
        if (this.playerStartingOrder.length >= 2) {
            // next player is the one who has the lowest score *now*
            this.playerStartingOrder.shift();
            this.playerStartingOrder.sort((a, b) => this.players[a].time - this.players[b].time);
            const firstPlayer = this.playerStartingOrder[0];

            const otherPlayers = [0, 1, 2]
                .filter((player) => player !== firstPlayer)
                .sort((a, b) => this.players[a].time - this.players[b].time);
            this.playerCompleteOrder = [firstPlayer, ...otherPlayers];
            log.debug('playerStartingOrder after', this.playerStartingOrder);
            log.debug('playerCompleteOrder after', this.playerCompleteOrder);
        }
    }

    public calculateNextPlayerToComplete() {
        if (this.playerCompleteOrder.length >= 2) {
            this.playerCompleteOrder.shift();
        }
    }

    public getCurrentPlayerId() {
        return this.playerCompleteOrder[0];
    }

    public init() {
        this.playerStartingOrder.sort((a, b) => this.players[a].time - this.players[b].time);
        this.playerCompleteOrder.sort((a, b) => this.players[a].time - this.players[b].time);
    }
}
