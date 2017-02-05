import React from 'react';

export default (props) => {
  return (
    <div className="box">
      <div className={props.css} onClick={props.press}>{props.text}</div>
    </div>
  );
}
