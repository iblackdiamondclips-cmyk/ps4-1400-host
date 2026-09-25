# Source audit: PS4 firmware 14.00

Checked 25 September 2026 against the public upstream repositories.

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

## Upstream references

- [GoldHEN source status](https://github.com/GoldHEN/GoldHEN#note)
- [GoldHEN v2.4b18.12 notes](https://ko-fi.com/s/85ea22bd2f)
- [GoldHEN BD-J loader offsets](https://github.com/GoldHEN/henloader_lp/blob/main/HenLoader/src/org/bdj/external/KernelOffset.java)
- [PS4-HEN 14.00 change](https://github.com/Scene-Collective/ps4-hen/commit/d077fb4031cf0e089fb7a233cebeebcd1ed3c68e)
- [PS4-HEN 13.52 parent change](https://github.com/Scene-Collective/ps4-hen/commit/2beb4cf)
