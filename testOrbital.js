//import MCMCSampler from './mcmcSampler.js';
import * as mathjs from 'https://cdn.skypack.dev/mathjs';
import WaveFunction from './waveFunction.js';

export default class TestOrbital extends WaveFunction {
  
  angular_velocity(point_or_wavevalue) {
    /* this.energy を 取り出し */
    /* ごにょごにょ計算して return */
    return 0.08;
  }
  energy(point) {
    error("need to 実装");
  }
  waveValue(point) /*: { re: number, im: number } */ {
    const r2 = point.x*point.x + point.y*point.y + point.z*point.z;
    const p = mathjs.exp( -r2 - 1);
    return mathjs.complex({r:p,phi:p});
  }
}
