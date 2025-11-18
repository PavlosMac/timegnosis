This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Features
- each energy should have a pulsing planet on the payload pay



## Plan 

1. Add text for all planets
2. decide whether to add the planets on render next to the numbers that are rendererd
3. add icon to the top
4. fix navigation
5. add section text for seo optimizatiton

https://cloud.mongodb.com/v2/67d704e2df34917462c982b4#/security/network/accessList


## Add domain to robot.txt and sitemap.txt

[ User's Browser ]
            |
            | 1. Request for "gnosisesoterica.com"
            v
+---------------------------+
|                           |
|  CLOUDFLARE'S NETWORK     |  <-- Your domain's nameservers point here.
| (The Internet)            |
|                           |
+-----------+---------------+
            |
            | 2. Cloudflare finds your tunnel ("pav-apps-tunnel")
            |    and sends the request DOWN the secure connection
            |    that your Pi already established.
            |
(This connection bypasses your router's firewall)
            |
            v
+-------------------------------------------------------------------+
| YOUR RASPBERRY PI (At Home)                                       |
|                                                                   |
|   +---------------------------------------------------------+     |
|   | ROUTER (Firewall)                                       |     |
|   |                                                         |     |
|   |   [ ALL INCOMING PORTS ARE CLOSED AND SECURE 🔒 ]       |     |
|   |                                                         |     |
|   +---------------------------------------------------------+     |
|                                                                   |
|   +---------------------------------------------------------+     |
|   | DOCKER ENVIRONMENT (on the Pi)                          |     |
|   |                                                         |     |
|   |   --- Private 'app-network' -------------------------   |     |
|   |  |                                                   |  |     |
|   |  |  +-----------------------+                        |  |     |
|   |  |  | [cloudflared]         |  <--- 3. Request arrives  |  |     |
|   |  |  | (Tunnel Container)    |      via the tunnel     |  |     |
|   |  |  |                       |                         |  |     |
|   |  |  | 4. Checks config.yml: |                         |  |     |
|   |  |  | "gnosisesoterica.com" |                         |  |     |
|   |  |  |  -> "http://nextjs-app:3000" |                    |  |     |
|   |  |  +----------+------------+                        |  |     |
|   |  |             |                                     |  |     |
|   |  |             | 5. Forwards request internally        |  |     |
|   |  |             v                                     |  |     |
|   |  |  +----------+------------+                        |  |     |
|   |  |  | [nextjs-app]          |                        |  |     |
|   |  |  | (Your App Container)  |  <--- 6. App receives   |  |     |
|   |  |  | (Listening on 3000)   |      request & replies|  |     |
|   |  |  +-----------------------+                        |  |     |
|   |  |                                                   |  |     |
|   |   -----------------------------------------------------   |     |
|   |                                                         |     |
|   +---------------------------------------------------------+     |
|                                                                   |
+-------------------------------------------------------------------+