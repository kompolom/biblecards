import { Excerpt } from './Excerpt';

export interface IVerseRepository {
    getById(id: string): Promise<Excerpt>
    getVerses(query: { id?: string }): Promise<Excerpt[]>
    createVerse(data: Excerpt): Promise<Excerpt>
    updateVerse(data: Excerpt): Promise<Excerpt>
    deleteVerse(id: string): Promise<void>
}
