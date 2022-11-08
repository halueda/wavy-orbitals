
export default class WaveFunction {
    /* これは一番抽象的なクラス。ユーティリティ関数を含む */
    /* 引数の point は {x: num, y: num, z: num} 形式。移動のライブラリを使いたいから */
    /* 結果の複素数は */
    sampling (n, seed=null) {
	/* n個の WaveFragment を取り出す */
	/* seed が null でなければ乱数を初期化 */
	/* from からの多次元正規分布で toを作る */
	/* if this.probability(to)/this.probability(from) > rand() なら採用して from を変更 */
	/*   if バーンイン中でなければ */
	/*      採用したものは new WaveFragment( from.x, from.y, from.z, this.theta(), this.angular_velocity(), this) して結果に入れる */
	/*      採用カウンタ ++ で十分ならreturn */
	/* バーンインカウンタ ++ */
    }
    probability ( point_or_wavevalue ) {
	/* this.waveValue を 取り出し */
	/* 2乗して確立にして return */
    }
    theta( point_or_wavevalue ) {
	/* this.waveValue を 取り出し */
	/* atan() で thetaを求めて return */
    }
    angular_velocity( point_or_wavevalue ) {
	/* this.energy を 取り出し */
	/* ごにょごにょ計算して return */
    }
    energy( ) {
	error("need to 実装");
    }
    waveValue( point ) {
	error("need to 実装");
    }
}
