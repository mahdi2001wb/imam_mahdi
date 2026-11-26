# Service image generator (optional)
`scenes.html` draws every service mockup (devices + your real portfolio screenshots from `assets/`)
and `render.mjs` screenshots them with headless Chromium (puppeteer-core). The PNGs were then
converted to 960x600 WebP into `assets/services/`. You do not need this to run the site —
to change an image just replace the file in `assets/services/` (keep the file name).
