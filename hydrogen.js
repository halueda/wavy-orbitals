import WaveFunction from './waveFunction.js';
import {Legendre}  from './legendre.js';
import * as mathjs from 'https://cdn.skypack.dev/mathjs';

function theta_fun(m, theta) {
  return mathjs.chain(1).
    divide( mathjs.chain(2).sqrt().multiply(mathjs.PI).done()).
    multiply( mathjs.complex(0,1).multiply(m * theta).exp() ).
    done();
  
}

const phi_def = {0: {}, 1: {}, 2: {}, 3:{}};

phi_def{0}{0}  = (theta=> mathjs.chain(1/2).sqrt().done());
phi_def{1}{0}  = (theta=> mathjs.chain(3/2).sqrt().multiply(mathjs.cos(theta)).done());
phi_def{1}{+1} = (theta=> mathjs.chain(3/4).sqrt().multiply(-mathjs.sin(theta)).done());
phi_def{1}{-1} = (theta=> mathjs.chain(3/4).sqrt().multiply(+mathjs.sin(theta)).done());
phi_def{2}{0}  = (theta=> mathjs.chain(5/8).sqrt().multiply(3*(mathjs.cos(theta))**2 -1).done());
phi_def{2}{+1} = (theta=> mathjs.chain(15/4).sqrt().multiply(-mathjs.sin(theta)*mathjs.cos(theta)).done());
phi_def{2}{-1} = (theta=> mathjs.chain(15/4).sqrt().multiply(+mathjs.sin(theta)*mathjs.cos(theta)).done());
phi_def{2}{+2} = (theta=> mathjs.chain(15/16).sqrt().multiply(-mathjs.sin(theta)**2 -1).done());
phi_def{2}{-2} = (theta=> mathjs.chain(15/16).sqrt().multiply(+mathjs.sin(theta)**2 -1).done());


function phi_fun(l, m, theta) {
  // if theta == NaN { theta = 2*PI*rand(); } // 不定 indefinite なので、適当な値にする
  return phi_def[l][m](theta);
}

function Y(m, l, n, theta, phi) {
  // if phi == NaN { phi = 2*PI*rand(); }  // 不定 indefinite なので、適当な値にする
  return theta_fun(m, theta).multiply( phi_fun(l, m, theta) );
}

function polar_coordinate (point) {
  const {x, y, z} = point;
  const r = mathjs.sqrt( x*x + y*y + z*z );
  const theta = mathjs.acos( z/r );
  const phi = mathjs.atan( y/x );
  return {r: r, theta: theta, phi: phi};
  
}

export default HydrogenOrbital extends WaveFunction {
  constructor (n, l, m) {
    super();
    this.n = n;
    this.l = l;
    this.m = m;
  }

  energy(p) {
    return 1/ this.n / this.n;
  }

  
  waveValue(point) {
    const {r, theta, phi} = polar_coordinate(point);
    
    return Legendre(this.m, r) * Y(this.l, this.n, theta, phi);
  }
  
  
}
