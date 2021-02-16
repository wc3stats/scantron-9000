let { Client, MessageEmbed } = require ('discord.js');
let config = require ('@/config');
let discord = new Client ();

function embed ()
{
  return new MessageEmbed ()
    .setAuthor ('Warcraft III Stats', 'https://wc3stats.com/assets/favicon.png', 'https://discord.gg/N3VGkUM')
    .setTimestamp ()
    .setFooter ('Powered by wc3stats.com', 'https://wc3stats.com/assets/favicon.png');
}

async function emoji (id) {
  id = id.replace (/[^a-z]/gi, '');

  let guild = await discord.guilds.fetch (config.discord.emojis);
  let emoji = guild.emojis.cache.find (e => e.id == id || e.name == id);

  return (emoji);
}

module.exports = {
  discord,
  embed,
  emoji };


// import discord from 'discord.js';
// import config from 'scantron/config';

// export function getGuild (guild) {
//   return client.guilds.find (g => guildEq (g, guild));
// }

// export function getChannels (guild, channels) {
//   guild = getGuild (guild);

//   if (!Array.isArray (channels)) {
//     channels = [ channels ];
//   }

//   return channels.map (c => getChannel (guild, c));
// }

// export function getChannel (guild, channel) {
//   if (typeof guild === 'string') {
//     guild = getGuild (guild);
//   }

//   return guild.channels.find (c => channelEq (c, channel));
// }

// export function getEmoji (emoji) {
//   emoji = emoji.replace (/[^a-z]/gi, '');

//   return getGuild (config.discord.emojis)
//     .emojis
//     .find (e => emojiEq (e, emoji))
// }

// /** **/

// export function guildEq (guild, identifier) {
//   return guild.id === identifier || guild.name === identifier;
// }

// export function channelEq (channel, identifier) {
//   return channel.id === identifier || channel.name === identifier;
// }

// export function emojiEq (emoji, identifier) {
//   return emoji.id === identifier || emoji.name === identifier;
// }


// /** **/

// export function matches (message, servers) {
//   for (let server of servers) {
//     let guild    = server.guild;
//     let channels = server.channels;

//     if (!guildEq (message.channel.guild, server.guild)) {
//       continue;
//     }

//     if (!Array.isArray (channels)) {
//       channels = [ channels ];
//     }

//     for (let channel of channels) {
//       if (channelEq (message.channel, channel)) {
//         return true;
//       }
//     }

//     return false;
//   }

//   // If no configured guilds match we match all messages in all channels.
//   return true;
// }