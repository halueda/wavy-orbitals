// utility routines

export function ll(mes, result){
  console.log(mes);        
//  console.log(result.toString());
  const stringed = JSON.stringify(result, replacer);
  if (stringed == undefined) {
    console.log("undefined") ;
  } else {
    console.log(JSON.parse(stringed)) ;
  }
}

export function tr(result){
      try {
        throw new Error("dummy");
      } catch (e) {
              const staray = e.stack.split( /\n/ );
              staray.shift();
              staray.shift();
    //    ll( JSON.parse(JSON.stringify(staray)), result) ;
        ll( {stack:{string:staray}}, result) ;
      }
}

function replacer(k, v){
        if (typeof k === "function") {
                return v.toString();
        } else {
                return v;
        }
}