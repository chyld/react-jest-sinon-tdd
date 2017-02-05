import React from 'react';

export default (props) => {
  return (
    <div className="box">
      <button onClick={props.press}>{props.text}</button>
    </div>
  );
}
