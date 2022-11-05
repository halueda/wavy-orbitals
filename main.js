/* import Plotly from 'https://cdn.plot.ly/plotly-2.14.0.min.js'; */
import {HSV} from './cyclic_colorscale.js';

function myfrac( v ) {
    return( v - Math.floor(v) ) ;
}

function myrange( n ) {
    return [...Array(100)].map((_, i) => i)
}

export default function test( div, noanime ) {
    var t_0 = myrange(100).map((_, i) => i/100) 

    var trace1 = {
	x: t_0.map((t) =>  1.0 / 4 * Math.sin( 8 * Math.PI * t)), 
	y: t_0.map((t) =>  1.0 / 4 * Math.cos( 8 * Math.PI * t)), 
	z: t_0,
	mode: 'markers',
	type: 'scatter3d',
	marker: {
	    color: t_0.map((t) => myfrac( 1.2 * t) ),
	    colorscale: HSV, 
	},
    };
    var lay1 = {transition: {duration: 0},
		frame: {duration: 0,  },
		datarevision: 0
	       };

    function update_color () {
	var noanime_p = document.getElementById(noanime).checked
	console.log(JSON.parse(JSON.stringify({noanime, noanime_p})))
	if ( ! noanime_p ) {
	    trace1.marker.color = trace1.marker.color.map( t => myfrac(t + 0.08));
	    lay1.datarevision += 1
	    Plotly.update(div,[trace1],lay1);
	}
	/* console.log(JSON.parse(JSON.stringify(lay1.scene.camera))) */
    }

    Plotly.newPlot(div, [trace1], lay1, {staticPlot: false})
	.then( function(){Plotly.addFrames( div, [ {name: 'wave', data: trace1 }, ]  )} )
	.then( setInterval( update_color, 1000) )  /* 本番では 100にする。plotly.jsの検証のために1000にしておく */
    
}


