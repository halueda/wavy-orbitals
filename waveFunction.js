import WaveFragment from './waveFragment.js';
import MCMCSampler from './mcmcSampler.js';
//import { complex } from 'https://cdnjs.com/libraries/mathjs';
//import { complex } from 'https://unpkg.com/mathjs@10.1.1/lib/browser/math.js';
//import * as math from 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/7.5.1/math.min.js';
//const math = create(all,  {})
//import * as mathjs from 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/7.5.1/math.min.js';

// Use await import to load the package:
//const mathjs = await import("https://unpkg.com/mathjs@10.1.1/lib/browser/math.js");
import * as mathjs from 'https://cdn.skypack.dev/mathjs';
                
export default class WaveFunction {
  /* これは一番抽象的なクラス。ユーティリティ関数を含む */
  /* 引数の point は {x: num, y: num, z: num} 形式。移動のライブラリを使いたいから */
  /* 結果の複素数は */
  init() {
    ll("in init", this.waveValue);
    //thisobj = this;
    //const funforsampler = function (i){
     //   return this.probability(i);
    //}
    //this.sampler = new MCMCSampler(funforsampler);
    this.sampler = new MCMCSampler(this.probability. bind(this));
  }
  constructor () {
          ll("in constructor", this.waveValue);          
     //super();
     this.init();
  }
  sampling(n, seed = null) {
   ll("in sampling", this.waveValue);          
    /* n個の WaveFragment を取り出す */
    /* seed が null でなければ乱数を初期化 */
    // Math.rand(seed);
    let samples = this.sampler.sample(n);
    let waveFragments = samples.map(t => new WaveFragment(
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
    ll("in provability", this.waveValue);
    let wave_value = this.waveValue(point_or_wavevalue);
    return wave_value.toPolar().r;
  }
  theta(point_or_wavevalue) {
    /* this.waveValue を 取り出し */
    /* atan() で thetaを求めて return */
    
    let wave_value = this.waveValue(point_or_wavevalue);
    return wave_value.toPolar().phi;
  }
  angular_velocity(point_or_wavevalue) {
    /* this.energy を 取り出し */
    /* ごにょごにょ計算して return */
    return 0.08;
  }
  energy(point) {
    error("need to 実装");
  }
  waveValue(point) /*: { re: number, im: number } */ {
    return mathjs.complex(2,3);
    //error("need to 実装");
  }
}
function ll(mes, result){
    console.log(mes);        
    console.log(result.toString());
}

