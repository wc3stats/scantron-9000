import moment from 'moment';

export function lcfirst (s) {
  s += '';
  let f = s.charAt (0)
    .toLowerCase ();
  return f + s.substr (1);
}

export function isset (o, k) {
  return k in o;
}

export function inArray (needle, haystack) {
    return haystack.indexOf (needle) !== -1;
}

export function getVar (player, key) {
  return player.variables [key] || player [key];
}

export function indexBy (arr, key) {
  let map;

  map = {};

  for (let item of arr) {
    if (! (key in item)) {
      continue;
    }

    map [item [key]] = item;
  }

  return map;
}

export function timeago (seconds) {
  return moment (seconds * 1000).fromNow ();
}

export function detag (battleTag) {
  let idx;

  if ((idx = battleTag.indexOf ('#')) === -1) {
    return battleTag;
  }

  return battleTag.substring (0, idx);
}

export function datetime (seconds) {
  return moment (seconds * 1000).format ("Do MMM YYYY [at] hh:mm");
}