export default function tabu(graph, state){
 let best_neighbour_index = -1;
 let best_neighbour_delta_f = Number.MIN_SAFE_INTEGER;
 // TODO: ADD aspiration criteria

 state.step++;

 var neighbourhood = getNeighbourhood(graph, state);

 neighbourhood.forEach(i=>{
     let deltaF = graph.getDeltaF(i, state);
     state.neighbourhoodValues[i] = deltaF;

     
     if(deltaF > best_neighbour_delta_f){
         best_neighbour_index = i;
         best_neighbour_delta_f = deltaF;
     } 
     else if ( deltaF == best_neighbour_delta_f){
        //skip some items, sometimes
        if(Math.floor(Math.random() * 100) <15){
            best_neighbour_index = i;
            best_neighbour_delta_f = deltaF;
        }
     }
 });

 state.X[best_neighbour_index] = 1 - state.X[best_neighbour_index];
 state.last_used[best_neighbour_index] = state.step;

 if(state.F + best_neighbour_delta_f > state.F){
     state.F += best_neighbour_delta_f;
 }

 if(state.F > state.best_F){
    state.best_F = state.F;
    state.saveX();

    console.dir({F: state.best_F, step: state.step, X: state.best_X});
 }

}

function getNeighbourhood(graph, state){
    var arr =[];
    for(let i=0; i < graph.N_vertices; i++){
        if(state.step - state.last_used[i] >= state.tabu_size)
            arr.push(i)
    }
    return arr;
}
