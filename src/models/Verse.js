export class Verse {
  static re = /^([1-3]?\s?[^\w]*)(\d+):?(\d+)?/
  constructor(id, source, content) {
    this.id = id;
    this.source = source || '';
    this.text = content || '';
  }

  getMatches() {
    if(this._matches)
      return this._matches;

    const matches = this.source.match(Verse.re)
    if(matches) {
      this._matches = Object.freeze(matches.filter(val => val !== undefined));
    }

    return matches;
  }

  get book(){
    const matches = this.getMatches();
    return matches? matches[1].trimEnd() : '';
  }

  get chapter(){
    const matches = this.getMatches();
    if(!matches) return '';
    const chapter = matches.length === 4? matches[2] : '';
    return chapter;
  }

  get verse(){
    const matches = this.getMatches();
    if(!matches) return '';

    return matches[matches.length - 1];
  }
}