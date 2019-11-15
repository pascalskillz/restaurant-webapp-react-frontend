import React from "react";
import "../styles/MenuItem.css";
// import MenuItemDetail from "../containers/MenuItemDetail";

const MenuItem = props => (
  <div className="menu-item-div">
<<<<<<< HEAD
    <div className="menu-item-image">
      <a href={`/items/${props.id}`}>
        <img src={props.img} alt={props.name} />
      </a>
=======
    <div 
      className="menu-item-image">
      <img src={props.img} alt={props.name}/>
    </div>
    <div className="menu-item-text">
      <span>{props.name}</span>
      <span>$ {props.price}</span>
      <span>{props.id}</span>
>>>>>>> refs/remotes/origin/develop
    </div>
    <div className="menu-item-text">{props.name}</div>
  </div>
);

export default MenuItem;
