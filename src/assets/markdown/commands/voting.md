The voting command allows to create a new voting in a channel. It makes extensive use of message components for both voting and management of the poll itself.

- `/voting create [question] [option_1] [option_2] [option_3?] [option_4?] [multiple_choices?] [days?] [free_answer?]`
  - Command to create a new poll in the channel. It requires at least 2 options, and allows to add 2 more to the total of 4 options when creating. After creation it's possible to add additional options up to a maximum of 25.
  - `multiple_choices` - defaulted to `false` is flag to allow the users to select more than one choice;
  - `days` - defaults to `1` is the number of days the poll should run for;
  - `free_answer` - defaults to `false` is the flag to allow users to add more options than the ones available;