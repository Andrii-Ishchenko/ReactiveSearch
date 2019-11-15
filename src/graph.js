let canvas;
let context;
let graph = [];
let X = [];
let N = 20;


function init(){
    for(let i = 0; i < N; i++){
        X[i] =   Math.floor(Math.random() * 2);
    }

    canvas = document.getElementById("graph-cut");
    ctx = canvas.getContext("2d");
    canvas.style.width ='50%';
    canvas.style.height='100%';
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    draw_graph();
}

function draw_graph(){
    
    var offsetW = 30;
    var offsetH = 30;
    var stepH = (canvas.height - 2*offsetH) / (N+1);

    for(let i = 0; i < N; i++){
        ctx.beginPath();
        if (X[i]){
            ctx.arc(canvas.width - offsetW, offsetH + stepH*(i+1), 6, 0, 2 * Math.PI);
            ctx.stroke();
        } else {
            ctx.arc(offsetW, offsetH + stepH*(i+1), 6, 0, 2 * Math.PI);
            ctx.fill();
        }           
    }
    
}

init();