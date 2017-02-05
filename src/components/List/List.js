import React from 'react';
import Box from '../Box/Box';

export default (props) => {
  return (
    <div className="list">
      <h1>{props.header}</h1>
      {
        props.items.map((item, idx) => <Box key={idx} css={item.css} text={item.text} press={props.press} />)
      }
    </div>
  );
}
