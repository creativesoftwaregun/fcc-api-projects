const today = new Date();
let dd = today.getDate();
if(dd < 10) dd = "0" + dd;
let mm = today.getMonth() + 1; // January is 0!
if(mm < 10) mm = "0" + mm;
const yyyy = today.getFullYear();
let hh = today.getHours();
if(hh < 10) hh = "0" + hh;
let ii = today.getMinutes();
if(ii < 10) ii = "0" + ii;
let ss = today.getSeconds();
if(ss < 10) ss = "0" + ss;

console.log("[nodemon] Timestamp:", `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`);