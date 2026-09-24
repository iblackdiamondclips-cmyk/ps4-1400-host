(function(){
'use strict';
var logEl=document.getElementById('log');
function log(s){logEl.textContent += '\n' + s;}
function set(id,v){document.getElementById(id).textContent=v;}
function uaInfo(){
  var ua=navigator.userAgent||'';
  var fm=ua.match(/PlayStation(?:;|\s)+PlayStation 4\/([0-9.]+)/i) ||
         ua.match(/PlayStation 4[^0-9]*([0-9]+\.[0-9]+)/i);
  var wk=ua.match(/AppleWebKit\/([0-9.]+)/i);
  return {ua:ua, firmware:fm?fm[1]:'Unknown', webkit:wk?wk[1]:'Unknown'};
}
function check(){
  var x=uaInfo();
  set('environment','Ready'); set('firmware',x.firmware); set('webkit',x.webkit);
  logEl.textContent='Environment check:';
  log('User agent: '+x.ua); log('Firmware: '+x.firmware); log('WebKit: '+x.webkit);
  log(x.firmware==='14.00'?'Target firmware verified.':'Target firmware NOT verified.');
}
function probe(){
  var tests=[
    ['BigInt',function(){return typeof BigInt!=='undefined';}],
    ['WebAssembly',function(){return typeof WebAssembly!=='undefined';}],
    ['SharedArrayBuffer',function(){return typeof SharedArrayBuffer!=='undefined';}],
    ['Atomics',function(){return typeof Atomics!=='undefined';}],
    ['BigUint64Array',function(){return typeof BigUint64Array!=='undefined';}],
    ['Proxy',function(){return typeof Proxy!=='undefined';}],
    ['Reflect',function(){return typeof Reflect!=='undefined';}],
    ['Promise',function(){return typeof Promise!=='undefined';}],
    ['fetch',function(){return typeof fetch!=='undefined';}],
    ['Worker',function(){return typeof Worker!=='undefined';}]
  ];
  var n=0; logEl.textContent='Capability probe:';
  for(var i=0;i<tests.length;i++){
    var ok=false; try{ok=!!tests[i][1]();}catch(e){}
    if(ok)n++; log(tests[i][0]+': '+(ok?'PASS':'N/A'));
  }
  set('probe',n+'/10 present'); log('Capabilities present: '+n+'/10');
}
function regression(){
  var started=Date.now(), failures=0, checks=0, i, a, p;
  logEl.textContent='Safe regression tests:';
  try{for(i=0;i<25000;i++){a=[i,i+1,i+2,i+3];checks+=(a[2]===i+2);}log('Array operations: PASS');}
  catch(e){failures++;log('Array operations: FAIL '+e);}
  try{for(i=0;i<10000;i++){p={a:i,b:String(i)};if(p.a!==i)throw new Error('object mismatch');checks++;}log('Object allocation: PASS');}
  catch(e){failures++;log('Object allocation: FAIL '+e);}
  try{var s='';for(i=0;i<4000;i++)s=('x'+i+s).slice(0,2048);log('String operations: PASS');}
  catch(e){failures++;log('String operations: FAIL '+e);}
  try{var b=new ArrayBuffer(1024*256),u=new Uint32Array(b);for(i=0;i<u.length;i+=257)u[i]=i;
      for(i=0;i<u.length;i+=257)if(u[i]!==i)throw new Error('typed-array mismatch');log('ArrayBuffer/TypedArray: PASS');}
  catch(e){failures++;log('ArrayBuffer/TypedArray: FAIL '+e);}
  log('Checks: '+checks);log('Elapsed: '+(Date.now()-started)+' ms');log('Failures: '+failures);
  set('stress',failures===0?'PASS':'FAIL ('+failures+')');
}
function exportLog(){
  var x=uaInfo();log('\n--- TEST RECORD ---');log('Timestamp: '+new Date().toISOString());
  log('Firmware: '+x.firmware);log('WebKit: '+x.webkit);log('URL: '+location.href);
  log('GoldHEN 14.00: no official supported release verified.');
}
document.getElementById('check').onclick=check;
document.getElementById('runProbe').onclick=probe;
document.getElementById('runStress').onclick=regression;
document.getElementById('exportLog').onclick=exportLog;
})();