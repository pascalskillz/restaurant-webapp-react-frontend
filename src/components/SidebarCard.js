import React from "react";
import "../styles/SidebarCard.css";

const SidebarCard = props => {
  return (
    <div className="sidebar-item-div">
      <div className="sidebar-img">
        <img src={props.img} alt={props.name}/>
      </div>
      <div className="sidebar-text">
        {props.name.toUpperCase()}
      </div>
    </div>
  );
};
  
export default SidebarCard;