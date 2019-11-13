import React from 'react';

const Detail = props => {
  return (
    <div>
      {props.name}
      <br/>
      {props.desc}
    </div>
  );
};

export default Detail;