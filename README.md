# O'Hara & Gercke — Website & Studio Admin

A full rebuild of [oharagercke.com](https://oharagercke.com) for **O'Hara & Gercke, Inc.**, a
custom homebuilder in the Upper Valley of Vermont & New Hampshire — an immersive public site
plus a brand-matched, login-protected admin backend the firm can run itself.

- **Public site** — video-hero home, bento portfolio with filtering, per-project galleries with
  a lightbox, about, testimonials, and a contact form that saves enquiries.
- **Studio Admin** (`/admin`) — manage projects (drag-to-reorder, image uploads, gallery,
  credits, featured/published), testimonials, team, site settings, and the contact inbox.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Prisma · Postgres
(Supabase) · Vercel-ready**.

---

## 1. Run it locally (no database needed)

The public site and the admin UI both run from bundled seed data with **zero setup** — great for
previewing. Editing/saving in admin requires a database (see step 2).

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The admin lives at <http://localhost:3000/admin>.

**Dev admin login** (used only when no database is connected): set `ADMIN_EMAIL`
and `ADMIN_PASSWORD_HASH` in `.env.local`, then sign in with that email and the
password you hashed.

> `ADMIN_PASSWORD_HASH` is a bcrypt hash; generate it with
> `node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD',10))"` and remember to
> escape each `$` as `\$` inside the `.env` file.

---

## 2. Connect Supabase (enables saving + uploads)

1. Create a free project at [supabase.com](https://supabase.com).
2. **Database** → *Project Settings → Database → Connection string*:
   - `DATABASE_URL` — the **pooled** connection (Transaction, port `6543`), append
     `?pgbouncer=true&connection_limit=1`.
   - `DIRECT_URL` — the **direct** connection (Session, port `5432`).
3. **Storage** → create a **public** bucket named `media` (for admin image uploads).
4. **API** → *Project Settings → API*: copy the Project URL and the `service_role` key.
5. Copy `.env.example` to `.env` and fill in:

   ```bash
   JWT_SECRET=            # openssl rand -hex 32
   ADMIN_EMAIL=you@oharagercke.com
   ADMIN_PASSWORD=        # used once to seed your admin user
   DATABASE_URL=          # pooled 6543
   DIRECT_URL=            # direct 5432
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   SUPABASE_STORAGE_BUCKET=media
   ```

6. Create the tables and load all the real content (13 projects with photos, 10 testimonials,
   the 3 principals, site settings) plus your admin user:

   ```bash
   pnpm prisma migrate dev --name init
   pnpm db:seed
   ```

Now `pnpm dev` reads and writes to Postgres, admin edits persist, and uploads go to Supabase
Storage. The "Preview mode" banner in admin disappears once `DATABASE_URL` is set.

---

## 3. Deploy to Vercel

1. Push this repo to GitHub and **Import** it at [vercel.com](https://vercel.com).
2. Add the same environment variables from step 2 in **Project Settings → Environment Variables**.
3. Deploy. The build runs `prisma generate && next build`.
4. If you haven't already run migrations against Supabase (step 2), do it once from your machine
   (it uses `DIRECT_URL`): `pnpm prisma migrate deploy && pnpm db:seed`.

That's it — the tables live in Supabase, so every deploy and preview share the same content.

---

## Project structure

```
app/(site)/            Public pages (home, portfolio, portfolio/[slug], about, testimonials, contact)
app/admin/             Login + (panel) dashboard, projects, testimonials, team, settings, submissions
app/api/               contact form + admin image upload
components/site/        VideoHero, ProjectCard, Gallery, TestimonialMarquee, Nav, Footer …
components/admin/       AdminShell, ProjectEditor, managers, ImageInput, GalleryEditor …
components/ui/          Button, Container, Reveal, Marquee, Counter, SectionHeading …
lib/seed-data.ts        Single source of truth for all content (also the no-DB read fallback)
lib/content.ts          Public data getters (Prisma → seed fallback)
lib/admin-data.ts       Admin data getters (includes drafts)
lib/actions/            Server actions: auth + CRUD
lib/{db,auth,session,storage}.ts
prisma/schema.prisma, prisma/seed.ts
proxy.ts                Guards /admin (Next 16 middleware/proxy convention)
public/hero.mp4, public/projects/*, public/brand/*
```

## How content flows

`lib/seed-data.ts` is the single source of truth. It seeds Postgres **and** serves as a read-time
fallback when no `DATABASE_URL` is set — so the site always renders, with or without a database.
When a database is connected, public pages read from it and the admin writes to it; every mutation
calls `revalidatePath` so the site refreshes.

## Notes

- **Hero video** (`public/hero.mp4`) is ~22 MB / 2560×1440. Fine for now; before going live,
  compress it (e.g. a ~1080p H.264 + WebM under ~4 MB) and keep the poster in
  `heroPoster` (Site Settings) for fast first paint.
- Project photography and architect/photographer credits are the firm's own, recreated from the
  existing site (e.g. *Rob Karosis Photography*, *Smith & Vansant Architects*).
- Secrets (`.env`, `.env.local`) are git-ignored; `.env.example` documents every variable.
```
