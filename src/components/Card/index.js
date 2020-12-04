import React from 'react';
import "./Card.css";
// verse content
// verse source
// verse : { text: "", source: "Эф. 5:31"}
export const Card = (props) => {
    let cn = ['Card'];
    if (props.view) cn.push(`Card_view_${props.view}`);
    if (props.show) cn.push(`Card_show_${props.show}`);
    return (
    // view: list single 
    // show: text source
    <div className={cn.join(' ')} onClick={props.onToggle}>
        <div className="Card__vt">{props.verse.text}</div>
        <div className="Card__vs">{props.verse.source}</div>
    </div>
    )
}