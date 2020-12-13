let printf = require ('printf');
let fetch = require ('node-fetch');
let config = require ('@/config');
let { discord } = require ('@/lib/discord');

function main ()
{
  setInterval (update, config.clans.rate);
}

async function update ()
{
  for (let i = 0; i < config.clans.guilds.length; i++) {
    let g;
    let m;
    let guild;
    let members;
    let clan;
    let res;

    g = config.clans.guilds [i];
    m = [];

    guild = await discord.guilds.fetch (g.id);
    members = await guild.members.fetch ();

    members.forEach ((v, k) => {
      if (clan = getClan (g, v)) {
        m.push ({
          community: guild.name,
          tag: clan,
          name: v.nickname || v.user.username,
          rank: getRank (g, v)
        });
      }
    });

    res = await fetch ('https://api.wc3stats.com/v2/client/clans', {
      method: 'POST',
      body: JSON.stringify (m)
    });

    res = await res.json ();

    printf (process.stdout, "CLANS :: Members=[%d] ::\n", m.length);
    printf (process.stdout, "%s\n", JSON.stringify (res, null, 4));
  }
}

function getClan (g, m)
{
  let c;
  let r;

  if (r = m.roles.cache.find (r => g.lang.clan.test (r.name))) {
    c = r.name.match (g.lang.clan) [1];
  }

  return (c);
}

function getRank (g, m)
{
  let l;
  let r;

  for (let i = 0; i < g.lang.ranks.length; i++) {
    if (r = m.roles.cache.find (r => g.lang.ranks [i].rank == r.name)) {
      l = g.lang.ranks [i].level;
      break;
    }
  }

  if (!l) l = g.lang.ranks [g.lang.ranks.length - 1].level;
  return (l);
}

module.exports = { main };