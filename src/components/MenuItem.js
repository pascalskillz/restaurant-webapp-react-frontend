import React from 'react';
import '../styles/MenuItem.css';
// import MenuItemDetail from "../containers/MenuItemDetail";

const MenuItem = (props) => (
  <div className='menu-item-div'>
    <div className='menu-item-image'>
      <img src={props.img} alt={props.name} />
    </div>
    <div className='menu-item-text'>
      <span>{props.name}</span>
      <span>${props.price || "-"}</span>
    </div>
  </div>
);

export default MenuItem;
