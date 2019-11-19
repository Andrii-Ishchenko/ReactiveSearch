//C++ style graph
export class Graph {
    constructor(n_vertices, n_edges) {
        this.N_vertices = n_vertices;   
        this.N_edges = n_edges;

        this.N_con_edges = new Array(this.N_vertices); // arr[i] === how much edges does i-th vertex have.        
        this.beg_list_edges = new Array(this.N_vertices+1); // arr[i] === start index of edges from i-th vertice in all-edges list 
        this.list_edges_var = new Array(2*this.N_edges); // indexes
        this.list_nodes_var = new Array(2*this.N_edges);
        this.edges_weight = new Array(this.N_edges);//i-th === weight of i-th edge       

        this.N_con_edges.fill(0);
        this.beg_list_edges.fill(0);
        this.list_edges_var.fill(0);
        this.list_nodes_var.fill(0);
        this.edges_weight.fill(0);
    }

    add_conections(from, to, weights){
        for(let i=0; i < this.N_edges; i++){
            let v1_id = from[i];
            let v2_id = to[i];

            this.N_con_edges[v1_id] = this.N_con_edges[v1_id] + 1;
            this.N_con_edges[v2_id] =this.N_con_edges[v2_id] + 1;
            this.edges_weight[i] = weights[i];      
        }

        this.beg_list_edges[0] = 0;

        for(let i=0; i < this.N_vertices; i++){
            this.beg_list_edges[i+1] = this.beg_list_edges[i] + this.N_con_edges[i];
        }

        for(let i=0; i < this.N_vertices; i++){
           this.N_con_edges[i] = 0; // fill 0 to use them in calculating i-th position in list_edges_var in next cycle
        }

        for(let i=0; i < this.N_edges; i++){
            let v1_id = from[i];
            let v2_id = to[i];

            this.list_edges_var[this.beg_list_edges[v1_id] + this.N_con_edges[v1_id] ] = i;
            this.list_edges_var[this.beg_list_edges[v2_id] + this.N_con_edges[v2_id] ] = i;
            this.list_nodes_var[this.beg_list_edges[v1_id] + this.N_con_edges[v1_id]] = v2_id;
            this.list_nodes_var[this.beg_list_edges[v2_id] + this.N_con_edges[v2_id]] = v1_id;
            this.N_con_edges[v1_id]++;
            this.N_con_edges[v2_id]++;
        }

        console.dir(this);
    }

    is_connected(v1,v2){

        for(let i = this.beg_list_edges[v1]; i< this.beg_list_edges[v1+1]; i++){
            if(this.list_nodes_var[i] == v2){
                return true;
            }
        }
        return false;

        //OR : fast but not always correct
        return (this.edges_weight[v1,v2] != 0);

    }

    calculateF(state){
        var f = 0;
        for(let i=0; i< this.N_vertices; i++){
            if(state.X[i] == 1){
                for(let j = this.beg_list_edges[i]; j < this.beg_list_edges[i+1]; j++){
                        let k = this.list_nodes_var[j];
                        if(state.X[k] == 0){
                            f += this.edges_weight[this.list_edges_var[j]];
                        }

                }
            }
        }
        state.F = f;
    }

    getEdgesFrom(i, state){
        var output=[];
        if(state.X[i]){
            for(let j = this.beg_list_edges[i]; j < this.beg_list_edges[i+1]; j++){
                let k = this.list_nodes_var[j];
                    if(state.X[k] == 0) 
                        output.push(k);                  
            }
        }
        return output;
    }

    getDeltaF(i, state){
        var k=0, delta=0;
        if(state.X[i] == 1){
            for(let j = this.beg_list_edges[i]; j < this.beg_list_edges[i+1]; j++){
                k = this.list_nodes_var[j];

                if(state.X[k] == 0)
                    delta -= this.edges_weight[this.list_edges_var[j]]
                else 
                    delta += this.edges_weight[this.list_edges_var[j]]
            }
        }
        else {
            for(let j = this.beg_list_edges[i]; j < this.beg_list_edges[i+1]; j++){
                k = this.list_nodes_var[j];

                if(state.X[k] == 0)
                    delta += this.edges_weight[this.list_edges_var[j]]
                else 
                    delta -= this.edges_weight[this.list_edges_var[j]]
            }
         }
         return delta;
    }
}
 