# ESO Daily Checklist

A simple and easy way for you to manage and keep track of the 100+ repeatable quests in the game. Simply login with your google account, create one or more characters, and navigate to the /yourdailies directory. Here you can see every single possible repeatable task and quest in the game. You can check off the ones you've done. Come back tomorrow and you'll find that all your dailies have been reset, so you can get started right away on your tasks!

[Try it yourself](https://www.esodailychecklist.com/)

## Made using

NextJS, Tailwind CSS, Supabase, Prisma, Vercel and Github Actions.

## What you can do with it
- Keep track of numerous characters with their own individual todo lists.
- Create a custom list from the preset tasks to better focus on what you care about.
- Find information and links to the UESP for every single quest

## Screenshots

<img src="https://user-images.githubusercontent.com/107162117/224244887-f6e1f89b-4a47-42b2-aa64-f845c9f2cd56.png" width=400 /> <img src="https://user-images.githubusercontent.com/107162117/224244888-bccd76ab-ee71-4007-b9a5-0df64a7d28f3.png" width=400 /> <img src="https://user-images.githubusercontent.com/107162117/224244893-22db7dd7-b39e-4389-a86e-ab3209e7a631.png" width=400 /> <img src="https://user-images.githubusercontent.com/107162117/224244895-fd945931-21aa-4373-bdb7-19c34c78e498.png" width=400 />


### Inspired by
[FFXIV todo ](https://xivtodo.com/)

## Whats next
Your own custom quests, and even more detailed information about quests. Maybe icons for the different quest types.

## Getting Started

Make sure to set up your .env with links to your db.

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
prisma db push

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
