import {Graph} from './graph.js'

export default function parseGraph(str){

    var arr = str.trim().split(/\s+/)

    let N = arr[0];
    let edges_count = arr[1];

    console.log(N+"|"+edges_count);

    for(let i = 0; i < edges_count; i++ )
    {
        console.log(arr[2 + 3*i] + " " + arr[2 + 3*i+1]);
    }

    return new Graph(N,edges_count);
}