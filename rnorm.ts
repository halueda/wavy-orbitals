// From https://github.com/todays-mitsui/mhatl.js/blob/master/lib/util/rnorm.ts
/**
 * 正規分布から乱数を生成
 *
 * @param m 平均
 * @param s 標準偏差
 */
export default function rnorm (m = 0, s = 1) {
  const rnorm = Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())
  return (rnorm + m) * s * s
}
