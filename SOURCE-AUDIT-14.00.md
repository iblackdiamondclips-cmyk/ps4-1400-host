# Source audit: PS4 firmware 14.00

Checked 25 September 2026 against the public upstream repositories.

## Broader scene check (25 September 2026)

- A public Raw Game/`raw13g.github.io` release now chains the Slopkit WebKit entry with the Relapse kernel exploit for PS4 firmware 13.02–13.52. The PS4 Developer Wiki lists that range and says Relapse may be patched in 14.00. This is useful evidence about the likely firmware boundary, but does not establish whether the underlying bug is definitely patched on 14.00; the published host and offsets stop at 13.52.
- A screenshot relayed by community/news channels is reported to show a PS4 on 14.00, PS4HEN 2.20 BETA, and the label `BD-JB4-1400`. I could not independently retrieve the original X post or any matching public source/release. Treat it as an unverified sign of private testing, not a downloadable or reproducible jailbreak.
- Public posts on Reddit/Telegram and search-indexed social results repeat the screenshot or speculate about a 14.00 release, but the search found no public 14.00 exploit source, payload chain, or independently reproducible test. A firmware offset table or a loader's 14.00 case is not kernel access.

## Newly confirmed payload-loader support

- `ps4-payload-dev/elfldr` PR #12, merged on 24 September 2026, adds firmware cases for 13.52 and 14.00 and a kernel pattern used by the ELF loader.
- This is support for loading/running payloads in an environment where the console is already jailbroken and the loader can access the kernel. It does not provide the browser/BD-J entry point, a kernel exploit, or a jailbreak chain.
- This is useful compatibility work for a future 14.00 chain, but it does not change the execution status shown by this host.

## GoldHEN

- The public `GoldHEN/GoldHEN` repository contains releases and documentation, not the current GoldHEN source. Its README says the project source is private.
- The public BD-J `GoldHEN/henloader_lp` source has kernel-offset entries through firmware 13.00 in `KernelOffset.java`; it does not provide a 14.00 GoldHEN port.
- GoldHEN v2.4b18.12's release notes list firmware 13.02, 13.04, and 13.50. Community hosts may package other beta builds, but those binaries do not let us rebuild or modify GoldHEN from source.

## Open PS4-HEN work

- Scene-Collective commit `2beb4cf` added 13.52 support; commit `d077fb4` (`pre-release-main-182`) adds a 14.00 offset table, selects it for firmware 1400, and raises `MAX_FW` to 1400.
- The 14.00 table includes kernel and system patch offsets. The upstream README still describes normal supported firmware as 5.05–12.02, so the later 14.00 changes remain pre-release/experimental.
- Local source check: `make -C kpayload payload` completed successfully at `d077fb4`. This verifies that the kernel-payload C sources compile and link. It does not test the offsets on a console, build GoldHEN, or provide a browser entry/kernel exploit chain.

## What remains before a working 14.00 GoldHEN host

1. A public, hardware-tested 14.00 entry point and compatible kernel exploit chain.
2. An official GoldHEN 14.00 build or permissioned source/build inputs sufficient to port and validate GoldHEN itself.
3. On-console testing of the full chain and payload.

The existing host therefore stays in diagnostics/artifact-verification mode. The experimental PS4-HEN payload must not be labelled as GoldHEN or as a working 14.00 jailbreak.

The new `elfldr` 14.00 case and PS4-HEN offset table are components that may be useful after a valid entry point and kernel exploit exist. They cannot be combined into an exploit by changing firmware labels or offsets alone. No public, reproducible 14.00 browser/BD-J-to-kernel chain was found in this audit.

## Upstream references

- [GoldHEN source status](https://github.com/GoldHEN/GoldHEN#note)
- [GoldHEN v2.4b18.12 notes](https://ko-fi.com/s/85ea22bd2f)
- [GoldHEN BD-J loader offsets](https://github.com/GoldHEN/henloader_lp/blob/main/HenLoader/src/org/bdj/external/KernelOffset.java)
- [PS4-HEN 14.00 change](https://github.com/Scene-Collective/ps4-hen/commit/d077fb4031cf0e089fb7a233cebeebcd1ed3c68e)
- [PS4-HEN 13.52 parent change](https://github.com/Scene-Collective/ps4-hen/commit/2beb4cf)
- [ELF loader 13.52/14.00 support, merged PR #12](https://github.com/ps4-payload-dev/elfldr/pull/12)
- [Raw Game 13.02–13.52 host](https://github.com/raw13g/raw13g.github.io)
- [PS4 Developer Wiki vulnerability status](https://www.psdevwiki.com/ps4/Vulnerabilities)
- [Community report of the BD-JB4-1400 screenshot](https://experting67.rssing.com/chan-63777444/latest.php)
