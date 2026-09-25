# PS4 firmware compatibility and 14.00 audit

Checked 25 September 2026 against public upstream GitHub repositories and their compatibility notes.

## Public exploit-chain ranges through 13.52

ArabPixel/WebKitty's README has a firmware table explicitly described as functional and tested by that repository. It lists these userland/kernel combinations:

| Firmware | Userland | Kernel |
|---|---|---|
| 6.70–6.72 | Bad Hoist | Sleirsgoevy's kexploit |
| 7.00–9.60 | PSFree | Lapse |
| 7.00–11.02 | CSSFontFace | Lapse |
| 9.00–11.02 | CSSFontFace | Netctrl |
| 11.00–12.02 | Slopkit | Lapse |
| 12.50–13.00 | Slopkit | Netctrl |
| 13.02–13.52 | Slopkit | Relapse |

The ranges overlap because the host can select different chains. The HUD preserves that overlap when highlighting a detected firmware. It does not fill gaps such as 12.03–12.49 or 13.01 by interpolation. WebKitty says exploit attempts are nondeterministic and may crash/reboot the console, so a firmware being listed is not a 100% success guarantee.

RawGame's separate public host documents Slopkit with Lapse/Poops through 13.00 and lists its hardware-tested builds as 11.00, 11.50, 12.00, 12.02, 12.50, 12.52, and 13.00. The newer 13.02–13.52 Relapse range is listed by WebKitty and by the Raw13G host. This is why the HUD links to WebKitty's current matrix rather than presenting RawGame's 13.00 table as a 13.52 chain.

Firmware 5.05 has legacy methods and an official GoldHEN release target, but it is outside the current WebKitty exploit-chain table; the HUD marks it as a separate legacy route rather than implying the linked host covers it.

## GoldHEN status

GoldHEN has its own firmware-specific releases. Its GitHub release notes list supported firmware separately from the exploit host. The bundled WebKitty source includes GoldHEN payload files through v2.4b18.12; its firmware selector leaves the GoldHEN option enabled on 13.52 and defaults newer builds to v2.4b18.12. This shows that the upstream host intends a GoldHEN route through 13.52. I have verified the source files are included, but have not run the binaries on a console. Treat the exact HEN result as upstream-provided, not as a test performed by this project.

The HUD links 5.05 to a separate published GamerHack host because WebKitty's own exploit-chain table starts at 6.70. Firmware below 6.70 other than 5.05 is not bundled here.

## Firmware 14.00

- Scene-Collective's PS4-HEN `pre-release-main-182` includes a 14.00 offset table and a `hen.bin` artifact, but the repository README's normal support range remains 5.05–12.02. Treat the 14.00 offsets and artifact as experimental; this is not GoldHEN.
- Public `elfldr` 14.00 firmware handling is payload-loader compatibility for an already jailbroken environment. It does not provide browser/BD-J entry or kernel access.
- The checked public sources do not provide a reproducible, tested 14.00 browser/BD-J-to-kernel chain. The host therefore keeps 14.00 in diagnostics-only mode and keeps automatic execution disabled.

## Upstream references

- [ArabPixel/WebKitty firmware compatibility matrix](https://github.com/ArabPixel/WebKitty#supported-by-this-repository)
- Bundled upstream snapshot: [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty), commit `10f671dda5f3b28c26f41d5a37e19d15bf3fe662` (2026-09-22), license and full source under `webkitty/`.
- [GamerHack 5.05 host](https://gamerhack.github.io/505/index.html)
- [RawGame PS4 WebKit host (11.00–13.00)](https://github.com/rawgame4/rawgame4.github.io)
- [Raw13G PS4 host](https://raw13g.github.io/)
- [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases)
- [GoldHEN HEN loader source](https://github.com/GoldHEN/henloader_lp)
- [Scene-Collective PS4-HEN](https://github.com/Scene-Collective/ps4-hen)
- [PS4-HEN 14.00 offset change](https://github.com/Scene-Collective/ps4-hen/commit/d077fb4031cf0e089fb7a233cebeebcd1ed3c68e)
- [PS4 payload loader](https://github.com/ps4-payload-dev/elfldr)
