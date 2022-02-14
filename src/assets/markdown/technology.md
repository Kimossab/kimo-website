This bot was created in TypeScript from scratch. For the database it uses MongoDB.  
The reason for this is that I wanted to improve my skills with TypeScript and learn how to work in MongoDB. And since MongoDB works with JSON objects out of the box, and the objects can easily update over time as new features are added, just makes it the perfect combo for this.  
The packages that are used are the following:  

- [axios](https://www.npmjs.com/package/axios)
- [canvas](https://www.npmjs.com/package/canvas)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [fast-average-color-node](https://www.npmjs.com/package/fast-average-color-node)
- [form-data](https://www.npmjs.com/package/form-data)
- [redux](https://www.npmjs.com/package/redux)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [ws](https://www.npmjs.com/package/ws)
  
The .env file is used to keep the secret keys and global variables for the bot to run. Here's what variables are set and what they're for:

- **DISCORD_DOMAIN** - This is the domain for discord requests. They recently changed the domain for the API, it shouldn't change anytime soon, but we never know. Right now the value should be `discord.com`.
- **API_V** - This is the version of the Discord API the bot is using, right now the bot is using version `9`, so if you change that value without knowing what you're doing the bot might stop working.
- **TOKEN** - This is the Bot Application token for Discord. You'll need to create an application in [Discord Developer Portal](https://discord.com/developers/applications) and use the token you can find in the `Bot` section.
- **DATABASE_URL** - This is the URL for the database. You should know how MongoDB works before you change this. The default value is localhost and uses the collection `disc-bot`.
- **SAUCENAO_API_KEY** - This is optional. It's the key to use SauceNAO API, which allows to search for the source of images on the web. You'll need to create an account to receive a key.

This bot makes use of some third party APIs for the features it gives:

- Discord Gateway and Rest API. [Documentation](https://discord.com/developers/docs/intro)
- SauceNAO. Website to search for the source of images in popular image sharing websites. [Documentation](https://saucenao.com/user.php?page=search-api)
- trace.moe. Website to search for the anime where a frame belongs [Website](https://trace.moe/)
- AniList. Website with a huge database of anime. It's used to get notifications of new episodes, search for anime/manga and more. [Documentation](https://anilist.gitbook.io/anilist-apiv2-docs/)
- Fandom. This is a website with wikis about pretty much everything. The bot uses its API to allow users to quickly search for something in any wiki. [Fandom](https://www.fandom.com/).
- VNDB. Similar to AniList but for Visual Novels. Used strictly to search for VNs. [Documentation](https://vndb.org/d11)