import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { FinaleState } from '../../../dsptw-client/src/models/Rounds/FinaleState';
import { log } from '../Log';
import { Round } from './Round';

export class Finale extends Round {

    public currentPlayerIds: number[] = [0, 1, 2];
    private state: FinaleState;
    private currentAnsweringPlayerIdIndex = 0;
    private players: PlayerState[];

    constructor(players: PlayerState[], finale: any) {
        super();
        this.players = players;
        this.state = {
            roundName: RoundName.Finale,
            currentQuestionIndex: 0,
            questions: finale.questions
                .slice(finale.questionIndex)
                .map((question: { question: any; answers: any[]; }) => ({
                    question: question.question,
                    answers: question.answers.map((answer: any) => ({
                        text: answer,
                        found: false
                    }))
                }))
        };
    }

    public init() {
        this.selectFinalPlayers();
    }

    public correctAnswer(answerIndex: number) {
        this.state.questions[this.state.currentQuestionIndex].answers[answerIndex].found = true;
        const answersFound = this.state.questions[this.state.currentQuestionIndex].answers.filter(answer => answer.found).length;
        const allAnswersFound = answersFound === 5;
        return { scoreForOtherPlayer: -20, otherPlayerId: this.getOtherPlayerId(), allAnswersFound };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        this.state.currentQuestionIndex++;
        log.info('Current Finale question index: ' + this.state.currentQuestionIndex)
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

    public showAllAnswers(): void {
        this.state.questions[this.state.currentQuestionIndex].answers.forEach(answer => {
            answer.found = true;
        })
    }

    private selectFinalPlayers() {
        log.debug('Selecting final players, removing player with HIGHEST time');
        // TODO add select lowest or highest in config
        // get ID of player with highest time
        let playerWithHighestTimeId = 0;
        for (let i = 1; i < this.players.length; i++) {
            if (this.players[i].time > this.players[playerWithHighestTimeId].time) {
                playerWithHighestTimeId = i;
            }
        }
        console.log("currentplayerids finale1", this.currentPlayerIds)
        this.currentPlayerIds = this.currentPlayerIds.filter((playerId) => playerId !== playerWithHighestTimeId);

        console.log("currentplayerids finale2", this.currentPlayerIds)

        const winner = this.players[playerWithHighestTimeId];
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
