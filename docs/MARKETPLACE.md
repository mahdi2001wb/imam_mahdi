# Services marketplace – maintenance guide

## Where things live
| What | File |
|---|---|
| Contact details, WhatsApp number, social links, homepage statistics | `config/site.ts` |
| **All prices (EUR + USD), draft flag, add-on prices** | `lib/services/prices.ts` |
| Services (title, description, features, delivery, revisions) | `lib/services/catalog/*.ts` |
| Categories | `lib/services/categories.ts` (+ names in `messages/*.json` → `services.categories`) |
| Languages | `i18n/locales.ts` + `messages/<code>.json` |
| UI text | `messages/*.json` |

## Change prices
Edit `lib/services/prices.ts`. EUR and USD are independent numbers. `null` = “Price on request”.
When prices are final set `PRICING_STATUS = "final"` — only then are prices added to JSON-LD structured data.

## Add a service
1. Add a `defineService({...})` entry to a file in `lib/services/catalog/` (copy an existing one).
   Titles/descriptions use `L(en, it, bn, es, fr, de, ar)`; any missing language falls back to English.
2. Add its prices to `PRICES` in `lib/services/prices.ts` (same `id`).
3. Set `published: false` to hide it, `featured: true` to show it in “Featured”.
New features/add-ons: add the key to `FeatureKey`/`AddonKey` (`lib/services/types.ts`) and its text to `pricing.features` / `pricing.addons` in every `messages/*.json`.

## Edit translations
Edit `messages/<code>.json`. Run `npm run check:messages` to verify all languages have the same keys and placeholders.

## Add a language
1. Copy `messages/en.json` → `messages/xx.json` and translate (missing keys fall back to English).
2. Add one entry in `i18n/locales.ts` (name, `dir`, `ogLocale`, flag id).
3. If the flag is new, add it to `components/layout/Flags.tsx`. Add the service texts to the `L(...)` calls (optional – falls back to English).

## Environment variables
See `.env.example`. `NEXT_PUBLIC_SITE_URL` is required in production; `RESEND_API_KEY` enables inquiry emails.

## Commands
`npm run check` (messages + typecheck + lint) · `npm run build`
