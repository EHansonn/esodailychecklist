# ESO Daily Tracker

A simple and easy way for you to manage and keep track of the 100+ repeatable quests in the game. Simply login to with your google account, and navigate to the /yourdailies directory. Here you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on today's tasks!

[Try it yourself](https://www.ehansonn.com/)

## Made using

NextJS, Tailwind CSS, Supabase and Prisma, Vercel and Github Actions.

All possible dailies
![All dailies](https://cdn.discordapp.com/attachments/1054239396024549486/1083239740536524900/image.png)

Create a custom list to see which ones you want
![My custom list](https://cdn.discordapp.com/attachments/1054239396024549486/1083239911827718194/image.png)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Prisma Stuff

```
yarn prisma db push

yarn prisma studio

prisma migrate dev

prisma migrate deploy

prisma db seed

prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
