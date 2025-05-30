# hi there

[full demo](https://slvr.mn).
[minimal demo]().

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). There are individual feature branches and then a staging and deployment branch that combines the features.

# file structure

```
src
|__ cypress
|__ __ ...files
|__ db
|__ __ ...files
|__ drizzle
|__ __ ...files
|__ public
|__ __ ...files
|__ app
|__ __ layout.tsx
|__ __ page.tsx
|__ components
|__ __ ...files
|__ features
|__ __ ...folders
|__ __ actions
|__ __ __ ...files
|__ __ components
|__ __ __ ...files
|__ __ queries
|__ __ __ ...files
|__ types
|__ __ __ ...files
```

# feature branches

## drizzle (with neondb & postgres)

![Alt](https://github.com/jacob30/gh-assets/blob/main/next-app-drizzle-01.png)
_List of `<Player url={...}/>` Components_

My hosted database provider is NeonDB. My app is deployed to Vercel. I implemented [Drizzle with Local and Serverless Postgres](https://neon.com/guides/drizzle-local-vercel) for local development. The [environment variable load order for NextJS](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#environment-variable-load-order) is **`.env`** < **`.env.development`** < **`.env.test`**. See **`.env.*.example`** for suggested variable names.

The example provided replaces the component `<Player url="https://www.youtube.com/embed/X-Sb8sIi22g?clip=Ugkx2wj2Cun8N7m2GQ7IOabDUmCEG6O35_x5&amp;clipt=ENSd5wEY2OzoAQ" />` with multiple `<Player url={urlFromDb}>` with urls from the database.

## player

![Alt](https://github.com/jacob30/gh-assets/blob/main/next-app-player-02.png)
_Screenshot of the feature_

I wanted to use the Youtube [Clips](https://riverside.fm/blog/youtube-clips) playlist from my Youtube channel to demonstrate that I can build a web application that consumes an external API, in this case Youtube API V3, and I wanted to provide some videos to give context on things I'm interested in.

I reviewed the most popular React Youtube player packages on npm by searching with the keywords `youtube video player next`:

| npm package           | weekly downloads | unpacked size |
| --------------------- | ---------------- | ------------- |
| react-player          | 1.1m             | 1.5 MB        |
| youtube-player        | 3.2k             | 66.9 kB       |
| @u-wave/react-youtube | 12.3k            |               |
| react-youtube         | 496,183          | 74kB          |
| yt-player             | 23k              |               |
| plyr                  | 560k             |               |

YouTube Clips are 5-60 second clips that viewers or content creators can clip from any YouTube video. They are differentiated from Youtube Videos by their `clipId` and `clipt` (clip time). For example: `https://www.youtube.com/embed/X-Sb8sIi22g?clip=Ugkx2wj2Cun8N7m2GQ7IOabDUmCEG6O35_x5&amp;clipt=ENSd5wEY2OzoAQ`.

![Alt](https://github.com/jacob30/gh-assets/blob/main/next-app-player-01.png)
_A Youtube Clip URL_

Features of the various npm packages included convenience functions such as url playback, playback event bindings and customisable player options but none of them included the clip and clipt params. It also seemed unnecessary to add another package dependency. My `player` component uses the [Youtube iFrame Player](https://developers.google.com/youtube/iframe_api_reference).

# local development

I use all the defaults of [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) except I do not use Turbopack due to [this issue](https://github.com/vercel/next.js/issues/53175#issuecomment-2888751579). For some features I use forks of npm packages that require symlinks. Turbopack does not support symlinks (yet).

```bash
git clone ...
bun install
# see local development below for
# postgres local db setup
# .env files
NODE_ENV=development bun dev
```

## local npm packages

Use a local folder name that matches the one in npm_modules.. otherwise you'll get "Module not found: Can't resolve 'npmpackagepath'"

```
npm install --save npmpackagepath
```

## .env.development

If you have access to the vercel project you can `vercel link` and `vercel pull env` to get the .env file for production.

```
# .env
NEXTAUTH_URL=http://localhost:3000
LOCAL_URL=http://localhost:3000
AUTH_TRUST_HOST=http://localhost:3000
WS_PROXY_PORT=4444
HELIUS_API_KEY=YOUR_KEY_TO_ACCESS_HELIUS
API_KEY=YOUR_KEY_TO_ACCESS_YOUTUBE_API_V3
DATABASE_URL=postgresql://XXXX:XXXX@db.localtest.me:5432/main
AUTH_DRIZZLE_URL=postgresql://XXXX:XXXX@db.localtest.me:5432/main
```

## .env.production.local

Link with the vercel project and then `vercel env pull .env.production.local`.

## database

```bash
docker-compose down -v
docker-compose -f ./docker-compose.yml up -d --remove-orphans
NODE_ENV=development bun db:migrate
NODE_ENV=development bun db:seed
```

## git

Add your username to your git config. eg.

```
[user]
  name = yourusername
  email = youremail@gmail.com
```

# Production

You need access to the [repo](https://github.com/jacob30/). The site is deployed to Vercel directly from the github by actions. Just push a passing commit.

```bash
NODE_ENV=production bun db:reset
NODE_ENV=production bun db:migrate
NODE_ENV=production bun db:seed
NODE_ENV=production bun run build
NODE_ENV=production bun run start
# visit localhost:3000/api/youtube
# ...you will need to be authorized for the api route
git ...
```

## host

[Vercel console](https://vercel.com/).

## database

See [NeonDB console](https://console.neon.tech/app/).

# related content

- [How to migrate Pages to App Router](https://dev.to/jacob30/pages-to-app-router-2a81-temp-slug-181571).
- [How to alphabetize your import statements in React files and package.json](https://dev.to/jacob30/how-to-alphabetize-your-import-statements-in-react-files-and-packagejson-p5).
- [????]().
