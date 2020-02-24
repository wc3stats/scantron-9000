export default class Pattern
{
  constructor (fields)
  {
    for (let key in fields) {
      if (! (fields [key] instanceof RegExp)) {
        fields [key] = new RegExp (fields [key], 'i');
      }
    }

    this.fields = fields;

  }

  matches (object)
  {
    for (let key in this.fields) {
      if (! (key in object)) {
        return false;
      }

      if (! (this.fields [key].test (object [key]))) {
        return false;
      }
    }

    return true;
  }
}