This command is used to manage everything related to anilist, such as search for anime, get notifications of new episodes, etc.  

- **/anilist search [query] [type?]** - Search for an anime or manga. The type is an optional parameter that can be either `anime` or `manga`. If it's not specified, it will search for both.
- **/anilist sub add [anime]** - Command to set an anime that the user wants to be notified about. The `anime` parameter is the name of the anime. Partial names are allowed and it'll only search for anime that are currently on air or have not yet aired.
- **/anilist list** - Command to list all the anime that the user wants to be notified about.
- **/anilist schedule [query]** - Command to get the schedule of an anime. The `query` parameter is the name of the anime. Partial names are allowed and it'll only search for anime that are currently on air or have not yet aired.
- **/anilist channel [channel?]** - Command to set the channel that the bot will post notifications to. If no channel is specified, it will reply with the currently set channel.