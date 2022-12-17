import { ll , tr} from './util.js';
import WaveFunction from './waveFunction.js';
import {Legendre}  from './legendre.js';
import * as mathjs from 'https://cdn.skypack.dev/mathjs';

function theta_fun(m, theta) {
  const x = Math.sqrt(2) * Math.PI;
  const y = mathjs.exp( mathjs.multiply(mathjs.complex(0,1), m * theta) );
  const z = mathjs.divide(y, x);
  ll('theta_fun: m theta x y z',[m, theta, x,y,z])
  return z;
//  return mathjs.chain(1).
//    divide( mathjs.chain(2).sqrt().multiply(mathjs.PI).done()).
//    multiply( mathjs.complex(0,1).multiply(m * theta).exp() ).
//    done();
  
}

const phi_def = {0: {}, 1: {}, 2: {}, 3:{}};

//function phi_fun_init (phi_def) {
phi_def[0][0]  = (theta=> mathjs.chain(1/2).sqrt().done());
phi_def[1][0]  = (theta=> mathjs.chain(3/2).sqrt().multiply(mathjs.cos(theta)).done());
phi_def[1][+1] = (theta=> mathjs.chain(3/4).sqrt().multiply(-mathjs.sin(theta)).done());
phi_def[1][-1] = (theta=> mathjs.chain(3/4).sqrt().multiply(+mathjs.sin(theta)).done());
phi_def[2][0]  = (theta=> mathjs.chain(5/8).sqrt().multiply(3*(mathjs.cos(theta))**2 -1).done());
phi_def[2][+1] = (theta=> mathjs.chain(15/4).sqrt().multiply(-mathjs.sin(theta)*mathjs.cos(theta)).done());
phi_def[2][-1] = (theta=> mathjs.chain(15/4).sqrt().multiply(+mathjs.sin(theta)*mathjs.cos(theta)).done());
phi_def[2][+2] = (theta=> mathjs.chain(15/16).sqrt().multiply(-(mathjs.sin(theta)**2) -1).done());
phi_def[2][-2] = (theta=> mathjs.chain(15/16).sqrt().multiply(+(mathjs.sin(theta)**2) -1).done());
//}

function phi_fun(l, m, phi) {
      const r = (phi_def[l][m])(phi);
      ll("phi_fun: l m phi phi_def r",[l,m,phi,  phi_def[l][m], r ]);
      tr({l,m,phi,  phi_def:phi_def[l][m], r });
  
  return r;
}

function Y(m, l, n, theta, phi) {
  if (Number.isNaN(phi)) { 
          phi = mathjs.random(2*mathjs.PI);
  }  // 不定 indefinite なので、適当な値にする
  if (Number.isNaN(theta)) { 
          theta = mathjs.random(2*mathjs.PI);
  }  // 不定 indefinite なので、適当な値にする

  return mathjs.multiply(theta_fun(m, theta) , phi_fun(l, m, phi) );
}

function polar_coordinate (point) {
  const {x, y, z} = point;
  const r = mathjs.sqrt( x*x + y*y + z*z );
  const theta = mathjs.acos( z/r );
  const phi = mathjs.atan( y/x );
  return {r: r, theta: theta, phi: phi};
  
}

export default class Hydrogen extends WaveFunction {
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
    let L = Legendre(this.m, r);
    const YY = Y(this.m, this.l, this.n, theta, phi);
    tr({point,r,theta,phi, L, YY});
    L = 0.01;
    return mathjs.multiply(L , YY ); 
    // Legendre(this.m, r),   Y(this.m, this.l, this.n, theta, phi));
  }
  
  
}
