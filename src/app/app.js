import {Graph} from './graph.js'
import {Board} from './board.js'
import loadFile from './loadFile.js';
import parseGraph from './parseGraph.js';

document.getElementById('graph-file')
  .addEventListener('change', onFileSelected, false);

let graph;
let board;

async function onFileSelected(e){
    var fileContent = await loadFile(e);

    graph = parseGraph(fileContent);

    board = new Board(graph);
    board.init();
    board.draw();
}

