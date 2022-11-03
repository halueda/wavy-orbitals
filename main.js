/* import Plotly from 'https://cdn.plot.ly/plotly-2.14.0.min.js'; */
/* import {HSV} from 'cyclic_colorcale.js';*/

const HSV=[
      [ 0/9, "rgb(255, 0, 0)"],	
      [ 1/9, "rgb(255, 167, 0)"],	
      [ 2/9, "rgb(175, 255, 0)"],	
      [ 3/9, "rgb(8, 255, 0)"],	
      [ 4/9, "rgb(0, 255, 159)"],	
      [ 5/9, "rgb(0, 183, 255)"],	
      [ 6/9, "rgb(0, 16, 255)"],	
      [ 7/9, "rgb(151, 0, 255)"],	
      [ 8/9, "rgb(255, 0, 191)"],	
      [ 9/9, "rgb(255, 0, 0)"],
];

function myfrac( v ) {
    return( v - Math.floor(v) ) ;
}

function test( div ) {
    var t_0 = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

    var trace1 = {
	x: t_0.map((t) =>  1.0 / 4 * Math.sin( 8 * Math.PI * t)), 
	y: t_0.map((t) =>  1.0 / 4 * Math.cos( 8 * Math.PI * t)), 
	z: t_0,
	mode: 'markers',
	type: 'scatter3d',
	marker: {
	    /* size: 20, */
	    color: t_0.map((t) => myfrac( 2.8 * t) ),
	    colorscale: HSV, 
/*	    colorscale: 'Greens', */
	},
    };

    Plotly.newPlot(div, [trace1], {});
}






