(function () {
  'use strict';
  var out = document.getElementById('result');
  function line(s) { out.textContent += '\n' + s; }
  function binary(path, expectedSize, done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path + '?check=1', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      var n = xhr.response && xhr.response.byteLength;
      var ok = xhr.status === 200 && n === expectedSize;
      line(path + ': ' + (ok ? 'present' : 'unavailable or size mismatch') +
        ' (' + (n || 0) + ' bytes, HTTP ' + xhr.status + ')');
      done();
    };
    xhr.onerror = function () { line(path + ': request failed'); done(); };
    try { xhr.send(); } catch (e) { line(path + ': request failed'); done(); }
  }
  document.getElementById('run').onclick = function () {
    var ua = navigator.userAgent || '';
    var m = /PlayStation 4\/([0-9.]+)/i.exec(ua);
    out.textContent = 'Firmware from browser: ' + (m ? m[1] : 'unknown');
    line('Target 14.00: ' + (m && m[1] === '14.00' ? 'YES' : 'NO'));
    binary('payloads/hen.bin', 500448, function () {
      binary('patches/1400.bin', 314, function () {
        line('13.52 loader: no verified 14.00 WebKit addresses or kernel entry.');
        line('Execution result: BLOCKED BEFORE KERNEL / HEN.');
      });
    });
  };
}());
