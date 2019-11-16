export class Board {
    constructor(graph) {
        this.canvas = null;
        this.ctx = null;
        this.graph = graph;
        this.X = [];
        this.N = graph.N;
    }

    init() {
        for (let i = 0; i < this.N; i++) {
            this.X[i] = Math.floor(Math.random() * 2);
        }
        this.canvas = document.getElementById("graph-cut");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.width = '50%';
        this.canvas.style.height = '100%';
        this.canvas.height = this.canvas.offsetHeight;
        this.canvas.width = this.canvas.offsetWidth;
    }

    draw() {
        let offsetW = 30;
        let offsetH = 30;
        let stepH = (this.canvas.height - 2 * offsetH) / (this.N + 1);
        for (let i = 0; i < this.N; i++) {
            this.ctx.beginPath();
            if (this.X[i]) {
                this.ctx.arc(this.canvas.width - offsetW, offsetH + stepH * (i + 1), 6, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            else {
                this.ctx.arc(offsetW, offsetH + stepH * (i + 1), 6, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
}

