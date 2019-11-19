export class Board {
    constructor(graph,canvas,state, vertical_elem, edges_elem) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");;
        this.graph = graph;      
        this.state = state;
       
        this.vertical_elem = vertical_elem;
        this.vertical_orientation = false;
        this.change_orietation(false);

        this.drawedges_elem = edges_elem;
        this.draw_edges =false;
        this.change_drawEdges(false);
        console.dir(this);    
    }

    change_orietation(draw){
        this.vertical_orientation = this.vertical_elem.checked;


        if (draw){
            this.resize();
            this.draw();
        }
    }

    change_drawEdges(draw){
        this.draw_edges = this.drawedges_elem.checked
        if (draw) this.draw()
    }

    resize() {
        if(this.vertical_orientation){
            this.canvas.style.width = '100%';
        }else{
            this.canvas.style.width = '50%';
        }   

        this.canvas.style.height = '100%';
        this.canvas.height = this.canvas.offsetHeight;
        this.canvas.width = this.canvas.offsetWidth;
    }

    updateF(){
        document.getElementById("f-value").innerText = this.state.F;
    }

    draw() {
        let offsetW = 30;
        let offsetH = 30;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if(this.vertical_orientation){
            let stepW = (this.canvas.width - 2 * offsetW) / (this.graph.N_vertices + 1);
            for (let i = 0; i < this.graph.N_vertices; i++) {
                
                this.ctx.beginPath();
                if (this.state.X[i]) {
                    this.ctx.arc(offsetW + stepW * (i + 1), this.canvas.height - offsetH, 3, 0, 2 * Math.PI);
                    this.ctx.stroke();

                    if(this.draw_edges){
                        let edges = this.graph.getEdgesFrom(i, this.state);
                        edges.forEach(j => {   
                            this.ctx.beginPath();
                            this.ctx.moveTo(offsetW + stepW * (i + 1), this.canvas.height - offsetH)
                            this.ctx.lineTo(offsetW + stepW * (j + 1), offsetH);
                            this.ctx.stroke();
                        })
                    }  
                }
                else {
                    this.ctx.arc(offsetW + stepW * (i + 1), offsetH, 3, 0, 2 * Math.PI);                
                    this.ctx.fill();
                }
            }


        } 
        else {
            let stepH = (this.canvas.height - 2 * offsetH) / (this.graph.N_vertices + 1);
            let alphaStep = 2*Math.PI / this.graph.N_vertices;
            let centerX = this.canvas.width/2;
            let centerY = this.canvas.height/2;
            let R = 0.8 * Math.min(centerX, centerY);
            let R2 = 0.85 * Math.min(centerX, centerY);
            this.ctx.font = "20px serif";



            for (let i = 0; i < this.graph.N_vertices; i++) {
                
                this.ctx.beginPath();
                if (this.state.X[i]) {
                    this.ctx.arc(this.canvas.width - offsetW, offsetH + stepH * (i + 1), 3, 0, 2 * Math.PI);
                    this.ctx.stroke();

                    if(this.draw_edges){
                        let edges = this.graph.getEdgesFrom(i, this.state);
                        edges.forEach(j => {   
                            this.ctx.beginPath();
                            this.ctx.moveTo(this.canvas.width - offsetW, offsetH + stepH * (i + 1))
                            this.ctx.lineTo(offsetW, offsetH + stepH * (j + 1));
                            this.ctx.stroke();
                        })
                    }               
                }
                else {
                    this.ctx.arc(offsetW, offsetH + stepH * (i + 1), 3, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
        
        
        /*
       let stepH = (this.canvas.height - 2 * offsetH) / (this.graph.N_vertices + 1);
       let alphaStep = 2*Math.PI / this.graph.N_vertices;
       let centerX = this.canvas.width/2;
       let centerY = this.canvas.height/2;
       let R = 0.8 * Math.min(centerX, centerY);
       let R2 = 0.88 * Math.min(centerX, centerY);
       this.ctx.font = "20px serif";
       for (let i = 0; i < this.graph.N_vertices; i++) {
       
            this.ctx.beginPath();
            if (this.state.X[i]) {
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
        */
    }

}

