import { BibicardsDB } from "./models/Bibicards";

let dbInstance;
export async function getDb() {
    if (!dbInstance)
        dbInstance = await BibicardsDB.init();
    return dbInstance;
}
