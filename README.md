This project will help someone to verify their document based on hash that created by using Ethereum (Sepolia) network blockchain technology. This project still under development, feel free to leave a comment / review 🐳. 

## Getting Started
Before we started i'd like to inform you that i use Hardhat for deployment testing. You can learn more the docs from their official docs [Here](https://hardhat.org/hardhat-runner/docs/getting-started)

Install the depedencies:

```bash

npm install

```

## Local Environment Setup

## ⚠️ PLEASE BE IN MIND, DONT SHARE YOUR EVERY INFORMATION HERE IN PUBLIC BECAUSE IT CONTAINS A CRUCIAL INFORMATION ⚠️

➤➤➤ Fill the `.env.local` with your own secret code. This section is for local testing purpose.

**(Can be obtained from MongoDB Atlas)**

MONGODB_URI="INPUT YOUR MONGODB_URI HERE"

**Google Auth (Can be obtained from Google Cloud Console)**

GOOGLE_CLIENT_ID="INPUT YOUR GOOGLE_CLIENT_ID HERE"
GOOGLE_CLIENT_SECRET="INPUT YOUR GOOGLE_CLIENT_SECRET HERE"

**Generate the secret code by input this command in bash (not terminal):**

``` bash

openssl rand -base64 32

```

NextAuth.js
NEXTAUTH_SECRET="INPUT YOUR NEXTAUTH_SECRET HERE" 

**(Can be obtained from Alchemy/Infura)**

NEXT_PUBLIC_SEPOLIA_RPC_URL="INPUT YOUR RPC URL HERE"
PRIVATE_KEY="INPUT YOUR PRIVATE KEY HERE" # DONT USE YOUR MAIN PRIVATE KEY

## Start The Project
```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

That's all. Wish i can graduated sooner and get some jobs. Thanks 👨‍💼

<img src="https://tenor.com/view/hatsune-miku-miku-hatsune-miku-hatsune-washing-machine-gif-4863029126409914383" width="200">
