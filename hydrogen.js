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

phi_def{0}{0} = (theta=> mathjs.chain(.....).....done());


function phi_fun(l, m, theta) {
  return phi_def{l}{m}(theta);
}

function Y(m, l, n, theta, phi) {
  return theta_fun(m, theta).multiply( phi_fun(l, m, theta) );
}

function 極座標 (point) {
  
}

export default HydrogenOrbital extends WaveFunction {
  constructor (n, l, m) {
    super();
    this.n = n;
    this.l = l;
    this.m = m;
  }

  energy(_) {
    return 1/n/n;
  }

  
  waveValue(point) {
    const (r, theta, phi) = 極座標(point);
    
    return Legendre(this.m, r) * Y(this.l, this.n, theta, phi);
  }
  
  
}
