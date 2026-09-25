# PS4 14.00 Research Host v2.6

A static GitHub Pages browser diagnostics page for a PS4 reporting firmware 14.00. It provides environment detection, browser capability probes, small safe regression checks, a stage-status view, a text report, and a check for the experimental PS4-HEN binary.

## Execution status

This repository does not include a 14.00 browser entry exploit or an integrated HEN loader. The 14.00 `kpatch` source is a kernel patch stage and cannot start by itself. This host deliberately does not execute payloads. A green browser check only reports browser behavior; it does not establish exploit or HEN compatibility.

Scene-Collective's `pre-release-main-182` adds 14.00 offsets, sets `MAX_FW` to 1400, and publishes an experimental `hen.bin`. The local `payloads/hen.bin` in this repository has SHA-256 `c05f6097dbc0707e8ec2fb5443ee507da6ac6e79c6fa8e9f78544658710efeff`, matching the digest reported for that release asset. The README still lists normal support through 12.02, so treat the 14.00 work as experimental. This artifact does not supply the browser entry or a tested 14.00 execution chain. The GoldHEN files supplied separately list support through 13.52.

## Publish to GitHub Pages

Upload `index.html`, `host.js`, `style.css`, `experiment.html`, `experiment.js`, and the `payloads/` directory to the repository root. Enable GitHub Pages for that branch, then open the published page in the PS4 browser. The page should show **v2.6**. If an older version appears, refresh the browser cache or change the page URL query, for example `?v=2.6`.

The buttons on the main page only inspect browser properties, run bounded JavaScript checks, or display a report. The experiment page checks the local `hen.bin` size and SHA-256 against the recorded release asset when Web Crypto is available. It has no execution path.
