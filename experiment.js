(function () {
  'use strict';

  var output = document.getElementById('result');
  var expectedSize = 500448;
  var expectedSha256 = 'c05f6097dbc0707e8ec2fb5443ee507da6ac6e79c6fa8e9f78544658710efeff';

  function show(lines) { output.textContent = lines.join('\n'); }
  function toHex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  }

  function verify() {
    show(['Checking payloads/hen.bin...', 'No payload will be executed.']);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'payloads/hen.bin?verify=' + Date.now(), true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      var buffer = xhr.response;
      var size = buffer ? buffer.byteLength : 0;
      var lines = [
        'File: payloads/hen.bin',
        'HTTP status: ' + xhr.status,
        'Size: ' + size + ' bytes (expected ' + expectedSize + ')',
        'Size check: ' + (xhr.status === 200 && size === expectedSize ? 'PASS' : 'FAIL')
      ];
      if (xhr.status !== 200 || size !== expectedSize) {
        lines.push('Artifact check: FAIL');
        lines.push('No execution attempted.');
        show(lines);
        return;
      }
      if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
        window.crypto.subtle.digest('SHA-256', buffer).then(function (digest) {
          var hash = toHex(digest);
          lines.push('SHA-256: ' + hash);
          lines.push('Release hash check: ' + (hash === expectedSha256 ? 'PASS' : 'FAIL'));
          lines.push(hash === expectedSha256
            ? 'Matches PS4-HEN pre-release-main-182 hen.bin.'
            : 'Does not match the recorded pre-release-main-182 artifact.');
          lines.push('Artifact only; this does not test execution or jailbreak support.');
          show(lines);
        }).catch(function () {
          lines.push('SHA-256: unavailable (Web Crypto error)');
          lines.push('Only file availability and size were checked.');
          lines.push('No execution attempted.');
          show(lines);
        });
      } else {
        lines.push('SHA-256: unavailable in this browser');
        lines.push('Only file availability and size were checked.');
        lines.push('No execution attempted.');
        show(lines);
      }
    };
    xhr.onerror = function () {
      show(['Could not fetch payloads/hen.bin.', 'No execution attempted.']);
    };
    try { xhr.send(); }
    catch (e) { show(['Could not start file request.', 'No execution attempted.']); }
  }

  document.getElementById('run').addEventListener('click', verify);
})();
