export class Verse {
  static re = /^([1-3]?\s?[^\w]*)(\d+):?(\d+)?/

  static create({ id, book, chapter, verse, text }) {
    const source = `${book} ${chapter}${chapter? ":": ''}${verse}`;
    return new Verse(id, source, text)
  }

  constructor(id, source, text) {
    this.id = id;
    this.source = source || '';
    this.text = text || '';
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
    return matches.length === 4? matches[2] : '';
  }

  get verse(){
    const matches = this.getMatches();
    if(!matches) return '';

    return matches[matches.length - 1];
  }

  export() {
    const exportable = {
      book: this.book,
      chapter: this.chapter? Number(this.chapter) : null,
      verse: Number(this.verse),
      text: this.text
    };
    this.id && (exportable.id = this.id)
    return exportable;
  }

}