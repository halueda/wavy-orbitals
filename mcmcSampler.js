// From https://github.com/todays-mitsui/mhatl.js/blob/master/src/App.vue
/**
 * 正規分布から乱数を生成
 *
 * @param m 平均
 * @param s 標準偏差
 */
function rnorm (m = 0, s = 1) {
  const rnorm_v = Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())
  return (rnorm_v * s + m)
}

// From https://github.com/todays-mitsui/mhatl.js/blob/master/lib/util/uniform.ts
/**
 * 一様分布から乱数を生成
 *
 * @param min
 * @param max
 */
function uniform (min, max) {
  return Math.random() * (max - min) + min
}


// From https://github.com/todays-mitsui/mhatl.js/blob/master/src/App.vue

export default class MCMCSampler {
  // ======================================================================== //
  /** 提案分布 - 正規分布からの実現値の組 */
  q ({ x, y, z } /*: Point*/ ) /*: Point*/ {
    return {
      x: rnorm(x, this.SIGMA),
      y: rnorm(y, this.SIGMA),
      z: rnorm(z, this.SIGMA)
    }
  }
  constructor(
    /** 目標分布のカーネル */
    p,
    x0=1, y0=1, z0=1,
    /** Burn-in 期間の長さ */
    burn_in_period=50,
    /** 提案分布の標準偏差 */
    sigma=5.0,
  ){
    this.p = p; 
    this.current = {x: x0, y: y0, z: z0};
    this.BURN_IN_PERIOD = burn_in_period;
    this.SIGMA = sigma;
    //this.burnIn();
    this.count = 0;
  }

  /** サンプル取得処理 */
  sample0 () {
    const next = this.q(this.current)      // 提案分布を使って点 next を選ぶ
    const pCurrent = this.p(this.current)  // 点 current における目標分布の確率密度
    const pNext = this.p(next)        // 点 next における目標分布の確率密度
    const r = pNext / pCurrent        // 受容確率
    // r が 1 以上ならそのまま受容する (accepted === true になる)
    // r が 1 より小さいなら、確率 r で受容する
    const accepted = r >= 1 || r > uniform(0, 1)
    this.count +=1;
    return {
      currenr: this.current,
      next: next,
      result: accepted,
    }
  }

  /** サンプル取得して更新 */
  sample1 () {
    const a_sample = this.sample0();
    // 取得した sample が受容されていた場合は、次に備えて点 current を点 next で置き換える
    if (a_sample.result) {
      this.current = a_sample.next 
      return a_sample.next;
    } else {
      return false;
    }
  }

  burnIn() {
    while (this.count < this.BURN_IN_PERIOD) {
      this.sample1();
    }
  }

  /** acceptされたサンプルを返す */
  sample2 () {
    let a_sample = this.sample1();
    while ( a_sample == false) {
      a_sample = this.sample1();
    }
    return a_sample;
  }
  
  sample(n){
    this.burnIn();
    const arr = new Array(n);
    for (let i = 0; i < arr.length; ++i) {
      arr[i]= this.sample2()
    }
    return arr;
  }
}
