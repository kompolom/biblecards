import React from 'react';

//export const Page = () => <div className="Page"></div>
function Page(props) {
    return React.createElement('div', { className: "Page", style: { 'textAlign': 'left', color: props.color } }, props.children);
}

export default Page;
