(function(){
  const fwEl=document.getElementById('fw'), log=document.getElementById('log');
  function detectFirmware(){
    const ua=navigator.userAgent;
    // Typical PS4 UA contains: "PlayStation 4 X.XX"
    const m=ua.match(/PlayStation 4[\s\/]([0-9]+\.[0-9]+)/i);
    return m ? m[1] : "Unknown";
  }
  function line(s){ log.textContent += "\n"+s; }
  const fw=detectFirmware();
  fwEl.textContent=fw;
  document.getElementById('check').onclick=function(){
    log.textContent="Environment check:";
    line("User agent: "+navigator.userAgent);
    line("Firmware: "+fw);
    if(fw==="14.00"){
      line("14.00 detected.");
      line("kpatch integration point is reserved.");
      line("No kernel exploit is bundled or claimed working.");
    } else {
      line("This scaffold is focused on firmware 14.00 research.");
    }
  };
})();