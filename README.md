# Vid Paradiž — Sports Performance

Single-page marketing site. Vite + React + TypeScript + Framer Motion. Static output, no backend.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ — deploy to any static host
```

## Where things live

| What | File |
| --- | --- |
| All visible copy (English) | `src/content/en.ts` |
| Photos and videos (every slot) | `src/content/media.ts` |
| Contact details, legal details, verification flags | `src/config/site.ts` |
| Form endpoint, draft mode | `.env` (see `.env.example`) |
| SEO / Open Graph / structured data | `index.html`, `public/og.png` |

## Adding client media

Put optimised files in `public/media/` and set `src` (or `video` + `poster`) on the matching slot in
`src/content/media.ts`. Slots without a file render a labelled placeholder showing the shot brief.
No stock or generated photography stands in for Vid.

## Contact form

With `VITE_FORM_ENDPOINT` empty, submitting opens the visitor's email app with the enquiry pre-filled
(nothing is stored). Set the endpoint to a JSON form service (Formspree, Web3Forms, own API) to send
directly; `VITE_FORM_ACCESS_KEY` is added as `access_key` when present.

## Draft mode

`VITE_DRAFT=true` (default) shows media-slot labels, "pending verification" tags and placeholder
result cards. With `VITE_DRAFT=false` those disappear, and the Results section is hidden until verified
testimonials are added to `results.testimonials` in `src/content/en.ts`.

## Before launch

- Verify email, phone, business name, address and registration number, then set the `verified` flags in `src/config/site.ts`.
- Confirm the recovery services (availability, qualifications, scope) and set `recoveryConfirmed`.
- Replace the draft Privacy Policy and Terms text (`legal` in `src/content/en.ts`).
- Add the production domain: canonical link and `og:url` in `index.html`, absolute `og:image` URL.
- Supply photos/video and verified testimonials with client permission.

## Slovenian version

Create `src/content/sl.ts` exporting the same shape as `en.ts` (`const sl: Content`), register it in
`src/content/index.tsx`, and add a language switch that calls `setLocale('sl')`.
