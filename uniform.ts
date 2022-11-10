// From https://github.com/todays-mitsui/mhatl.js/blob/master/lib/util/uniform.ts
/**
 * 一様分布から乱数を生成
 *
 * @param min
 * @param max
 */
export default function uniform (min: number, max: number) {
  return Math.random() * (max - min) + min
}
