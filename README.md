# ORBIT · PS4 Firmware Host v3.0

ORBIT is a firmware-aware landing page with a redesigned console HUD. It checks the PS4 browser user agent, highlights only firmware ranges declared by the bundled upstream [WebKitty](https://github.com/ArabPixel/WebKitty) source, and reveals the matching host link. It never launches an exploit or payload automatically.

## Published firmware ranges

| Firmware | Published chain / route |
| --- | --- |
| 5.05 | Separate GamerHack legacy host |
| 6.70–6.72 | Bad Hoist + Sleirsgoevy kernel exploit |
| 7.00–9.60 | PSFree + Lapse |
| 7.00–11.02 | CSSFontFace + Lapse |
| 9.00–11.02 | CSSFontFace + Netctrl |
| 11.00–12.02 | Slopkit + Lapse |
| 12.50–13.00 | Slopkit + Netctrl |
| 13.02–13.52 | Slopkit + Relapse |
| 14.00 | Coming soon; no launch link or supported chain in this package |

Overlapping ranges mean WebKitty lists alternative chains. Gaps such as 12.03–12.49 and 13.01 are not treated as supported. Exploit attempts can fail or crash/reboot the console. The page's browser checks do not predict exploit success.

GoldHEN is selected by the upstream host and its exact payload build. Payload availability and jailbreak-chain compatibility are separate; check WebKitty's displayed build and upstream release notes for the target firmware. This package does not claim that one GoldHEN binary works on every listed version.

## Install on GitHub Pages

Extract the ZIP and upload its contents to the repository root, preserving the complete `webkitty/` folder structure and binary files. Keep `index.html`, `host.js`, and `style.css` together at the repository root. If the older repository still has `experiment.html`, `experiment.js`, or `payloads/hen.bin`, delete those old files from GitHub; uploading the new files does not remove files that are already there. Enable GitHub Pages for the branch, then open the published site on the PS4 browser. The firmware page is a selector; open the shown host and use its launch control manually.

If the old page is cached, reload the site or add `?v=3.0` to the URL.

## Upstream component and license

`webkitty/` is an unmodified copy of [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty), commit `10f671dda5f3b28c26f41d5a37e19d15bf3fe662` (2026-09-22), under the included AGPL-3.0-or-later license. Its source, release assets, manifests, license, and attribution files are preserved. Third-party payloads retain their own licenses and attribution.

The 5.05 button opens the separately published [GamerHack host](https://gamerhack.github.io/505/index.html); that host's files are not bundled here.

## References

- [WebKitty source and compatibility matrix](https://github.com/ArabPixel/WebKitty)
- [WebKitty hosted release](https://webkitty.arabpixel.net/)
- [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases)
- [14.00 source audit](SOURCE-AUDIT-14.00.md)
