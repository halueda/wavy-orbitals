# wavy-orbitals
This repository is WIP.

波動関数を可視化するものです。
時間とともに色が変わる三次元アニメーションを拡大縮小回転などして操作することができます


- 三次元空間上に、波動関数の存在確率に比例して色の付いた点を表示します
- 色は波動関数の位相を表します。時間とともに位相が変化する様子をアニメーションします
- 時空間の単位系は原子単位系を使います。エネルギーによって周期が変わるでしょう
- 一度に複数の波動関数の軌道を表示できます。チェックボックスで表示するかどうかを切り替えられます
- 中を見られるように平面で切り取ることができます
- 複数の波動関数からなるセットをモデルと呼びます


GitHub Pagesを使って、見ることができます。

https://halueda.github.io/wavy-orbitals/

# モデル

様々なモデルを企画しています

- 水素様原子（シュレーディンガー方程式の解）
- 水素様原子（Dirac方程式の解）
- spなどの混成軌道
- 水素分子、水などの簡単な分子
- メタン、エチレンなどの簡単な有機化合物

# Reference

- [位相で見る波動関数](http://v.rentalserver.jp/morigon.jp/Repository/SUBI0/iso.html)
  - このサイトにインスパイアされてこのリポジトリを作ることにしました。
- [量子力学の波動関数 - 量子論の不思議な世界](https://xseek-qm.net/atom.html)
  - [波動関数の不思議 - 量子論の不思議な世界](https://xseek-qm.net/wave.html)
    - [JavaScript animation of the atom wave function](https://xseek-qm.net/atom/atom.htm)
  - このサイトにインスパイアされてこのリポジトリを作ることにしました。
- [日曜化学(3)：分子軌道法と可視化（Python/matplotlib） - tsujimotterのノートブック](https://tsujimotter.hatenablog.com/entry/molecular-orbital-visualization)
    - [日曜化学(2.5)：メトロポリス・ヘイスティングス法を用いた電子雲の可視化（Python/matplotlib） - tsujimotterのノートブック](https://tsujimotter.hatenablog.com/entry/metropolis-hastings-algorithm)
        - MCMCサンプリング実装の参考にさせていただきました。
- [HTML5による物理シミュレーション環境の構築水素原子の波動関数ビューア](https://www.natural-science.or.jp/article/20120406225432.php)
    - legandre 陪関数の実装を使わせていただきました（MITライセンス）
- [【Plotly】水素原子の図鑑：電子波動関数の可視化](https://zenn.dev/shittoku_xxx/articles/dc13eb4c060a1c)
    - legandre 陪関数の実装の正しさを確認するのに参照いたしました
