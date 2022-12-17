import WaveFragment from './waveFragment.js';
import MCMCSampler from './mcmcSampler.js';
import * as mathjs from 'https://cdn.skypack.dev/mathjs';
import {ll} from './util.js';

export default class WaveFunction {
  /* これは一番抽象的なクラス。ユーティリティ関数を含む */
  /* 引数の point は {x: num, y: num, z: num} 形式。移動のライブラリを使いたいから */
  /* 結果の複素数は */
  init() {
    //ll("in init", this.waveValue);
    this.sampler = new MCMCSampler(this.probability. bind(this));
  }
  constructor () {
    //ll("in constructor", this.waveValue);          
    this.init();
  }
  sampling(n, seed = null) {
    //ll("in sampling", this.waveValue);          
    /* n個の WaveFragment を取り出す */
    /* seed が null でなければ乱数を初期化 */
    // Math.rand(seed);
    const samples = this.sampler.sample(n);
    const waveFragments = samples.map(t => new WaveFragment(
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
    //ll("in provability", this.waveValue);
    const wave_value = this.waveValue(point_or_wavevalue);
    return wave_value.toPolar().r;
  }
  theta(point_or_wavevalue) {
    /* this.waveValue を 取り出し */
    /* atan() で thetaを求めて return */
    
    const wave_value = this.waveValue(point_or_wavevalue);
    return wave_value.toPolar().phi;
  }
  angular_velocity(point_or_wavevalue) {
    /* 原子単位系では this.energy と同じ値 */
    return this.energy(point_or_wavevalue);
  }
  energy(point) {
    return 0.08;  
    error("need to 実装");
  }
  waveValue(point) /*: { re: number, im: number } */ {
    return mathjs.complex(2,3);
    //error("need to 実装");
  }
}

