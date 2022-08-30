This command is used to manage the achievements of users.

- **/achievements create [name] [description] [points] [image?]** - Command to create a new achievement. The `name` parameter is the name of the achievement, the `description` parameter is the description of the achievement, the `points` parameter is the amount of points that the achievement is worth, and the `image` parameter is the image of the achievement.
- **/achievements update [id] [name?] [description?] [points?] [image?]** - Command to update an achievement. It will only update the fields given.
- **/achievements delete [id]** - Command to delete an achievement.
- **/achievements rank list** - Command to list all the ranks.
- **/achievements rank [user?]** - Command to show the rank of a user. If no user is specified, it will show the rank of the user that sent the command.
- **/achievements rank leaderboard** - Command to show the leaderboard of the ranks.
- **/achievements rank create [name] [points]** - Command to create a new rank. The `name` parameter is the name of the rank, and the `points` parameter is the amount of points necessary to reach that rank.
- **/achievements rank delete [id]** - Command to delete a rank.
- **/achievements list server** - Command to list all the achievements of the server.
- **/achievements list user [user?]** - Command to list all the achievements of a user. If no user is specified, it will show the achievements of the user that sent the command.
- **/achievements give [user] [achievement]** - Command to give an achievement to a user.