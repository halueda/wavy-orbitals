// coding: utf-8-unix; 日本語あり
/* import Plotly from 'https://cdn.plot.ly/plotly-2.14.0.min.js'; */
import {HSV} from './cyclicColorscale.js';
import WaveFragment from './waveFragment.js';
import WaveFunction from './waveFunction.js';
import testOrbital from './testOrbital.js';
import { ll } from './util.js';


const cmin = 0;
//const cmax = 1;
const cmax = 2 * Math.PI;

function myfrac( v ) {
  /* return( v - Math.floor(v) ) ; */
  return( v % cmax );
}

function myrange( n ) {
  return [...Array(100)].map((_, i) => i)
}

function sampling_test_wave_fragment(n) {
  const t_0 = myrange(n).map((_, i) => i/n) 
  return t_0.
    map( t => new
	 WaveFragment(
	   1.0 / 4 * Math.sin( 8 * Math.PI * t),
	   1.0 / 4 * Math.cos( 8 * Math.PI * t),
	   t,
	   myfrac( 3.6 * t),
	   0.08,
	   null,
	   true));
}

function test( div, noanime ) {
  const sampled_wave_fragments = sampling_test_wave_fragment(100);
  animateWaveFragments( div, noanime, sampled_wave_fragments );
}


//ここから下はview用のクラスにくくりだす
// view 用のクラスは、visibilityを定義できる。例えば断面を見せるとか。ステージ用のクラスをそろそろ作らないといけない。
function animateWaveFragments( div, noanime, sampled_wave_fragments ) {
  // t.visible でフィルターするのではなくて、t.visible() で判断するようにすべき
  // ステージのフィルタリング条件を考慮すべき
  const visible_wave_fragments = sampled_wave_fragments.filter( t=> t.visible )

  const trace1 = {
    x: visible_wave_fragments.map(t => t.x),
    y: visible_wave_fragments.map(t => t.y),
    z: visible_wave_fragments.map(t => t.z),
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      color: visible_wave_fragments.map(t => t.init_theta),
      colorscale: HSV,
      cmax: cmax,
      cmin: cmin,
    },
  };

  const lay1 = {transition: {duration: 0},
		frame: {duration: 0,  },
		scene: { camera: { projection: {type: "orthographic" },},},
		datarevision: 0
	       };

  const start_time = Date.now();

  function update_color () {
    let noanime_p = document.getElementById(noanime).checked
    /* console.log(JSON.parse(JSON.stringify({noanime, noanime_p}))) */
    if ( ! noanime_p ) {
      //ここでアップデートチェックと、visible更新
      const diff_time = Date.now() - start_time;
      const cs = visible_wave_fragments.map(t => myfrac(t.init_theta + (t.angular_velocity * diff_time / 200)) );
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


function forDebug( div, noanime  ){
  const unchanged = {v:"unchanged",};
  let result = unchanged;
  
  const tmp = (new testOrbital());
  result =  tmp.sampling(1000);
  result.map( t => {if (t.x > 0 && t.y > 0) { t.visible = false; }; } );
  animateWaveFragments( div, noanime, result );
  
  
  if (result !== unchanged) {
    ll("forDebug result", result);
  }
} 

const WavyOrbitals = {
  experiment : test,
  debug : forDebug,
};

export default WavyOrbitals;

