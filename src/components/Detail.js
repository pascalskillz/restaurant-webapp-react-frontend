import React from "react";
// import "../../styles/Detail.css";



const Detail = props => {

  return (
    <div className="container">
      <div className="menu-item-row row">
        <div className="item-image">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="item-detail">
          <h2>{props.name}</h2>
          <h4>$ {props.price}</h4>
          <div>
            <p>{props.desc}</p>
          </div>
        <div className="item-button">
          <button onClick={this.handleClick}>Add To Cart</button>
        </div>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
};

export default Detail;
