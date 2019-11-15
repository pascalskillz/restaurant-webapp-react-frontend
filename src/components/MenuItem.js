import React from "react";
import "../styles/MenuItem.css";
// import MenuItemDetail from "../containers/MenuItemDetail";

const MenuItem = props => (
  <div className="menu-item-div">
    <div className="menu-item-image">
      <a href={`/items/${props.id}`}>
        <img src={props.img} alt={props.name} />
      </a>
    </div>
    <div className="menu-item-text">{props.name}</div>
  </div>
);

export default MenuItem;
