let moment = require ('moment');
let printf = require ('printf');

module.exports = {
  timeago (S)
  {
    return moment (S * 1000).fromNow ();
  },

  DOMMYYYY (S)
  {
    return moment (S * 1000).format ("Do MMM YYYY");
  },

  HMS (S)
  {
    let h = Math.floor (S / 3600);
    let m = Math.floor (S / 60) % 60;
    let s = S % 60;

    let r = '';

    if (h > 0) r += printf ("%d hour%s ", h, h != 1 ? 's' : '');
    if (m > 0) r += printf ("%d minute%s ", m, m != 1 ? 's' : '');

    r = r.trim ();

    if (!r.length) r += printf ("%d second%s ", s, s != 1 ? 's' : '');
    return (r.trim ());
  },

  detag (bt)
  {
    let idx;

    if ((idx = bt.indexOf ('#')) === -1) return (bt);
    return (bt.substring (0, idx));
  }
};

// import moment from 'moment';



// export function lcfirst (s) {
//   s += '';
//   let f = s.charAt (0)
//     .toLowerCase ();
//   return f + s.substr (1);
// }

// export function isset (o, k) {
//   return k in o;
// }

// export function inArray (needle, haystack) {
//     return haystack.indexOf (needle) !== -1;
// }

// export function getVar (player, key) {
//   return player.variables [key] || player [key];
// }

// export function indexBy (arr, key) {
//   let map;

//   map = {};

//   for (let item of arr) {
//     if (! (key in item)) {
//       continue;
//     }

//     map [item [key]] = item;
//   }

//   return map;
// }

// export function timeago (seconds) {
//   return moment (seconds * 1000).fromNow ();
// }

// export function detag (battleTag) {
//   let idx;

//   if ((idx = battleTag.indexOf ('#')) === -1) {
//     return battleTag;
//   }

//   return battleTag.substring (0, idx);
// }

// export function date (seconds) {
//   return moment (seconds * 1000).format ("Do MMM YYYY");
// }