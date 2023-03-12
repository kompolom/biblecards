import { useState } from "react";
import { createBible } from "../createBible";

export function useBible() {
    const [bible] = useState(createBible());
    return bible;
}