This command is used to manage the birthdays of users.

- `/birthday channel [channel?]`
  - Command to set the channel that the bot will post notifications to. If no channel is specified, it will reply with the currently set channel.
- `/birthday add [day] [month] [year?]`
  - Command to set the birthday of the user. The `day` parameter is the day of the month, the `month` parameter is the month of the year, and the `year` parameter is the year, this is optional.
- `/birthday remove [user]`
  - Command to remove the birthday of a user.
- `/birthday get [user?] [month?]`
  - Command to get the birthday of a user. If a `user` is specified then the birthday of that user will be returned, if a `month` is specified then it will list all the birthdays in that month. If no `user` or `month` is specified then it will show the birthday of the user that sent the command.
- `/birthday server`
  - Command to get the birthday of the server.
- `/birthday role [role?]`
  - Command to set the role that the bot will give to users that have their birthday today. If no role is specified, it will reply with the currently set role.