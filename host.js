(function(){
var logEl=document.getElementById('log');
function fw(){var u=navigator.userAgent||'',m=u.match(/PlayStation 4[^0-9]*([0-9]+\.[0-9]+)/i);return m?m[1]:'Unknown'}
function out(s){logEl.textContent+='\n'+s}
function cls(id,t,c){var e=document.getElementById(id);e.textContent=t;e.className=c||''}
function env(){
 var f=fw(),u=navigator.userAgent||'';
 document.getElementById('fw').textContent=f; logEl.textContent='Environment check:';
 out('User agent: '+u); out('Firmware: '+f);
 out('WebKit string: '+((u.match(/AppleWebKit\/([0-9.]+)/)||[])[1]||'Unknown'));
 if(f==='14.00'){cls('env','Verified 14.00','ok');out('Target firmware verified.')}
 else{cls('env','Different target','warn');out('This host is configured for firmware 14.00.')}
}
function probe(){
 logEl.textContent='WebKit capability probe:';
 var tests=[
 ['BigInt',typeof BigInt!=='undefined'],
 ['WebAssembly',typeof WebAssembly!=='undefined'],
 ['SharedArrayBuffer',typeof SharedArrayBuffer!=='undefined'],
 ['Atomics',typeof Atomics!=='undefined'],
 ['BigUint64Array',typeof BigUint64Array!=='undefined'],
 ['Proxy',typeof Proxy!=='undefined'],
 ['Reflect',typeof Reflect!=='undefined'],
 ['Promise',typeof Promise!=='undefined'],
 ['fetch',typeof fetch!=='undefined'],
 ['Worker',typeof Worker!=='undefined']
 ];
 var pass=0;
 for(var i=0;i<tests.length;i++){out(tests[i][0]+': '+(tests[i][1]?'PASS':'N/A'));if(tests[i][1])pass++}
 out('Capabilities present: '+pass+'/'+tests.length);
 out('No exploit primitive was executed.');
 cls('probe','Completed ('+pass+'/'+tests.length+')','ok');
}
document.getElementById('check').onclick=env;
document.getElementById('webkit').onclick=probe;
document.getElementById('fw').textContent=fw();
})();