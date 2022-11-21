import WaveFragment from './waveFragment.js';
import MCMCSampler from './mcmcSampler.js';
import math from 'https://cdnjs.com/libraries/mathjs';


export default class WaveFunction {
  /* これは一番抽象的なクラス。ユーティリティ関数を含む */
  /* 引数の point は {x: num, y: num, z: num} 形式。移動のライブラリを使いたいから */
  /* 結果の複素数は */
  init() {
    this.sampler = MCMCSampler(this.probability);
  }

  sampling(n, seed = null) {
    /* n個の WaveFragment を取り出す */
    /* seed が null でなければ乱数を初期化 */
    // Math.rand(seed);
    samples = this.sampler.sample(1000);
    waveFragments = samples.map(t => new WaveFragment(
      t.x, t.y, t.z,
      this.theta(t),
      this.angular_velocity(t),
      this,
      true));
    return waveFragments;
  }
  
  probability(point_or_wavevalue) {
    /* this.waveValue を 取り出し */
    /* 2乗して確率にして return */
    wave_value = this.waveValue(point_or_wavevalue);
    return wave_value.toPolar().r;
  }
  theta(point_or_wavevalue) {
    /* this.waveValue を 取り出し */
    /* atan() で thetaを求めて return */
    
    wave_value = this.waveValue(point_or_wavevalue);
    return wave_value.toPolar().phi;
  }
  angular_velocity(point_or_wavevalue) {
    /* this.energy を 取り出し */
    /* ごにょごにょ計算して return */
  }
  energy(point) {
    error("need to 実装");
  }
  waveValue(point) /*: { re: number, im: number } */ {
    return math.complex(2, 3);
    //error("need to 実装");
  }
}
