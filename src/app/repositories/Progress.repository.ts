import { IProgress, IProgressRepository } from 'entities/Progress';
import { BiblecardsDB, ProgressDTO } from '../database/Bibicards';

/**
 * Implementation of IProgressRepository using IndexedDB (via BiblecardsDB).
 */
export class IndexedDBProgressRepository implements IProgressRepository {
  readonly #db: BiblecardsDB;

  constructor(db: BiblecardsDB) {
    this.#db = db;
  }

  async getById(excerptId: string): Promise<IProgress | null> {
    const dto = await this.#db.getProgress(excerptId);
    if (!dto) return null;
    return this.#mapDtoToProgress(dto);
  }

  async save(progress: IProgress): Promise<void> {
    await this.#db.saveProgress(this.#progressToDto(progress));
  }

  async getAll(): Promise<IProgress[]> {
    const dtos = await this.#db.getAllProgress();
    return dtos.map(dto => this.#mapDtoToProgress(dto));
  }

  async getDueReviews(date: Date = new Date()): Promise<IProgress[]> {
    const dtos = await this.#db.getDueProgress(date.toISOString());
    return dtos.map(dto => this.#mapDtoToProgress(dto));
  }

  #progressToDto(progress: IProgress): ProgressDTO {
    return {
      excerptId: progress.excerptId,
      masteryLevel: progress.masteryLevel,
      srs: { ...progress.srs },
      stats: { ...progress.stats },
      updatedAt: progress.updatedAt,
    };
  }

  #mapDtoToProgress(dto: ProgressDTO): IProgress {
    return {
      excerptId: dto.excerptId,
      masteryLevel: dto.masteryLevel,
      srs: { ...dto.srs },
      stats: { ...dto.stats },
      updatedAt: dto.updatedAt,
    };
  }
}
