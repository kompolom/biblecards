import React, { useState } from 'react';

export const withToggle = (Card) => (props) => {
    const [show, setShow] = useState(props.show || 'text');
    const toggleShow = function() {
        let direction = 'text';
        if(show === 'text') direction = 'source';
        setShow(direction);
        props.onToggle && props.onToggle(direction);
    };
    return (<Card className="Card_toggleable" onToggle={toggleShow} show={show} verse={props.verse} view={props.view} />);
}