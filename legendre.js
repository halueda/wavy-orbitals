// borrowed from HTML5による物理シミュレーション環境の構築水素原子の波動関数ビューア
// https://www.natural-science.or.jp/article/20120406225432.php

  function Factorial(n, n1) //
  {
  　　var m = n1 || 1; 
    if( n<=0 ) return (1.0);
    var F = 1.0;
    for(var i=n; i>=2; i-=m ){
      F *= i;    
    }
    return (F);
  }

export function Legendre (m, l, x ) {//ルジャンドル陪関数
    var mm = Math.abs(m);
    if( mm > l )  return (0);
    var r0, r1, r2;
    r0 = 0.0;
      r1 = Math.pow( 1.0 -x*x, mm/2.0) * Factorial( 2 * mm - 1, 2);
      if( mm == l && m >= 0) return (r1);
      if( mm == l && m < 0)  return (r1 * Math.pow(-1.0, mm) * Factorial(l - mm)/Factorial(l + mm)) ;
      for(var ll = mm+1; ll<=l; ll++ ){
        r2 = (( 2.0 * ll -1.0)*x*r1 - (ll + mm -1.0)*r0) / (ll-mm);
        r0 = r1;
        r1 = r2;
      }
    if( m >= 0 ) return (r2);
    else return ( r2 * Math.pow(-1.0,mm) * Factorial( l - mm ) / Factorial( l + mm )) ;
  }

 export function Laguerre(k, n, x){ //ラゲール多項式
    var sum=0;
    for(var m=0; m<=n; m++){
      sum += Math.pow(-x,m)*Factorial(n+k)/Factorial(n-m)/Factorial(k+m)/Factorial(m);
    }
    return sum;
  }
