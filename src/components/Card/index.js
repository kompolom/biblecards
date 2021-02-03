import React from 'react';
import "./Card.css";
import { VerseStatistics } from "../VerseStatistics"

export const Card = (props) => {
    let cn = ['Card'];
    if (props.view) cn.push(`Card_view_${props.view}`);
    if (props.show) cn.push(`Card_show_${props.show}`);
    return (
    <div className={cn.join(' ')} onClick={props.onToggle}>
        <div className="Card__vt">{props.verse.text}</div>
        <div className="Card__vs">{props.verse.source}</div>
        {props.stats && <VerseStatistics view={props.stats[0]} correct={props.stats[1]} incorrect={props.stats[2]} />}
    </div>
    )
}

export * from './withToggle';