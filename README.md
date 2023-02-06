# GitHub Explorer

This is a simple app that allows you to search for GitHub repositories and bookmark them.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project was created as a code challenge for [Sword Health](https://swordhealth.com/).

Check it out live at [https://github-explorer-lake-two.vercel.app/](https://github-explorer-lake-two.vercel.app/)

## Getting Started

1. Install dependencies:

```bash
yarn
```

2. Rename `.env.local.example` to `.env.local` and add the required keys.

3. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Libraries & Tools

- Framework: [Next.js](https://nextjs.org/)
- Authentication & Database: [Supabase](https://supabase.io/)
- Form: [React Hook Form](https://react-hook-form.com/)
- Validation: [Zod](https://zod.dev/)
- Styling: [Styled Components](https://styled-components.com/)
- Headless UI Components: [Radix UI](https://www.radix-ui.com/)
- Headless UI Components: [Embla Carousel](https://davidcetinkaya.github.io/embla-carousel/)
- Async state management [TanStack Query](https://tanstack.com/query/latest)
- HTTP Client: [Ky](https://github.com/sindresorhus/ky)
- GitHub API Client: [Octokit](https://octokit.github.io/rest.js/v18)
- Testing: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## Supabase Setup

- Run **all** `.sql` files included in the `/db` folder, in the Supabase SQL Editor.
- Enable Insert & Delete replication for the `bookmarks` table (Database > Replication > supabase_realtime)
- Auto generate database types using the Supabase CLI

## Deployment

This project is deployed to Vercel via GitHub integration.
Make sure to add the required env keys to the Vercel environment variables.

## Notes

### My approach to code challenges

- I like to have a time limit for code challenges. I try to have a good balance between getting a good result and not spending too much time on it.
- I like to explore and learn new libraries and tools. I find that this is a good oportunity to learn and improve my skills, and always take something new with me regardless of the outcome. This may result in some code that is not production ready, or that I would not use in a real project, but I think it's worth it.

### Decisions, Improvements & Others

- The homepage is public, but the bookmarks feature is private.
- Tried out Supabase (a Firebase open-source alternative) for authentication and database (and some "exotic" features like realtime replication and row level security).
- The bookmarks are stored in the database.
- The bookmarks list "My Bookmarks", after the first load, is updated in realtime via Supabase's realtime replication. (for fun, this could just use local stage, but I wanted to try out the replication feature)
- The selected topics and the sorting of each topic are saved in local storage.
- The api that provides the OpenGraph images for the repositories has a low rate limit, so behare of that.
- Improve error handling and feedback to the user.
- Improve responsiveness. Its usable on mobile, but not great. The bookmark feature depends on hover which is not available on mobile, so I ended up showing the bookmark toggle by default on mobile.
- Make UI components more generic and reusable
- Deployed to Vercel via GitHub integration
- Change the GitHub API client to use GraphQL to reduce data usage and improve performance
- Improve UX on the image loading, add a blur up effect or a placeholder
- Add infinite loading to the carousel
- Improve tests (organize mocks, add more tests, add e2e, etc)

## License

MIT License
