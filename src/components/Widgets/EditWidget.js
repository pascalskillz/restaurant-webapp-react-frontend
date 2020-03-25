import React, { Component } from 'react';
import API from '../../utils/API';

class EditWidget extends Component {
  state = {
    itemToEdit: {}
  };

  componentDidMount() {
    this.getItemToEdit(this.props.itemNum);
  }

  getItemToEdit = async id => {
    let item = {};
    await API.getOneMenuItem(id).then(res => {
      // console.log(res.data);
      item = res.data;
    });
    this.setState({
      itemToEdit: item
    });
  };

  render() {
    return (
      <div>
        <div className='buttonFromProps'>{this.props.closeButton}</div>
        <div>{this.state.itemToEdit.itemName}</div>
      </div>
    );
  }
}

export default EditWidget;
