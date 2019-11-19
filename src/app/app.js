import {Board} from './board.js'
import loadFile from './loadFile.js';
import parseGraph from './parseGraph.js';
import { State } from './state.js';
import tabu from './tabu.js';

document.getElementById('graph-file')
  .addEventListener('change', onFileSelected, false);

let graph;
let board;
let state;
let run  = false;
let runInterval;
let drawInterval;

async function onFileSelected(e){
    var fileContent = await loadFile(e);

    var binaryWeights = document.getElementById('graph-binary-weights').checked
    graph = parseGraph(fileContent, binaryWeights);
    
    var vertical = document.getElementById('graph-orientation')
    var edges = document.getElementById('graph-edges')
    var canvas = document.getElementById("graph-cut");
    var newX = document.getElementById('newX');
    var tabu_next_step = document.getElementById('tabu_make_step');
    var tabu_run = document.getElementById('tabu_run')

    state = new State(graph.N_vertices);
    state.random();

    board = new Board(graph, canvas, state, vertical, edges);
    board.resize();
    graph.calculateF(state);
    board.updateF();
    board.draw();



    vertical.addEventListener("change", () => board.change_orietation(true), false)
    edges.addEventListener("change", () => board.change_drawEdges(true), false)
    
    tabu_run.addEventListener("click", ()=>{
      run = !run;
      tabu_run.value = run ? "Stop" : "Run";
      if(run){
        runInterval = setInterval(run_tabu, 10)
        drawInterval = setInterval(()=> {board.update()}, 350)
      }
      else {
        clearInterval(runInterval);
        clearInterval(drawInterval);
      }

    })

    newX.addEventListener("click", 
      () => {
        state.random();
        graph.calculateF(state);
        board.updateF();
        board.draw();
      }, false)

    tabu_next_step.addEventListener("click",
      () => {
        tabu(graph, state);
        board.update();
    },false)


}

function run_tabu(){
  tabu(graph, state)
}

