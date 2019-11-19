import {Board} from './board.js'
import loadFile from './loadFile.js';
import parseGraph from './parseGraph.js';
import { State } from './state.js';

document.getElementById('graph-file')
  .addEventListener('change', onFileSelected, false);

let graph;
let board;

async function onFileSelected(e){
    var fileContent = await loadFile(e);

    graph = parseGraph(fileContent);
    var vertical = document.getElementById('graph-orientation')
    var canvas = document.getElementById("graph-cut");
   
    var state = new State(graph.N_vertices);

    board = new Board(graph, canvas,state,  vertical);
    board.init();
    board.draw();

    graph.calculateF(state);
    board.updateF();


    vertical.addEventListener("change", () => board.change_orietation(true), false)

}

