export class Board {
    constructor(graph) {
        this.canvas = null;
        this.ctx = null;
        this.graph = graph;
        this.X = new Array(this.graph.N_vertices);
    }

    init() {
        for (let i = 0; i < this.graph.N_vertices; i++) {
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
        let stepH = (this.canvas.height - 2 * offsetH) / (this.graph.N_vertices + 1);
        let alphaStep = 2*Math.PI / this.graph.N_vertices;
        let centerX = this.canvas.width/2;
        let centerY = this.canvas.height/2;
        let R = 0.8 * Math.min(centerX, centerY);
        let R2 = 0.85 * Math.min(centerX, centerY);
        this.ctx.font = "20px serif";
        for (let i = 0; i < this.graph.N_vertices; i++) {
            /*
            this.ctx.beginPath();
            if (this.X[i]) {
                this.ctx.arc(this.canvas.width - offsetW, offsetH + stepH * (i + 1), 3, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            else {
                this.ctx.arc(offsetW, offsetH + stepH * (i + 1), 3, 0, 2 * Math.PI);
                this.ctx.fill();
            }
            */

            this.ctx.beginPath();
            if (this.X[i]) {
                this.ctx.arc(centerX + R * Math.sin(i*alphaStep) , centerY + R * Math.cos(i*alphaStep - Math.PI), 3, 0, 2 * Math.PI);
                this.ctx.stroke();
           
                this.ctx.fillText(i, centerX + R2 * Math.sin(i*alphaStep) , centerY + R2 * Math.cos(i*alphaStep - Math.PI))

            }
            else {
                this.ctx.arc(centerX + R * Math.sin(i*alphaStep) , centerY + R * Math.cos(i*alphaStep - Math.PI), 3, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.fillText(i, centerX + R2 * Math.sin(i*alphaStep) , centerY + R2 * Math.cos(i*alphaStep - Math.PI))
            }


        }

        for(let i=0; i<this.graph.N_vertices; i++){
            for(let j=this.graph.beg_list_edges[i]; j<this.graph.beg_list_edges[i+1];j++){
                let v1 = i;
                let v2 = this.graph.list_nodes_var[j];

                if(v1 < v2){
                    this.ctx.beginPath();
                    this.ctx.moveTo(centerX + R * Math.sin(v1*alphaStep) , centerY + R* Math.cos(v1*alphaStep - Math.PI));
                    this.ctx.lineTo(centerX + R * Math.sin(v2*alphaStep) , centerY + R* Math.cos(v2*alphaStep - Math.PI));
                    this.ctx.stroke();
                }
            }
        }
    }
}

