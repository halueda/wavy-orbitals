// From https://github.com/todays-mitsui/mhatl.js/blob/master/src/App.vue
// import { Component, Vue } from 'vue-property-decorator'
// import ControlPanel from './components/ControlPanel.vue'
// import DisplayScatter from './components/display/DisplayScatter.vue'
// import DisplayHistgram from './components/display/DisplayHistgram.vue'
// import DisplayTraceline from './components/display/DisplayTraceline.vue'
// import { Point, Sample } from '../lib/interfaces'
//import rnorm from './rnorm'
//import uniform from './uniform'
// @Component({
//   components: {
//     ControlPanel,
//     DisplayScatter,
//     DisplayHistgram,
//     DisplayTraceline
//   }
// })
// From https://github.com/todays-mitsui/mhatl.js/blob/master/lib/util/rnorm.ts
/**
 * 正規分布から乱数を生成
 *
 * @param m 平均
 * @param s 標準偏差
 */
function rnorm (m = 0, s = 1) {
  const rnorm = Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())
  return (rnorm + m) * s * s
}

// From https://github.com/todays-mitsui/mhatl.js/blob/master/lib/util/uniform.ts
/**
 * 一様分布から乱数を生成
 *
 * @param min
 * @param max
 */
function uniform (min: number, max: number) {
  return Math.random() * (max - min) + min
}


// From https://github.com/todays-mitsui/mhatl.js/blob/master/src/App.vue

// export default class App extends Vue {
export default class MCMCSampler {
    private count = 0
    // ======================================================================== //
//    /** 目標分布のカーネル */
//	/** 目標分布(二変量正規分布)の共分散 */
//	b=0.5,
//    p ({ x, y }: Point): number {
//	return Math.exp(-0.5 * (x * x - 2 * b * x * y + y * y))
//    }
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
	x0=0, y0=0, z0=0,
	/** Burn-in 期間の長さ */
	burn_in_period=50,
	/** 提案分布の標準偏差 */
	sigma=1.0,
    ){
	this.p = p;
	this.current = {x: x0, y: y0, z: z0};
	this.BURN_IN_PERIOD = burn_in_period;
	this.SIGMA = sigma;
	burnIn();
    }

    /** サンプル取得処理 */
    sample0 () {
	// 点 current 、初回は current === undefined なので { x0, y0 } を使う
	// const current = this.current || { x: this.x0, y: this.y0 }
	const next = this.q(current)      // 提案分布を使って点 next を選ぶ
	const pCurrent = this.p(current)  // 点 current における目標分布の確率密度
	const pNext = this.p(next)        // 点 next における目標分布の確率密度
	const r = pNext / pCurrent        // 受容確率
	// r が 1 以上ならそのまま受容する (accepted === true になる)
	// r が 1 より小さいなら、確率 r で受容する
	const accepted = r >= 1 || r > uniform(0, 1)
	this.count +=1;
	return {
	    current,
	    next,
	    result: accepted,
	}
    }

    /** サンプル取得して更新 */
    sample1 (): {
	a_sample = sample0();
	// 取得した sample が受容されていた場合は、次に備えて点 current を点 next で置き換える
	if (a_sample.result) {
	    this.current = sample.next 
	    return sample.next;
	} else {
	    return false;
	}
    }

    burnIn() {
	while (this.count < this.BURN_IN_PERIOD) {
	    sample1();
	}
    }

    /** acceptされたサンプルを返す */
    sample (): {
	a_sample = sample1();
	while ( a_sample == false) {
	    a_sample = sample1();
	}
	return a_sample;
    }
}
