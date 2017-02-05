import React from 'react';

export default (props) => {
  return (
    <div className="mode">
      <h1>Mode</h1>
      <div className="status">{props.mode}</div>
      <button onClick={props.toggleMode}>Change Mode</button>
    </div>
  );
}
