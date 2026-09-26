(function () {
  'use strict';

  var byId = function (id) { return document.getElementById(id); };
  var ua = (navigator && navigator.userAgent) ? navigator.userAgent : '';
  var fwMatch = ua.match(/PlayStation\s*4(?:\s|\/|\s*\()([^;)\s]+)/i);
  var fwText = fwMatch ? fwMatch[1] : '';
  var fw = parseFloat(fwText);
  var webkitMatch = ua.match(/AppleWebKit\/([\d.]+)/i);
  var webkit = webkitMatch ? webkitMatch[1] : 'Άγνωστο';
  var supportedRows = [];
  var reportLines = [];

  function setText(id, value) {
    var el = byId(id);
    if (el) el.textContent = value;
  }
  function setStatus(id, text, state) {
    var el = byId(id);
    if (!el) return;
    el.textContent = text;
    el.className = state;
  }
  function row(id, active) {
    var el = byId(id);
    if (el) {
      if (active) el.classList.add('active-row');
      else el.classList.remove('active-row');
    }
  }
  function matchRange(low, high) { return fw >= low && fw <= high; }

  function checkFirmware() {
    supportedRows = [];
    var hero = byId('heroState');
    var upstream = byId('upstreamHost');
    var legacy = byId('legacyHost');
    if (upstream) upstream.hidden = true;
    if (legacy) legacy.hidden = true;
    ['fw505', 'fwLegacy', 'fw670', 'fw960', 'fw1102lapse', 'fw1102netctrl', 'fw1202', 'fw1300', 'fw1352', 'range1400', 'rangeOther'].forEach(function (id) { row(id, false); });

    setText('environment', /PlayStation 4/i.test(ua) ? 'PlayStation 4 browser' : 'Άγνωστο περιβάλλον');
    setText('webkit', webkit);
    setText('firmware', fwText || 'Άγνωστο');
    setText('heroFirmware', fwText || 'Άγνωστο');

    if (isFinite(fw) && Math.abs(fw - 5.05) < 0.001) {
      row('fw505', true);
      if (legacy) legacy.hidden = false;
      setStatus('entry', 'Legacy host διαθέσιμο', 'warn');
      setText('overallStatus', 'Legacy host 5.05');
      setText('overallDetail', 'Ανοίγει ξεχωριστό host. Η κάλυψη δεν προέρχεται από το WebKitty.');
      setText('routeTitle', 'Firmware 5.05 · ξεχωριστός host');
      setText('routeDetail', 'Το 5.05 δρομολογείται στον δημοσιευμένο GamerHack legacy host.');
      setText('versionNote', 'Εντοπίστηκε 5.05. Επιλεγμένη η ξεχωριστή legacy διαδρομή.');
      if (hero) hero.setAttribute('data-state', 'legacy');
    } else if (isFinite(fw) && Math.abs(fw - 14.00) < 0.001) {
      row('range1400', true);
      setStatus('entry', 'Coming soon · χωρίς host', 'bad');
      setText('overallStatus', '14.00 · Coming soon');
      setText('overallDetail', 'Δεν υπάρχει ενσωματωμένη, επαληθευμένη αλυσίδα entry-to-kernel.');
      setText('routeTitle', '14.00 · Coming soon');
      setText('routeDetail', 'Δεν εμφανίζεται σύνδεσμος εκκίνησης για αυτή την έκδοση.');
      setText('versionNote', 'Το 14.00 αναγνωρίζεται, αλλά δεν υποστηρίζεται από αυτό το πακέτο.');
      if (hero) hero.setAttribute('data-state', 'coming');
    } else if (isFinite(fw) && fw >= 6.70 && fw <= 13.52) {
      if (matchRange(6.70, 6.72)) supportedRows.push(['fw670', '6.70–6.72 · Bad Hoist + Sleirsgoevy']);
      if (matchRange(7.00, 9.60)) supportedRows.push(['fw960', '7.00–9.60 · PSFree + Lapse']);
      if (matchRange(7.00, 11.02)) supportedRows.push(['fw1102lapse', '7.00–11.02 · CSSFontFace + Lapse']);
      if (matchRange(9.00, 11.02)) supportedRows.push(['fw1102netctrl', '9.00–11.02 · CSSFontFace + Netctrl']);
      if (matchRange(11.00, 12.02)) supportedRows.push(['fw1202', '11.00–12.02 · Slopkit + Lapse']);
      if (matchRange(12.50, 13.00)) supportedRows.push(['fw1300', '12.50–13.00 · Slopkit + Netctrl']);
      if (matchRange(13.02, 13.52)) supportedRows.push(['fw1352', '13.02–13.52 · Slopkit + Relapse']);

      if (supportedRows.length) {
        supportedRows.forEach(function (item) { row(item[0], true); });
        if (upstream) upstream.hidden = false;
        setStatus('entry', 'Δημοσιευμένο εύρος · upstream host', 'good');
        setText('overallStatus', 'Αντιστοιχεί σε upstream εύρος');
        setText('overallDetail', 'Η διαδρομή ανοίγει χειροκίνητα. Η επιτυχία δεν είναι εγγυημένη.');
        setText('routeTitle', 'Άνοιγμα WebKitty για ' + fwText);
        setText('routeDetail', supportedRows.map(function (item) { return item[1]; }).join(' · '));
        setText('versionNote', 'Η έκδοση ' + fwText + ' αντιστοιχεί στα επισημασμένα εύρη.');
        if (hero) hero.setAttribute('data-state', 'supported');
      } else {
        row('rangeOther', true);
        setStatus('entry', 'Δεν υπάρχει αντιστοιχισμένη αλυσίδα', 'bad');
        setText('overallStatus', 'Μη χαρτογραφημένη έκδοση');
        setText('overallDetail', 'Η έκδοση βρίσκεται ανάμεσα στα όρια του πίνακα, αλλά δεν έχει δημοσιευμένη διαδρομή.');
        setText('routeTitle', 'Δεν υπάρχει διαθέσιμη διαδρομή');
        setText('routeDetail', 'Δεν εμφανίζεται κουμπί host για κενά όπως 12.03–12.49 ή 13.01.');
        setText('versionNote', 'Δεν βρέθηκε ακριβής αντιστοίχιση για την έκδοση ' + fwText + '.');
        if (hero) hero.setAttribute('data-state', 'unsupported');
      }
    } else {
      row('rangeOther', true);
      setStatus('entry', 'Άγνωστο ή μη υποστηριζόμενο', 'bad');
      setText('overallStatus', 'Δεν υπάρχει host για αυτή την έκδοση');
      setText('overallDetail', 'Ο πίνακας εμφανίζει μόνο ρητά δημοσιευμένα εύρη και το ξεχωριστό 5.05.');
      setText('routeTitle', 'Δεν υπάρχει διαθέσιμη διαδρομή');
      setText('routeDetail', 'Έλεγξε την έκδοση συστήματος και τον επίσημο πίνακα συμβατότητας.');
      setText('versionNote', fwText ? 'Η έκδοση ' + fwText + ' δεν βρίσκεται στα δημοσιευμένα εύρη.' : 'Δεν εντοπίστηκε έκδοση firmware στο user agent.');
      if (hero) hero.setAttribute('data-state', 'unsupported');
    }
    reportLines = [
      'ORBIT FIELD HUD 3.0',
      'Firmware: ' + (fwText || 'unknown'),
      'WebKit: ' + webkit,
      'Environment: ' + (/PlayStation 4/i.test(ua) ? 'PlayStation 4 browser' : 'unknown'),
      'Matched routes: ' + (supportedRows.length ? supportedRows.map(function (item) { return item[1]; }).join('; ') : 'none'),
      'Automatic exploit/payload execution: disabled'
    ];
    setText('log', reportLines.join('\n'));
  }

  function probeBrowser() {
    var tests = [
      ['Promise', typeof window.Promise === 'function'],
      ['TextEncoder', typeof window.TextEncoder === 'function'],
      ['crypto.subtle', !!(window.crypto && window.crypto.subtle)],
      ['localStorage', (function () { try { var k = '__orbit_probe'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; } catch (e) { return false; } }())]
    ];
    var passed = tests.filter(function (test) { return test[1]; }).length;
    setText('probe', passed + '/' + tests.length + ' διαθέσιμα');
    setText('log', reportLines.concat(['Browser capabilities: ' + tests.map(function (test) { return test[0] + '=' + (test[1] ? 'yes' : 'no'); }).join(', '), 'These checks do not test exploitability.']).join('\n'));
  }

  function basicChecks() {
    var checks = [
      ['Σύνδεση stylesheet', !!document.querySelector('link[rel="stylesheet"]')],
      ['Σύνδεση script', !!document.querySelector('script[src*="host.js"]')],
      ['Firmware parser', !!fwText],
      ['Χειροκίνητη εκκίνηση', true]
    ];
    var passed = checks.filter(function (check) { return check[1]; }).length;
    setText('stress', passed + '/' + checks.length + ' έλεγχοι OK');
    setText('log', reportLines.concat(['Basic page checks: ' + checks.map(function (check) { return check[0] + '=' + (check[1] ? 'OK' : 'missing'); }).join(', ')]).join('\n'));
  }

  function updateClock() {
    var now = new Date();
    setText('clock', now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setText('clockDate', now.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }));
  }

  var checkButton = byId('check');
  if (checkButton) checkButton.addEventListener('click', checkFirmware);
  var probeButton = byId('runProbe');
  if (probeButton) probeButton.addEventListener('click', probeBrowser);
  var basicButton = byId('runStress');
  if (basicButton) basicButton.addEventListener('click', basicChecks);
  var logButton = byId('exportLog');
  if (logButton) logButton.addEventListener('click', function () {
    setText('log', reportLines.join('\n'));
    var log = byId('log');
    if (log) log.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  checkFirmware();
  updateClock();
  window.setInterval(updateClock, 1000);
}());
