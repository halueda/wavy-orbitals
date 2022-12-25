// utility routines

export function ll(mes, result) {
  //console.log(mes);
  //  console.log(result.toString());
  const stringed = JSON.stringify(result, replacer);
  if (stringed == undefined) {
    console.log(mes, "undefined");
  } else {
    console.log(mes, JSON.parse(stringed));
  }
}

export function tr(result) {
  const si = get_stack_info(1);
  const mes = si. func + ":" +si. line;

    //ll({ stack: { string: staray } }, result);
  ll(mes, result);
}


function replacer(k, v) {
  if (typeof v === "function") {
    return v.toString();
  } else {
    return v;
  }
}


function get_stack_info(index = 0) {
  const s = get_stack();
  s.shift();
  const info = perse_stack_line(s[index]);
  info.stack = s;
  return info;
}

function perse_stack_line(l) {
  const i = l.match(/at (.*) \(http.*:([0-9]+):([0-9]+)\)/);
  const info = { func: i[1], line: i[2], column: i[3] };
  return info;
}

function get_stack() {
  try {
    throw new Error("dummy");
  } catch (e) {
    const staray = e.stack.split(/\n/);
    staray.shift();
    staray.shift();
    return staray;
  }
}
