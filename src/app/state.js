export class State {

    //ADD callback on x or F change

    constructor(N){
        this.N = N;
        this.X = new Array(N).fill(0);
        this.F = 0;
    }

    random(){
        for (let i = 0; i < this.N; i++) {
            this.X[i] = Math.floor(Math.random() * 2);
        }
    }
}