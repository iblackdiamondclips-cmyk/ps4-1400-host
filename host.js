(function () {
  'use strict';

  var logEl = document.getElementById('log');
  var lastLog = 'ORBIT FIELD HUD v2.7 initialized. No payload will be executed.';

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

  function updateClock() {
    var now = new Date();
    var timeEl = document.getElementById('clock');
    var dateEl = document.getElementById('clockDate');
    if (timeEl) {
      try {
        timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      } catch (e) {
        timeEl.textContent = now.toTimeString().slice(0, 8);
      }
    }
    if (dateEl) {
      try {
        dateEl.textContent = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e2) {
        dateEl.textContent = now.toDateString();
      }
    }
  }

  function setVersionRow(id, active) {
    var row = document.getElementById(id);
    if (!row) return;
    row.className = row.className.replace(/\s*active-row/g, '');
    if (active) row.className += ' active-row';
  }

  function updateVersionMap(firmware) {
    var version = parseFloat(firmware);
    var rowId = 'rangeOther';
    var note = 'Detected target: ' + firmware + ' · this host does not launch exploits.';
    setVersionRow('rangeLegacy', false);
    setVersionRow('rangeRecent', false);
    setVersionRow('range1400', false);
    setVersionRow('rangeOther', false);

    if (firmware === '14.00') {
      rowId = 'range1400';
      note = 'Detected target: 14.00 · diagnostics only; automatic exploit launch is unavailable.';
    } else if (!isNaN(version) && version >= 5.05 && version <= 12.02) {
      rowId = 'rangeLegacy';
      note = 'Detected target: ' + firmware + ' · community methods vary by exact firmware; this host does not launch them.';
    } else if (!isNaN(version) && version >= 13.00 && version <= 13.52) {
      rowId = 'rangeRecent';
      note = 'Detected target: ' + firmware + ' · public methods exist for listed builds; this host does not launch them.';
    } else if (firmware === 'Unknown') {
      note = 'Firmware could not be read from this browser. Check the console browser and retry.';
    }

    setVersionRow(rowId, true);
    set('versionNote', note);
  }

  function check(isAutomatic) {
    var info = uaInfo();
    var isPS4 = /PlayStation/i.test(info.ua);
    var target = info.firmware === '14.00';
    set('environment', isPS4 ? 'PlayStation browser' : 'Browser available');
    set('firmware', info.firmware);
    set('heroFirmware', info.firmware === 'Unknown' ? 'Unknown' : info.firmware);
    set('webkit', info.webkit);
    set('entry', 'Not integrated');
    set('autoStatus', isAutomatic ? 'AUTO CHECK COMPLETE' : 'CHECK COMPLETE');
    set('overallStatus', target ? 'Firmware 14.00 detected · research mode' : (isPS4 ? 'Console browser detected' : 'Browser ready · console not detected'));
    set('overallDetail', target
      ? 'Browser entry and kernel access are not integrated. Automatic payload injection is disabled.'
      : 'This automatic check reads browser details only. No exploit or HEN is launched.');
    updateVersionMap(info.firmware);
    lastLog = 'ORBIT FIELD HUD v2.7 / environment check';
    log('PlayStation browser: ' + (isPS4 ? 'yes' : 'not detected'));
    log('Firmware: ' + info.firmware);
    log('WebKit: ' + info.webkit);
    log('Support map: updated for detected firmware');
    log('Automatic exploit injection: unavailable; no verified 14.00 chain');
    log('Payload execution: disabled');
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
      'ORBIT FIELD HUD v2.7 · PS4 Research Host',
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

  document.getElementById('check').addEventListener('click', function () { check(false); });
  document.getElementById('runProbe').addEventListener('click', probe);
  document.getElementById('runStress').addEventListener('click', regression);
  document.getElementById('exportLog').addEventListener('click', report);

  updateClock();
  window.setInterval(updateClock, 1000);
  check(true);
})();
