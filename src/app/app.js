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
    var edges = document.getElementById('graph-edges')
    var canvas = document.getElementById("graph-cut");
    var newX = document.getElementById('newX');
    var state = new State(graph.N_vertices);
    state.random();

    board = new Board(graph, canvas,state, vertical, edges);
    board.resize();
    board.draw();

    graph.calculateF(state);
    board.updateF();


    vertical.addEventListener("change", () => board.change_orietation(true), false)
    edges.addEventListener("change", () => board.change_drawEdges(true), false)
    
    newX.addEventListener("click", 
      () => {
        state.random();
        graph.calculateF(state);
        board.updateF();
        board.draw();
      }
      ,false)

}

