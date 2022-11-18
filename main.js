// coding: utf-8-unix; 日本語あり
/* import Plotly from 'https://cdn.plot.ly/plotly-2.14.0.min.js'; */
import {HSV} from './cyclicColorscale.js';
import WaveFragment from './waveFragment.js';

const cmin = 0;
const cmax = 1; /*  = 2 * Math.PI */

function myfrac( v ) {
    /* return( v - Math.floor(v) ) ; */
    return( v % cmax );
}

function myrange( n ) {
    return [...Array(100)].map((_, i) => i)
}

function sampling_wave_fragment(n) {
    var t_0 = myrange(n).map((_, i) => i/n) 
    return t_0.
	map( t => new
	     WaveFragment(
		 1.0 / 4 * Math.sin( 8 * Math.PI * t),
		 1.0 / 4 * Math.cos( 8 * Math.PI * t),
		 t,
		 myfrac( 1.2 * t),
		 0.08,
		 null,
		 true));
}

export default function test( div, noanime ) {
    var sampled_wave_fragments = sampling_wave_fragment(100);
    var visible_wave_fragments = sampled_wave_fragments.filter( t=> t.visible )

    var trace1 = {
	x: visible_wave_fragments.map(t => t.x),
	y: visible_wave_fragments.map(t => t.y),
	z: visible_wave_fragments.map(t => t.z),
	mode: 'markers',
	type: 'scatter3d',
	marker: {
	    color: visible_wave_fragments.map(t => t.init_theta),
	    colorscale: HSV,
/*	    cmax: cmax,
	    cmin: cmin, */
	},
    };

    var lay1 = {transition: {duration: 0},
		frame: {duration: 0,  },
		scene: { camera: { projection: {type: "orthographic" },},},
		datarevision: 0
	       };

    var start_time = Date.now();

    function update_color () {
	var noanime_p = document.getElementById(noanime).checked
	/* console.log(JSON.parse(JSON.stringify({noanime, noanime_p}))) */
	if ( ! noanime_p ) {
	    var diff_time = Date.now() - start_time;
	    var cs = visible_wave_fragments.map(t => myfrac(t.init_theta + (t.angular_velocity * diff_time / 1000)) );
	    trace1.marker.color = cs;
	    /* lay1.datarevision += 1 */
	    /* console.log(JSON.parse(JSON.stringify({diff_time, trace1}))) */
	    Plotly.update(div,[trace1],lay1);
	}
	/* console.log(JSON.parse(JSON.stringify(lay1.scene.camera))) */
    }

    Plotly.newPlot(div, [trace1], lay1, {staticPlot: false})
	.then( function(){Plotly.addFrames( div, [ {name: 'wave', data: trace1 }, ]  )} )
	.then( setInterval( update_color, 1000) )  /* 本番では 100にする。plotly.jsの検証のために1000にしておく */
    
}


