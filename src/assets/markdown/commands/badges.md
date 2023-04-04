Commands to manage the badges of the server and the badges of the users.

- `/badges create [name] [image?]`
  - Command to create a new badge. The `name` parameter is the name of the badge, and the `image` parameter is the image of the badge, which is optional, by default it'll use the last image sent on the channel.
- `/badges list`
  - Command to list all the badges of the server.
- `/badges give [name] [user]`
  - Command to give a badge to a user.
- `/badges delete [name]`
  - Command to delete a badge by name.
- `/badges user [user?]`
  - Command to show the badges of a user. If no user is specified, it will show the badges of the user that sent the command.