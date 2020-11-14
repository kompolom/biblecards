import React from 'react';
// verse content
// verse source
// verse : { text: "", source: "Эф. 5:31"}
export const Card = (props) => (
<div className="Card">
    <div className="Card__vc">{props.verse.text}</div>
    <div className="Card__vs">{props.verse.source}</div>
</div>
)