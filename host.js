(function(){
  var logEl=document.getElementById('log');
  function log(s){logEl.textContent += '\n'+s;}
  function firmware(){
    var ua=navigator.userAgent||'';
    var m=ua.match(/PlayStation 4[^0-9]*([0-9]+\.[0-9]+)/i);
    return m?m[1]:'Unknown';
  }
  function set(id,text,cls){var e=document.getElementById(id);e.textContent=text;e.className=cls||'';}
  function detect(){
    var fw=firmware(), ua=navigator.userAgent||'';
    document.querySelector('#fw b').textContent=fw;
    logEl.textContent='Environment check:';
    log('User agent: '+ua);
    log('Firmware: '+fw);
    if(fw==='14.00'){
      set('s-env','Verified 14.00','ok');
      log('14.00 detected.');
      log('Userland stage: not integrated.');
      log('Kernel stage: not integrated.');
      log('kpatch stage: gated.');
      log('GoldHEN stage: gated pending a verified 14.00-compatible build.');
    }else{
      set('s-env','Unsupported test target','warn');
      log('This build is configured for PS4 firmware 14.00.');
    }
  }
  document.getElementById('check').onclick=detect;
  document.getElementById('pipeline').onclick=function(){
    log('Pipeline remains locked: required 14.00 entry/kernel stages are not integrated.');
  };
  var fw=firmware();
  document.querySelector('#fw b').textContent=fw;
})();