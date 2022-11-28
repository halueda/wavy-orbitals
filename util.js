// utility routines

export function ll(mes, result){
  console.log(mes);        
  console.log(result.toString());
  const stringed = JSON.stringify(result);
  if (stringed != undefined) {
    console.log(JSON.parse(stringed)) ;
  }
}
