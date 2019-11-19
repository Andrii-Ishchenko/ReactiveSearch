export class State {

    //ADD callback on x or F change

    constructor(N){
        this.N = N;
        
        this.X = new Array(N).fill(0);
        this.best_X = new Array(N).fill(0); 
        
        this.F = 0;
        this.best_F = 0;

        
        this.tabu_size = Math.min(N/10, 55);
        this.last_used = new Array(N).fill(-this.tabu_size); // tabu list
        this.step = 0;

        this.neighbourhoodValues = new Array(N).fill(0);

    }

    random(){
        for (let i = 0; i < this.N; i++) {
            this.X[i] = Math.floor(Math.random() * 2);
        }
    }

    saveX(){
        this.best_X = this.X.slice();           
    }
}