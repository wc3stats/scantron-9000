import discord from 'discord.js';
import config from 'scantron/config';

export function getGuild (guild) {
  return client.guilds.find (g => guildEq (g, guild));
}

export function getChannels (guild, channels) {
  guild = getGuild (guild);

  if (!Array.isArray (channels)) {
    channels = [ channels ];
  }

  return channels.map (c => getChannel (guild, c));
}

export function getChannel (guild, channel) {
  return guild.channels.find (c => channelEq (c, channel));
}

export function getEmoji (emoji) {
  emoji = emoji.replace (/[^a-z]/gi, '');

  return getGuild (config.discord.emojis)
    .emojis
    .find (e => emojiEq (e, emoji))
}

/** **/

export function guildEq (guild, identifier) {
  return guild.id === identifier || guild.name === identifier;
}

export function channelEq (channel, identifier) {
  return channel.id === identifier || channel.name === identifier;
}

export function emojiEq (emoji, identifier) {
  return emoji.id === identifier || emoji.name === identifier;
}


/** **/

export function matches (message, servers) {
  for (let server of servers) {
    let guild    = server.guild;
    let channels = server.channels;

    if (!guildEq (message.channel.guild, server.guild)) {
      continue;
    }

    if (!Array.isArray (channels)) {
      channels = [ channels ];
    }

    for (let channel of channels) {
      if (channelEq (message.channel, channel)) {
        return true;
      }
    }

    return false;
  }

  // If no configured guilds match we match all messages in all channels.
  return true;
}