import React from 'react';

export default (props) => {
  return (
    <div className="box">
      <div data-id={props.id} className={props.css} onClick={props.press}>{props.text}</div>
    </div>
  );
}
