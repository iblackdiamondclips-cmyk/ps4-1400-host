(function () {
  'use strict';

  var logEl = document.getElementById('log');
  var lastLog = 'Research host initialized. No payload will be executed.';

  function set(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function log(line) {
    lastLog += '\n' + line;
    logEl.textContent = lastLog;
  }

  function uaInfo() {
    var ua = navigator.userAgent || '';
    var fw = ua.match(/PlayStation\s*4\s*([0-9]+\.[0-9]+)/i) ||
      ua.match(/PlayStation(?:;|\s)+PlayStation 4\/([0-9.]+)/i);
    var wk = ua.match(/AppleWebKit\/([0-9.]+)/i);
    return { ua: ua, firmware: fw ? fw[1] : 'Unknown', webkit: wk ? wk[1] : 'Unknown' };
  }

  function check() {
    var info = uaInfo();
    var isPS4 = /PlayStation/i.test(info.ua);
    var target = info.firmware === '14.00';
    set('environment', isPS4 ? 'PlayStation browser' : 'Browser available');
    set('firmware', info.firmware);
    set('webkit', info.webkit);
    set('entry', 'Not integrated');
    set('overallStatus', target ? '14.00 detected · diagnostics only' : 'Diagnostics ready');
    set('overallDetail', target
      ? 'The browser reports firmware 14.00. This does not mean an exploit is available.'
      : 'This page checks the browser only. No exploit or HEN is integrated.');
    lastLog = 'Environment check';
    log('PlayStation browser: ' + (isPS4 ? 'yes' : 'not detected'));
    log('Firmware: ' + info.firmware);
    log('WebKit: ' + info.webkit);
    log('Browser entry: not integrated');
    log('Kernel execution: disabled');
    log('HEN execution: disabled');
  }

  function probe() {
    var tests = [
      ['BigInt', function () { return typeof BigInt !== 'undefined'; }],
      ['WebAssembly', function () { return typeof WebAssembly !== 'undefined'; }],
      ['SharedArrayBuffer', function () { return typeof SharedArrayBuffer !== 'undefined'; }],
      ['Atomics', function () { return typeof Atomics !== 'undefined'; }],
      ['BigUint64Array', function () { return typeof BigUint64Array !== 'undefined'; }],
      ['Proxy', function () { return typeof Proxy !== 'undefined'; }],
      ['Reflect', function () { return typeof Reflect !== 'undefined'; }],
      ['Promise', function () { return typeof Promise !== 'undefined'; }],
      ['fetch', function () { return typeof fetch !== 'undefined'; }],
      ['Worker', function () { return typeof Worker !== 'undefined'; }]
    ];
    var count = 0;
    lastLog = 'Browser capability checks';
    tests.forEach(function (test) {
      var ok = false;
      try { ok = !!test[1](); } catch (e) { ok = false; }
      if (ok) count++;
      log(test[0] + ': ' + (ok ? 'present' : 'unavailable'));
    });
    set('probe', count + '/' + tests.length + ' present');
    log('These checks do not test exploitability.');
  }

  function regression() {
    var start = Date.now();
    var failures = 0;
    var checks = 0;
    var i;
    lastLog = 'Safe browser regression checks';
    try {
      for (i = 0; i < 10000; i++) {
        var arr = [i, i + 1, i + 2];
        if (arr[2] !== i + 2) throw new Error('array mismatch');
        checks++;
      }
      log('Array operations: PASS');
    } catch (e) { failures++; log('Array operations: FAIL'); }
    try {
      var buffer = new ArrayBuffer(65536);
      var view = new Uint32Array(buffer);
      for (i = 0; i < view.length; i += 127) view[i] = i;
      for (i = 0; i < view.length; i += 127) {
        if (view[i] !== i) throw new Error('typed-array mismatch');
        checks++;
      }
      log('ArrayBuffer and TypedArray: PASS');
    } catch (e) { failures++; log('ArrayBuffer and TypedArray: FAIL'); }
    try {
      var sample = { firmware: '14.00', browserOnly: true };
      if (sample.firmware !== '14.00' || sample.browserOnly !== true) throw new Error('object mismatch');
      checks++;
      log('Object operations: PASS');
    } catch (e) { failures++; log('Object operations: FAIL'); }
    set('stress', failures ? 'FAIL (' + failures + ')' : 'PASS');
    log('Checks: ' + checks);
    log('Elapsed: ' + (Date.now() - start) + ' ms');
    log('Failures: ' + failures);
    log('Kernel and HEN execution: not tested');
  }

  function report() {
    var info = uaInfo();
    var reportText = [
      'PS4 14.00 Research Host v2.5',
      'Timestamp: ' + new Date().toISOString(),
      'Firmware: ' + info.firmware,
      'WebKit: ' + info.webkit,
      'URL: ' + location.href,
      'Browser entry: not integrated',
      'Kernel execution: disabled',
      'HEN execution: disabled',
      '', lastLog
    ].join('\n');
    logEl.textContent = reportText;
  }

  document.getElementById('check').addEventListener('click', check);
  document.getElementById('runProbe').addEventListener('click', probe);
  document.getElementById('runStress').addEventListener('click', regression);
  document.getElementById('exportLog').addEventListener('click', report);
})();
