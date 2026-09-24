# PS4 14.00 Research Host v2.1

Adds a non-destructive WebKit capability/fingerprint probe and a PS4-WebKit-compatible table layout.

Pipeline:
Environment -> WebKit probe -> Userland entry -> Kernel execution -> 14.00 kpatch -> GoldHEN

The probe does not exploit WebKit and does not provide kernel execution. kpatch and GoldHEN remain gated.
