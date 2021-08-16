# Scantron 9000 - Official Warcraft III Stats Discord Bot!

## Table of Contents

- [Features](#features)
- [Discord Setup](#discord-setup)
- [Scantron Setup](#scantron-setup)
- [Running the Bot](#running-the-bot)
- [Notes](#notes)

## Features

* Automatically upload posted replay files to wc3stats.com.
* Automatically post games hosted on Warcraft III to a Discord channel.

## Discord Setup

* **Create a Discord Bot** -- Go to the [Discord Developer Console](https://discordapp.com/developers/applications/me) and create a Discord Bot Application.
* **Obtain Client ID** -- In the [Discord Developer Console](https://discordapp.com/developers/applications/me) obtain your bot's client ID, you will need this to invite the bot to your server.
* **Invite the Bot to Your Server** -- Go to the url below replacing {client-id} with your client ID. The recommended permissions mask is 519233 but you can tailor this to your needs:

      https://discordapp.com/api/oauth2/authorize?client_id=615784551184334859&permissions=519233&scope=bot

## Scantron Setup

* **Configure .env** -- Copy the `.env.example` file to `.env` and replace in your own credentials. To wire up the code to talk to your Discord bot, you will need to add your `DISCORD_TOKEN` which can be found on the [same page](https://discordapp.com/developers/applications/me) as your client ID.

You will also need to edit `config/config.js` as appropriate.

## Running the Bot

* **Dependencies** -- `npm install`
* **Running** -- `npm run start`

If you are on linux, `screen` is fantastic to persistently run programs.

     screen -L -dmS scantron npm run start

Alternatively you can use `forever`:

     npm install -g forever
     forever start dist/index.js

## Notes

For more information or troubleshooting feel free to join [our discord](https://discord.gg/N3VGkUM).
