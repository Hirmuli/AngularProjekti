/**
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */
function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  }
  this.dequeue = function () {
    return this._nodes.shift().key;
  }
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }
  this.isEmpty = function () {
    return !this._nodes.length;
  }
}

/**
 * Pathfinding starts here
 */
function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  }

  this.shortestPath = function (start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
		temp,
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path;

        while(previous[smallest]) {
          path.push(smallest);
		  
          smallest = previous[smallest];
        }
		temp = distances[finish];
        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }
	path.push(start);
	path.push(temp);
    return path;
  }
}

// nämä kaikki tästä alta muualle
var g = new Graph();

// parser
g.addVertex('Oulu',{Kajaani: 180, Kuopio:290, Vaasa: 320});
g.addVertex('Kajaani',{Oulu: 180, Kuopio:170, Joensuu: 230});
g.addVertex('Kuopio',{Vaasa: 380, Oulu: 290, Kajaani: 170, Joensuu: 130});
g.addVertex('Joensuu',{Kajaani: 230, Kuopio: 130, Mikkeli: 210, Imatra: 200});
g.addVertex('Vaasa',{Oulu: 320, Kuopio: 380, Tampere: 240});
g.addVertex('Tampere',{Vaasa: 240, Turku: 150, Helsinki: 170});
g.addVertex('Turku',{Tampere: 150, Helsinki: 160});
g.addVertex('Helsinki',{Tampere: 170, Turku: 160, Mikkeli: 230, Imatra: 260});
g.addVertex('Imatra',{Helsinki: 260, Mikkeli: 140, Joensuu: 200});
g.addVertex('Mikkeli',{Kuopio: 160, Joensuu: 210, Imatra: 140, Helsinki: 230});


// alku ja loppu parametrit ja distance josta saadaan pihalle pituus
var distance,
	alku = 'Helsinki', 
	loppu = 'Oulu';
distance = g.shortestPath(alku, loppu).pop();