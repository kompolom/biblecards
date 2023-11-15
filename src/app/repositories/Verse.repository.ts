import { IVerseRepository } from "features/Verse";
import { IVerse } from "entities/Verse";
import { BiblecardsDB, VerseDTO } from "../database/Bibicards";
import { Bible } from "entities/Bible";

export class VerseRepository implements IVerseRepository {
    readonly #db: BiblecardsDB;
    readonly #bible: Bible;

    constructor( db: BiblecardsDB, bible: Bible) {
        this.#db = db;
        this.#bible = bible;
    }

    async createVerse(data: IVerse): Promise<IVerse> {
        const dto = this.#mapVerseToDto(data);
        delete dto.id;
        const saved = await this.#db.createVerse(dto)
        return this.#mapDtoToVerse(saved, this.#bible);
    }

    deleteVerse(id: number) {
        return this.#db.deleteVerse(id);
    }

    async getVerses(_query: { id?: number }): Promise<IVerse[]> {
        const dto = await this.#db.getVerses();
        return dto.map(dto => this.#mapDtoToVerse(dto, this.#bible))
    }


    async updateVerse(data: IVerse): Promise<IVerse> {
        const updated = await this.#db.updateVerse(this.#mapVerseToDto(data))
        return this.#mapDtoToVerse(updated, this.#bible);
    }

    #mapVerseToDto(data: IVerse): VerseDTO {
        return {
            id: data.id,
            book: data.book.number,
            chapter: data.chapter,
            number: data.number,
            text: data.text,
        }
    }

    #mapDtoToVerse(dto: VerseDTO, bible: Bible) : IVerse {
        return {
            id: dto.id,
            book: bible.getBookByNumber(dto.book),
            chapter: dto.chapter,
            number: dto.number,
            text: dto.text
        }
    }
}