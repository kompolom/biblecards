import React from 'react';

//export const Page = () => <div className="Page"></div>
function Page(props) {
    //return (<div className="Page">{props.children}</div>);
    console.log(props);
    return React.createElement('div', { className: "Page", style: { 'text-align': 'left', color: props.color } }, props.children);
}

export default Page;
