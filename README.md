# PS4 14.00 Research Host v2.3

This version adds a PS4-HEN 14.00 payload staging slot.

## Payload path
Place the 14.00-capable HEN build at:

`payloads/hen-1400.bin`

The host can verify that the file is reachable and stage it in browser memory.

## Important
The Scene-Collective PS4-HEN project added firmware 14.00 offsets/support in commit d077fb4.
This host does **not** contain a userland or kernel exploit and therefore does not claim to inject or execute HEN.
The execution stages remain gated until a real execution path is integrated.

Keep v2.2 as a known-good backup.
