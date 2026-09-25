# PS4 Firmware Host v2.9

ORBIT is a firmware-detecting landing page with the upstream WebKitty jailbreak host bundled under `webkitty/`. For supported ranges, it opens the integrated host; that host provides the browser/kernel chains and GoldHEN/HEN selection. Firmware 5.05 routes to a separate legacy GamerHack host. The landing page itself never launches an exploit automatically.

## Coverage and limits

WebKitty's current compatibility table lists exploit chains for 6.70–6.72, 7.00–9.60, 7.00–11.02, 9.00–11.02, 11.00–12.02, 12.50–13.00, and 13.02–13.52. The ranges overlap because more than one chain is available for some builds. WebKitty reports those chains as tested, but also says attempts can fail and crash or reboot the console. No success rate is guaranteed.

Firmware 5.05 uses a separate legacy host. Other unlisted versions and gaps are not silently treated as supported. Firmware 14.00 remains diagnostics only: this package has no reproducible 14.00 entry-to-kernel exploit chain.

GoldHEN support is tied to the exact payload build, separately from exploit-chain support. The included upstream WebKitty source has a firmware-aware GoldHEN selector and binaries; check its selected build and the source's notes for the target firmware. The presence of a GoldHEN option is not a promise that one build works across every version.

## Upstream component and license

`webkitty/` is an unmodified copy of [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty), commit `10f671dda5f3b28c26f41d5a37e19d15bf3fe662` (2026-09-22), distributed under the included AGPL-3.0-or-later license. Its README, license, source files, manifests, and assets are included. Third-party payloads keep their own licensing and attribution notices. This project's landing page remains separate from that upstream component.

The firmware 5.05 button opens the published [GamerHack 5.05 host](https://gamerhack.github.io/505/index.html); its source is not copied into this repository.

## Publish to GitHub Pages

Upload all root files **and the complete `webkitty/` directory tree**, preserving the directory names and binary files. Enable GitHub Pages for the branch, then open the published root `index.html` on the PS4. The page should show **ORBIT HUD / v2.9**. If a cached copy appears, refresh and open the URL with `?v=2.9`.

The landing page reads the browser's firmware string and only reveals a route. The exploit starts after the user opens the selected host and uses its launch control. Use a firmware-matched option and expect that an attempt may fail.

## Sources

- [WebKitty compatibility matrix and source](https://github.com/ArabPixel/WebKitty)
- [WebKitty release host](https://webkitty.arabpixel.net/)
- [GamerHack 5.05 host](https://gamerhack.github.io/505/index.html)
- [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases)
- [14.00 source audit](SOURCE-AUDIT-14.00.md)
