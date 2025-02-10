import { IVerseRepository } from 'features/Verse';
import { Excerpt, ExcerptSource } from 'entities/Verse';
import { BiblecardsDB, VerseDTO } from '../database/Bibicards';

export class VerseRepository implements IVerseRepository {
  readonly #db: BiblecardsDB;

  constructor(db: BiblecardsDB) {
    this.#db = db;
  }

  async createVerse(data: Excerpt): Promise<Excerpt> {
    debugger;
    const saved = await this.#db.createVerse(this.#verseToDTO(data));
    return this.#mapDtoToVerse(saved);
  }

  deleteVerse(id: string) {
    return this.#db.deleteVerse(id);
  }

  async getById(id: string): Promise<Excerpt> {
    const dto = await this.#db.readOne<VerseDTO>(
      BiblecardsDB.VERSES_STORE,
      IDBKeyRange.only(id),
    );
    return this.#mapDtoToVerse(dto);
  }

  async getVerses(_query: { id?: string }): Promise<Excerpt[]> {
    const dto = await this.#db.getVerses({ count: 10 });
    return dto.map((dto) => this.#mapDtoToVerse(dto));
  }

  async updateVerse(data: Excerpt): Promise<Excerpt> {
    const updated = await this.#db.updateVerse(data);
    return data;
  }

  #verseToDTO(verse: Excerpt): VerseDTO {
    return {
        id: verse.id,
        text: verse.text,
    }
  }

  #mapDtoToVerse(dto: VerseDTO): Excerpt {
    return new Excerpt(ExcerptSource.parse(dto.id), dto.text);
  }
}
