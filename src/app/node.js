export class Node {
    constructor(id, adjacent, adjacent_weights) {
        this.id = id;
        this.adj_nodes = []; //edges, list of id of adjacent nodes
        this.adj_count = 0; // num of edges
        this.adj_weights = []; // weights of edges
    }
}