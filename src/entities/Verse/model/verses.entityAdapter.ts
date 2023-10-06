import { createEntityAdapter } from "@reduxjs/toolkit";
import { IVerse } from "./IVerse";

export const versesAdapter = createEntityAdapter<IVerse>();

