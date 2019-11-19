export class State {

    //ADD callback on x or F change

    constructor(N){
        this.N = N;
        this.X = new Array(N);
        this.F = 0;

        for (let i = 0; i < this.N; i++) {
            this.X[i] = Math.floor(Math.random() * 2);
        }

    }
}