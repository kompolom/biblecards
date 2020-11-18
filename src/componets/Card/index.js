import React, { useState } from 'react';
import "./Card.css";
// verse content
// verse source
// verse : { text: "", source: "Эф. 5:31"}
export const Card = (props) => {
    let cn = ['Card'];
    const [show, setShow] = useState(props.show);
    const toggleShow = function() {
        if(show === 'text') {
            setShow('source');
        } else {
            setShow('text');
        }
    };
    if (props.view) cn.push(`Card_view_${props.view}`);
    if (show) cn.push(`Card_show_${show}`);
    return (
    // view: list single 
    // show: text source
    <div className={cn.join(' ')} onClick={toggleShow}>
        <div className="Card__vt">{props.verse.text}</div>
        <div className="Card__vs">{props.verse.source}</div>
    </div>
    )
}