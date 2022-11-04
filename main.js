/* import Plotly from 'https://cdn.plot.ly/plotly-2.14.0.min.js'; */
/* import {HSV} from 'cyclic_colorcale.js';*/

const HSV=[ /* ToDo python�� conginuous color �����Ajs �� discreet color�̗l�q�B10�{���炢�ɕ⊮���������ǂ� */
      [ 0/9, "rgb(255, 0, 0)"],	 /* ToDo �ŏ��̏������́A�����Ȃ��Ɠ��Ԋu�ɂȂ����肵�Ȃ��̂��� */ /* ToDo rgb �Ƃ�������ɂ��Ȃ��Ő��l��^����ꂻ���ȋC������ */
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
    var t_0 = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]; /* ToDo 100���炢�ɑ��₵�Ă݂悤 */

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
	trace1.marker.color = trace1.marker.color.map( t => myfrac(t + 0.1));
	lay1.datarevision += 1
	Plotly.update(div,[trace1],lay1);
	console.log(JSON.parse(JSON.stringify(lay1.scene.camera))) 
    }

    Plotly.newPlot(div, [trace1], lay1, {staticPlot: false})
	.then( function(){Plotly.addFrames( div, [ {name: 'wave', data: trace1 }, ]  )} )
	.then( setInterval( update_color, 1000) )  /* ToDo 100�ɂ��������A���ꂾ�ƃ��[�U�����W����������Ȃ��Ȃ�B�A�j�����~�߂�{�^��������ׂ���������Ȃ� */
    
}






