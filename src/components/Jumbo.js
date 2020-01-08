import React from 'react';

const Jumbo = props => {
  return (
    <div className='jumbo'>
      <div className='jumbo-img'>
        <img
          src={props.src}
          alt={props.alt}
        />
      </div>
      <div className='jumbo-text'>{props.text}</div>
      <div id='breakpoint'></div>
    </div>
  );
};

export default Jumbo;
