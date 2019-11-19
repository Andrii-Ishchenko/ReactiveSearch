import {Graph} from './graph.js'

export default function parseGraph(str, binaryWeights){

    var arr = str.trim().split(/\s+/)

    let vertices_count = parseInt(arr[0]);
    let edges_count = parseInt(arr[1]);

    console.log(vertices_count+"|"+edges_count);

    var g = new Graph(vertices_count, edges_count);
    let from_arr = new Array(edges_count);
    let to_arr = new Array(edges_count);
    let weights = new Array(edges_count);
    let from, to, w;

    if(binaryWeights){
        for(let i = 0; i < edges_count; i++ )
        {
            from = parseInt(arr[2 + 2*i]);
            from--;

            to = parseInt(arr[2 + 2*i + 1]);       
            to--;         

            //console.log(from + "->" + to);
            from_arr[i] = from;
            to_arr[i] = to;
            weights[i] = 1;
        }
    }
    else {
        for(let i = 0; i < edges_count; i++ )
        {
            from = parseInt(arr[2 + 3*i]);
            from--;
    
            to = parseInt(arr[2 + 3*i + 1]);       
            to--;
    
            w = parseInt(arr[2 + 3*i + 2]);
    
           // console.log(from + "->" + to);
            from_arr[i] = from;
            to_arr[i] = to;
            weights[i] = w;
        }
    }
    
    g.add_conections(from_arr, to_arr, weights);
    return g;
}