import { CreateVerseRequest } from "./CreateVerseRequest";

export type UpdateVerseRequest = CreateVerseRequest & { id: number };