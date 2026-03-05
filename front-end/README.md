# RgLinkly Front-end

Next.js 16 app for shortening URLs, listing results, and managing a responsive dashboard UI.

## Tech Stack
- Next.js (App Router)
- React + TypeScript
- CSS Modules
- Vitest + Testing Library
- ESLint (Next.js core-web-vitals + TypeScript)

## Project Structure
- `app/layout.tsx` - root layout + SEO metadata
- `app/page.tsx` - home page entry
- `app/Homepage/` - feature UI, types, and helpers
  - `components/` - `Navbar`, `Hero`, `ShortenForm`, `LinksTable`
  - `types.ts` - domain models (`LinkItem`, API response shape)
  - `utils.ts` - shared validators/formatters/item factory
- `app/api/shorten/route.ts` - server API endpoint to shorten URLs

## Getting Started
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Scripts
- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run built app
- `npm run lint` - lint project
- `npm run lint:ci` - lint with `--max-warnings=0` (CI guardrail)
- `npm run test` - run tests once
- `npm run test:watch` - run tests in watch mode

## Environment Variables
This project currently works without custom environment variables.

Optional (recommended for branding/deploy consistency):
- `NEXT_PUBLIC_APP_URL` - canonical frontend URL (e.g. `https://rglinkly.com`)

## Testing
Current test coverage includes:
- URL/date helper behavior (`app/Homepage/utils.test.ts`)
- API route checks (`app/api/shorten/route.test.ts`)
- Component accessibility + submit behavior (`ShortenForm.test.tsx`)

Run:
```bash
npm run test
```

## Deployment Notes
1. Build and verify locally:
   ```bash
   npm run lint:ci
   npm run test
   npm run build
   ```
2. Deploy to Vercel (recommended) or any Node host that supports Next.js.
3. Ensure your production domain matches SEO metadata in `app/layout.tsx`.

## Production Readiness Checklist
- [x] Responsive layout for mobile/tablet/desktop
- [x] Accessibility labels, ARIA states, focus-visible styles
- [x] Dynamic link table + copy action
- [x] API validation + error handling
- [x] CI lint guard (`--max-warnings=0`)
- [x] Basic tests for UI/util/API
