import React, { useState } from "react";
import { connect } from "react-redux"
import { FlashCard } from "../FlashCard";

function getRandomElement(arr) {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}

export const CardViewer = connect(
    state => ({ verses: state.verses })
)(({ verses }) => {
    if(!verses.length) return null;

    const [verse, setVerse] = useState(getRandomElement(verses));
    const nextVerse = () => setVerse(getRandomElement(verses))
    return <div className="CardViewer">
        <FlashCard verse={verse} nextTrigger={nextVerse} />
    </div>
});