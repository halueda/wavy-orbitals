import { ll, tr } from './util.js';
import WaveFunction from './waveFunction.js';
import { Legendre, Laguerre, Factorial } from './legendre.js';
import * as mathjs from 'https://cdn.skypack.dev/mathjs';

function theta_fun(m, theta) {
  const x = Math.sqrt(2) * Math.PI;
  const y = mathjs.exp(mathjs.multiply(mathjs.complex(0, 1), m * theta));
  const z = mathjs.divide(y, x);
  tr({m, theta, x, y, z})
  return z;
  //  return mathjs.chain(1).
  //    divide( mathjs.chain(2).sqrt().multiply(mathjs.PI).done()).
  //    multiply( mathjs.complex(0,1).multiply(m * theta).exp() ).
  //    done();

}

const phi_def = { 0: {}, 1: {}, 2: {}, 3: {} };

//function phi_fun_init (phi_def) {
phi_def[0][0] = (theta => mathjs.chain(1 / 2).sqrt().done());
phi_def[1][0] = (theta => mathjs.chain(3 / 2).sqrt().multiply(mathjs.cos(theta)).done());
phi_def[1][+1] = (theta => mathjs.chain(3 / 4).sqrt().multiply(-mathjs.sin(theta)).done());
phi_def[1][-1] = (theta => mathjs.chain(3 / 4).sqrt().multiply(+mathjs.sin(theta)).done());
phi_def[2][0] = (theta => mathjs.chain(5 / 8).sqrt().multiply(3 * (mathjs.cos(theta)) ** 2 - 1).done());
phi_def[2][+1] = (theta => mathjs.chain(15 / 4).sqrt().multiply(-mathjs.sin(theta) * mathjs.cos(theta)).done());
phi_def[2][-1] = (theta => mathjs.chain(15 / 4).sqrt().multiply(+mathjs.sin(theta) * mathjs.cos(theta)).done());
phi_def[2][+2] = (theta => mathjs.chain(15 / 16).sqrt().multiply(-(mathjs.sin(theta) ** 2) - 1).done());
phi_def[2][-2] = (theta => mathjs.chain(15 / 16).sqrt().multiply(+(mathjs.sin(theta) ** 2) - 1).done());
//}

function phi_fun(l, m, phi) {
  const r = (phi_def[l][m])(phi);
  tr({ l, m, phi, phi_def: phi_def[l][m], r });
  //r = Yr(l, m, phi);
  return r;
}

function Y(m, l, n, theta, phi) {
  if (Number.isNaN(phi)) {
    phi = mathjs.random(2 * Math.PI);
  } // 不定 indefinite なので、適当な値にする
  if (Number.isNaN(theta)) {
    theta = mathjs.random(2 * Math.PI);
  } // 不定 indefinite なので、適当な値にする


  return mathjs.multiply(theta_fun(m, theta), phi_fun(l, m, phi));
}

function polar_coordinate(point) {
  const { x, y, z } = point;
  const r = mathjs.sqrt(x * x + y * y + z * z);
  const theta = mathjs.acos(z / r);
  const phi = mathjs.atan(y / x);
  return { r: r, theta: theta, phi: phi };

}

export default class Hydrogen extends WaveFunction {
  constructor(n, l, m) {
    super();
    this.n = n;
    this.l = l;
    this.m = m;
    // n > l >= abs(m) >= 0
  }

  energy(p) {
    return 1 / this.n / this.n;
  }


  waveValue(point) {
    const { r, theta, phi } = polar_coordinate(point);
    const { m, l, n } = this;
    //let L = Legendre(this.n, this.l, r);
    //let L = 0.01;
    const YY = Y(this.m, this.l, this.n, theta, phi);
    const R = 2.0 / Math.pow(n, 2) * Math.sqrt(Factorial(n - l - 1) / Factorial(n + l)) * Math.exp(-r / n) * Math.pow(2.0 * r / n, l) * Laguerre(2 * l + 1, n - l - 1, 2.0 * r / n);

    tr({ point, r, theta, phi, R, YY });
    return mathjs.multiply(R, YY);
    // Legendre(this.m, r),   Y(this.m, this.l, this.n, theta, phi));
  }


}