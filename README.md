# Funmilayo & Babatunde — Order of the Day

A single-page wedding programme, built to match the invite's emerald / peach / gold palette.
Guests scan a QR code → land straight on this page → see the full running order.

## 1. Edit your details

Open `src/App.jsx`. Everything lives in a few arrays at the top of the file:

- `COUPLE` — names, families, date, venue, RSVP numbers, hashtag
- `CEREMONY` — the 11-step Order of Service (processional hymn → recessional hymn)
- `MINISTERS` — the officiating ministers list (currently just "Pastor" ×3 — add real names if you have them)
- `RECEPTION` — the 17-step reception programme
- `HYMNS` — full lyrics for "To God Be The Glory" and "Showers of Blessing", shown as a "Read lyrics" toggle under each hymn entry (both are public-domain 19th-century hymns, so no copyright concern reproducing them)

Add, remove, or reorder entries freely — numbering and layout update automatically.

## 2. Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Deploy (same as your invite site)

Push this folder to a GitHub repo, then import it on [vercel.com](https://vercel.com) — Vercel auto-detects Vite and deploys with zero config. You'll get a live URL like:

```
https://funmilayo-babatunde-program.vercel.app
```

## 4. Generate the QR code

Once you have the live URL, generate a QR code that points to it — for example at
[qr-code-generator.com](https://www.qr-code-generator.com) or via the `qrcode` npm package. Print that QR code on the physical/printed programme cards or table cards; scanning it opens this page directly.

No backend/database is needed — it's a static page, so hosting is free on Vercel's hobby tier.
# funmi-tunde-wed-program
