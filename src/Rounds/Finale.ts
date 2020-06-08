import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { FinaleState } from '../../../dsptw-client/src/models/Rounds/FinaleState';
import { log } from '../Log';
import { Round } from './Round';

export class Finale extends Round {

    public currentPlayerIds: number[] = [0, 1];
    private state: FinaleState;
    private currentAnsweringPlayerIdIndex = 0;
    private players: PlayerState[];

    constructor(players: PlayerState[]) {
        super();
        this.players = players;
        this.state = {
            roundName: RoundName.Finale,
            currentQuestionIndex: 0,
            questions: [
                {
                    answers: [
                        {
                            found: false,
                            text: 'Gebakken patatten',
                        },
                        {
                            found: false,
                            text: 'Gekookte patatten',
                        },
                        {
                            found: false,
                            text: 'Puree',
                        },
                        {
                            found: false,
                            text: 'Kroketten',
                        },
                        {
                            found: false,
                            text: 'Frietjes',
                        },
                    ],
                    question: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            found: false,
                            text: 'Gebakken patatten',
                        },
                        {
                            found: false,
                            text: 'Gekookte patatten',
                        },
                        {
                            found: false,
                            text: 'Puree',
                        },
                        {
                            found: false,
                            text: 'Kroketten',
                        },
                        {
                            found: false,
                            text: 'Frietjes',
                        },
                    ],
                    question: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            found: false,
                            text: 'Gebakken patatten',
                        },
                        {
                            found: false,
                            text: 'Gekookte patatten',
                        },
                        {
                            found: false,
                            text: 'Puree',
                        },
                        {
                            found: false,
                            text: 'Kroketten',
                        },
                        {
                            found: false,
                            text: 'Frietjes',
                        },
                    ],
                    question: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            found: false,
                            text: 'Gebakken patatten',
                        },
                        {
                            found: false,
                            text: 'Gekookte patatten',
                        },
                        {
                            found: false,
                            text: 'Puree',
                        },
                        {
                            found: false,
                            text: 'Kroketten',
                        },
                        {
                            found: false,
                            text: 'Frietjes',
                        },
                    ],
                    question: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            found: false,
                            text: 'Gebakken patatten',
                        },
                        {
                            found: false,
                            text: 'Gekookte patatten',
                        },
                        {
                            found: false,
                            text: 'Puree',
                        },
                        {
                            found: false,
                            text: 'Kroketten',
                        },
                        {
                            found: false,
                            text: 'Frietjes',
                        },
                    ],
                    question: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            found: false,
                            text: 'Gebakken patatten',
                        },
                        {
                            found: false,
                            text: 'Gekookte patatten',
                        },
                        {
                            found: false,
                            text: 'Puree',
                        },
                        {
                            found: false,
                            text: 'Kroketten',
                        },
                        {
                            found: false,
                            text: 'Frietjes',
                        },
                    ],
                    question: 'aardappelen.mp4',
                },
            ],
        };
    }

    public init() {
        this.selectFinalPlayers();
    }

    public correctAnswer(answerIndex: number) {
        this.state.questions[this.state.currentQuestionIndex].answers[answerIndex].found = true;
        return { scoreForOtherPlayer: -20, otherPlayerId: this.getOtherPlayerId() };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        this.state.currentQuestionIndex++;
    }

    public calculateNextStartingPlayer() {
        this.currentAnsweringPlayerIdIndex = 1 - this.currentAnsweringPlayerIdIndex;

    }

    public calculateNextPlayerToComplete() {
        this.currentAnsweringPlayerIdIndex = 1 - this.currentAnsweringPlayerIdIndex;
    }

    public getCurrentPlayerId() {
        return this.currentPlayerIds[this.currentAnsweringPlayerIdIndex];
    }

    private selectFinalPlayers() {
        log.debug('Selecting final players, removing player with HIGHEST time');
        // TODO add select lowest or highest in config
        // get ID of player with highest time
        let playerWithLowestTimeId = 0;
        for (let i = 1; i < this.players.length; i++) {
            if (this.players[i].time > this.players[playerWithLowestTimeId].time) {
                playerWithLowestTimeId = i;
            }
        }
        this.currentPlayerIds = this.currentPlayerIds.filter((player) => player !== playerWithLowestTimeId);

        const winner = this.players[playerWithLowestTimeId];
        log.info('player', winner.name, 'won with a time of', winner.time);
    }

    /**
     * Only to be called in the final round when there are two players left.
     */
    private getOtherPlayerId() {
        return this.currentPlayerIds[1 - this.currentAnsweringPlayerIdIndex]; // if you are ninja

        // If you are not a ninja
        // if (this.currentPlayerIds.indexOf(this.currentAnsweringPlayerIdIndex) === 0) {
        //     return 1;
        // } else {
        //     return 0;
        // }
    }

}
