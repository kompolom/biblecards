import { IVerse } from "entities/Verse"

export interface IVerseRepository {
    getVerses(query: { id?: number }): Promise<IVerse[]>
    createVerse(data: IVerse): Promise<IVerse>
    updateVerse(data: IVerse): Promise<IVerse>
    deleteVerse(id: number): Promise<void>
}