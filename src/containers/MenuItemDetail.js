/*

  I DONT BELIEVE THIS PAGE IS BEING USED ...


*/

import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/API';

let { id } = useParams();

class MenuItemDetail extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  //   state = {
  //     renderItem: []
  //   };

  componentDidMount() {
    this.getOneMenuItem(id);
  }

  getOneMenuItem = id => {
    API.getOneMenuItem(id).then(res => {
      this.setState({
        renderItem: [...res.data]
      });
    });
  };

  render() {
    return (
      //   <div className="container">
      //     <div className="row">
      //       <div className="item-image">
      //         <img src={props.img} alt={props.name} />
      //       </div>
      //       <div className="item-detail">
      //         <h2>Item Name</h2>
      //         <h4>$10.99</h4>
      //         <div>
      //           <p>description ....</p>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="row"></div>
      //   </div>

        // {this.state.renderItem.map(item => {
        //   <div>{item}</div>;
        // })}
      <div>
        {this.state.renderItem[0]}
        MENU ITEM DETAIL
      </div>
    );
  }
}

export default MenuItemDetail;
