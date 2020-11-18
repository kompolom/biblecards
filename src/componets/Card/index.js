import React from 'react';
import "./Card.css";
// verse content
// verse source
// verse : { text: "", source: "Эф. 5:31"}
export const Card = (props) => (
<div className="Card Card_view_text">
    <div className="Card__vc">{props.verse.text}</div>
    <div className="Card__vs">{props.verse.source}</div>
</div>
)