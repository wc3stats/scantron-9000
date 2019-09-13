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