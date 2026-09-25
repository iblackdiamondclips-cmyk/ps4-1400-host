# PS4 14.00 Research Host v2.5

A static GitHub Pages browser diagnostics page for a PS4 reporting firmware 14.00. It provides environment detection, browser capability probes, small safe regression checks, a stage-status view, and a text report.

## Execution status

This repository does not include a browser entry exploit or an integrated HEN loader. The 14.00 `kpatch` source is a kernel patch stage and cannot start by itself. This host deliberately does not execute payloads. A green browser check only reports browser behavior; it does not establish exploit or HEN compatibility.

The attached GoldHEN documentation lists support through firmware 13.52. The public PS4-HEN project currently documents support through 12.02, although experimental 14.00 offsets have appeared in its source history. Neither fact supplies the missing browser entry for this host.

## Publish to GitHub Pages

Upload `index.html`, `host.js`, `style.css`, `experiment.html`, `experiment.js`, and the `payloads/` directory to the repository root. Enable GitHub Pages for that branch, then open the published page in the PS4 browser. The page should show **v2.5**. If an older version appears, refresh the browser cache or change the page URL query, for example `?v=2.5`.

The buttons on the main page only inspect browser properties, run bounded JavaScript checks, or display a report. The integration experiment only checks whether expected files are present and has no execution path.
