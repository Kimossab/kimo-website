<template>
  <div class="content bot">
    <h1>My Discord Bot</h1>
    <p>
      I made a Discord bot. You can find the source code in
      <a href="https://github.com/Kimossab/kimoo-disc-bot" target="_blank"
        >github repository</a
      >
    </p>
    <p>
      The features of the bot are mainly requests and ideas from friends that
      can be useful for them to use.<br />
      You can learn more about each future here:
    </p>

    <details class="technology">
      <summary>Technology and APIs</summary>
      <div class="details-content">
        <p>
          This bot was created in TypeScript from scratch. For the database it
          uses MongoDB.<br />
          The reason for this is that I wanted to improve my skills with
          TypeScript and learn how to work in MongoDB. And since MongoDB works
          with JSON objects out of the box, and the objects can easily update
          over time as new features are added, just makes it the perfect combo
          for this.<br />
          The packages that are used ar the following:
        </p>
        <ul>
          <li>
            <a href="https://www.npmjs.com/package/axios" target="_blank"
              >axios</a
            >
          </li>
          <li>
            <a href="https://www.npmjs.com/package/dotenv" target="_blank"
              >dotenv</a
            >
          </li>
          <li>
            <a href="https://www.npmjs.com/package/form-data" target="_blank"
              >form-data</a
            >
          </li>
          <li>
            <a href="https://www.npmjs.com/package/mongoose" target="_blank"
              >mongoose</a
            >
          </li>
          <li>
            <a href="https://www.npmjs.com/package/rss-parser" target="_blank"
              >rss-parser</a
            >
          </li>
          <li>
            <a href="https://www.npmjs.com/package/ws" target="_blank">ws</a>
          </li>
        </ul>

        <p>
          The .env file is used to keep the secret keys and global variables for
          the bot to run. Here's what variables are set and what they're for:
        </p>
        <ul>
          <li>
            DISCORD_DOMAIN - This is the domain for discord requests. They
            recentely changed the domain for the API, it shouldn't change
            anytime soon, but we never know. Right now the value should be
            <code>discord.com</code>.
          </li>
          <li>
            API_V - This is the version of the Discord API the bot is using,
            right now the bot is using version <code>8</code>, so if you change
            that value without knowing what you're doing the bot will stop
            working.
          </li>
          <li>
            TOKEN - This is the Bot Application token for Discord. You'll need
            to create an application in
            <a
              href="https://discord.com/developers/applications"
              traget="_blank"
              >Discord Developer Portal</a
            >
            and use the token you can find in the <code>Bot</code> section.
          </li>
          <li>
            DATABASE_URL - This is the URL for the database. You should know how
            MongoDB works before you change this. The default value is localhost
            and uses the collection <code>disc-bot</code>
          </li>
          <li>
            SAUCENAO_API_KEY - This is optional. It's the key to use SauceNAO
            API, which allows to search for the source of images on the web.
            You'll need to create an account to receive a key.
          </li>
        </ul>

        <p>
          This bot makes use of some third party APIs for the features it
          gives:.
        </p>
        <ul>
          <li>
            Discord Gateway and Rest API.
            <a href="https://discord.com/developers/docs/intro" target="_blank"
              >Documentation</a
            >
          </li>
          <li>
            SauceNAO. Website to search for the source of images in popular
            image sharing websites
            <a
              href="https://saucenao.com/user.php?page=search-api"
              target="_blank"
              >Documentation</a
            >
          </li>
          <li>
            trace.moe. Website to search for the anime where a frame belongs
            <a href="https://trace.moe/" target="_blank">Website</a>
          </li>
          <li>
            LiveChart.me. Website that contains list of anime and when they'll
            air. The bots uses its RSS feed to known when an episode aired and
            notify the users
            <a href="https://www.livechart.me/pages/rss" target="_blank"
              >RSS Info</a
            >
          </li>
          <li>
            Fandom. This is a website with wikis about pretty much everything.
            The bot uses its API to allow users to quickly search for something
            in any wiki.
            <a href="https://www.fandom.com/" target="_blank">Fandom</a>.
          </li>
          <li>
            MyAnimeList. The bot uses the MAL search url to quickly get a link
            to the article's page.
            <a href="https://myanimelist.net/" target="_blank">MAL page</a>
          </li>
        </ul>
      </div>
    </details>

    <details class="commands">
      <summary>Discord Commands</summary>
      <div class="details-content">
        <p>All commands make use of the Discord feature of Slash Commands.</p>

        <details class="commands-anime">
          <summary>Anime</summary>
          <div class="details-content">
            <p>
              This command is used to manage everything related to the anime
              airing episodes notifications.
            </p>
            <ul>
              <li>
                /anime set [channel] - Admin only command that sets the channel
                that will be used for the notifications.
              </li>
              <li>
                /anime sub add [livechart_id] - Command to set an anime that the
                user wants to be notified about. The livechart_id is the the ID
                that can be found in the URL (last number in the URL) of the
                anime in the
                <a href="https://www.livechart.me/" target="_blank"
                  >livechart website</a
                >. Example for
                <a href="https://www.livechart.me/anime/9680" target="_blank"
                  >Jujutsu Kaisen</a
                >
                the ID is 9680.
              </li>
              <li>
                /anime sub remove [livechart_id] - Command to remove the
                subscription to an anime. The livechart_id uses the same id as
                the command above.
              </li>
              <li>/anime sub list - Command to list all IDS subscribed to.</li>
            </ul>
          </div>
        </details>

        <details class="commands-birthday">
          <summary>Birthday</summary>
          <div class="details-content">
            <p>
              This command is used to manage the birthdays of users.
            </p>
            <ul>
              <li>
                /birthday channel [channel] - If the channel value is given
                it'll set that channel as the channel to send the birthday
                messages, otherwise will show which channel is currently set.
              </li>
              <li>
                /birthday add [user] [day] [month] [year] - This adds a new
                birthday to the database. Only year is optional.
              </li>
              <li>
                /birthday remove [user] - Removes the birthday for a user.
              </li>
              <li>
                /birthday get [user] [month] - Shows the birthday of a user, or
                lists the users that have a birthday in a certain month.
              </li>
              <li>
                /birthday server - Shows the birthday of the server.
              </li>
            </ul>
          </div>
        </details>

        <details class="commands-wiki">
          <summary>Wiki</summary>
          <div class="details-content">
            <p>
              Through this command users can quickly search any wiki for some
              term and get a link to it.
            </p>
            <ul>
              <li>
                /birthday [wiki] [query] - Shows the results of the search for
                the query given in the wiki given. The wiki value is the slug
                found in the url of the wiki page.
              </li>
            </ul>
          </div>
        </details>

        <details class="commands-mal">
          <summary>MAL</summary>
          <div class="details-content">
            <p>
              This command makes use of the MAL search bar to search for anime,
              manga, people or characters in their database and quickly get a
              link to that page.
            </p>
            <ul>
              <li>
                /mal [query] [type - all/manga/anime/person/character] -
                Searches mal for the query given in the type given. By default
                it uses the "all" type.
              </li>
            </ul>
          </div>
        </details>

        <details class="commands-sauce">
          <summary>Sauce</summary>
          <div class="details-content">
            <p>
              We can search for the source of images, both artwork or anime
              screenshots through this command.
            </p>
            <ul>
              <li>
                /sauce [image] [type - art/anime] - No option is mandatory. If
                no image is given then the bot will try to use the last image
                uploaded to the channel the command is being used. By default
                the type it searches for is art.
              </li>
            </ul>
          </div>
        </details>

        <details class="commands-settings">
          <summary>Settings</summary>
          <div class="details-content">
            <p>
              Command meant for the server owners for finer control of settings.
              Currently only the admin role can be changed.
            </p>
            <ul>
              <li>
                /settings [admin_role] [role] - Gets or sets the admin role that
                the bot will use to check for permissions to use some commands.
              </li>
            </ul>
          </div>
        </details>

        <details class="commands-misc">
          <summary>Misc</summary>
          <div class="details-content">
            <p>
              Miscellaneous commands without a specific category.
            </p>
            <ul>
              <li>
                /misc group [groups] [values] - Creates groups based on the
                values given and the number of groups to create. The values must
                be separated by <code>&nbsp;|&nbsp;</code>.
              </li>
            </ul>
          </div>
        </details>
      </div>
    </details>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import DetailsAnimation from "@/helpers/DetailsAnimation";

export default class About extends Vue {
  mounted() {
    const details = document.querySelectorAll("details");
    for (const el of details) {
      new DetailsAnimation(el);
    }
  }
}
</script>

<style lang="scss" scoped>
.details-content {
  details {
    margin-left: 1rem;
  }
}
</style>
