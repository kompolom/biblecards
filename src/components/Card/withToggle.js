import React, { useState } from 'react';

export const withToggle = (Card) => (props) => {
    const [show, setShow] = useState(props.show || 'text');
    const toggleShow = function() {
        if(show === 'text') {
            setShow('source');
        } else {
            setShow('text');
        }
    };
    return (<Card onToggle={toggleShow} show={show} verse={props.verse} view={props.view} />);
}