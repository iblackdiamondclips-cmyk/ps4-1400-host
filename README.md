# PS4 Research HUD v2.8

ORBIT is a static browser diagnostics page and firmware guide. It detects the browser's reported firmware, highlights the published upstream exploit-chain ranges, and links to the upstream WebKitty host for a manual visit. It does not contain or launch those exploit chains.

## Firmware map and limitations

The firmware rows reflect the compatibility table currently published by [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty#supported-by-this-repository): 6.70–6.72, 7.00–9.60, 7.00–11.02, 9.00–11.02, 11.00–12.02, 12.50–13.00, and 13.02–13.52. Some ranges overlap because the upstream host offers more than one chain. The table marks 5.05 as a legacy route outside that matrix. Gaps are not silently treated as supported.

WebKitty's README describes its listed chains as functional and tested, but its exploit can fail and crash/reboot the console. This project makes no success-rate promise. Its automatic check only reads browser information; a firmware match does not start a jailbreak.

GoldHEN compatibility is separate from exploit-chain compatibility. The upstream GoldHEN release page has its own firmware list, while WebKitty offers a GoldHEN selection. Neither fact establishes that one GoldHEN binary works on every firmware through 13.52. Use a build explicitly matched to the exact firmware. This project does not bundle GoldHEN or claim an official 13.52 GoldHEN build.

Firmware 14.00 remains **diagnostics only** in this project. Experimental kernel offsets, a payload loader, or a matching HEN artifact do not supply the missing entry-to-kernel exploit chain.

## Publish to GitHub Pages

Upload `index.html`, `host.js`, `style.css`, `experiment.html`, `experiment.js`, `README.md`, `SOURCE-AUDIT-14.00.md`, and the `payloads/` directory to the repository root. Enable GitHub Pages for that branch. The page should show **ORBIT · FIELD HUD / v2.8**. If an older copy appears, refresh the browser cache or add `?v=2.8` to the URL.

The **Open upstream host** button appears only when the detected firmware matches a range in the checked WebKitty matrix. It is a manual external link. Browser checks, report export, and the artifact verifier do not execute a payload. `experiment.html` only checks the included artifact's size and SHA-256.

## Sources

- [WebKitty compatibility and deployment notes](https://github.com/ArabPixel/WebKitty#supported-by-this-repository)
- [RawGame 11.00–13.00 host and hardware-tested range](https://github.com/rawgame4/rawgame4.github.io)
- [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases)
- [14.00 source audit](SOURCE-AUDIT-14.00.md)
