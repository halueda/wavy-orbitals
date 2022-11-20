
export default class WaveFunction {
    /* これは一番抽象的なクラス。ユーティリティ関数を含む */
    /* 引数の point は {x: num, y: num, z: num} 形式。移動のライブラリを使いたいから */
    /* 結果の複素数は */
    init() {
	this.sampler = MCMCSampler( this.probability );
	this.sampler.burn_in();
    }

    sampling (n, seed=null) {
	/* n個の WaveFragment を取り出す */
	/* seed が null でなければ乱数を初期化 */
	// Math.rand(seed);
	samples = this.sampler.sample( 1000 );
	return samples.map( s => WaveFragment(s.x .... ));
    }
    probability ( point_or_wavevalue ) {
	/* this.waveValue を 取り出し */
	/* 2乗して確率にして return */
    }
    theta( point_or_wavevalue ) {
	/* this.waveValue を 取り出し */
	/* atan() で thetaを求めて return */
    }
    angular_velocity( point_or_wavevalue ) {
	/* this.energy を 取り出し */
	/* ごにょごにょ計算して return */
    }
    energy( point: {x:number, y:number, z:number} ): number {
	error("need to 実装");
    }
    waveValue( point: {x:number, y:number, z:number} ): {re: number, im: number} {
	error("need to 実装");
    }
}
