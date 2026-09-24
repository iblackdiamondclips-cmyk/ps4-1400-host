# PS4 14.00 Research Host v2.4

Static GitHub Pages browser diagnostics for a PS4 reporting firmware 14.00.

## GoldHEN status

As checked on 2026-09-24, the [official GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases) list no firmware 14.00 support. The latest release shown there is beta v2.4b18 (supported firmware through 11.00); GitHub marks v2.3 as the latest stable release. This host does not contain an exploit or a GoldHEN loader.

Firmware detection and passing JavaScript regression checks do not imply that GoldHEN can execute. The separate [Scene-Collective PS4-HEN source](https://github.com/Scene-Collective/ps4-hen/tree/main/kpayload) includes `offsets/1400.c` and a firmware 1400 selector as of commit `d077fb4` (2026-09-19). That is PS4-HEN, not GoldHEN. The [pre-release-main-182](https://github.com/Scene-Collective/ps4-hen/releases/tag/pre-release-main-182) from the same commit provides a `hen.bin` asset (500,448 bytes). Its README still states support through 12.02, so the release should be treated as experimental for 14.00. The binary does not supply a browser or kernel entry point for this GitHub Pages host. The earlier `payloads/hen-1400.bin` placeholder was removed because the host cannot execute it. Do not rename a payload for another firmware and attempt to load it.

When a tested 14.00 compatible release and execution path are published, update this host using the publisher's instructions and verify on the console.

## PS4 test

Upload `index.html`, `host.js`, `style.css`, and `README.md` to the root of your GitHub repository. Refresh GitHub Pages on the PS4. The page should read **v2.4** and report firmware 14.00. The environment, capability and regression buttons test the browser only; they never start HEN. If the page still reads v2.3, the new files have not been published or the browser is showing a cached copy.
