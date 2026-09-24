# PS4 14.00 Research Host v2.2

A non-destructive PS4 browser research harness.

## v2.2
- Detects PS4 firmware and AppleWebKit version.
- Runs a browser capability fingerprint.
- Adds repeatable, non-destructive JS/ArrayBuffer regression tests.
- Adds an on-screen test record with timestamp, firmware and WebKit.
- Keeps Userland, Kernel, 14.00 kpatch and HEN stages gated.

This project does **not** include or claim a working PS4 14.00 exploit.
The regression tests intentionally do not attempt memory corruption,
arbitrary read/write, kernel execution, patching, or payload loading.
