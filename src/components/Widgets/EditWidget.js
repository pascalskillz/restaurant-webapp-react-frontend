import React, { Component } from 'react';
import API from '../../utils/API';

class EditWidget extends Component {
  state = {
    menuItems: [],
    filterSimilar: '',
    menuItemsLoading: true,
    selectedItem: {}

    // itemname: '',
    // itemprice: '',
    // cooktime: '',
    // itemdescription: '',
    // isvegan: false,
    // isspecial: false,
    // itemimage: '',
    // similarList: [],
    // imageUrl: ''
  };

  componentDidMount() {
    this.gatherAllItems();
  }

  handleInputChange = event => {
    // event.preventDefault()
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  gatherAllItems = async () => {
    let allItemsArr = [];
    await API.getAllMenuItems().then(res => {
      let items = res.data;
      // console.log(items)
      allItemsArr = [...items];
    });

    await this.setState({
      menuItems: [...allItemsArr],
      menuItemsLoading: false
    });
  };

  selectItemForEdit = async id => {
    let item = {};
    await API.getOneMenuItem(id).then(res => {
      console.log(res.data);
      item = {
        categoryId: res.data.categoryId,
        cookTime: res.data.cookTime,
        description: res.data.description,
        imageUrl: res.data.imageUrl,
        itemName: res.data.itemName,
        itemPrice: res.data.itemPrice,
        // similarItems: Array [],
        special: res.data.special,
        vegan: res.data.vegan
      };
    });

    await this.setState({
      selectedItem: item
    });
  };

  saveMenuItem = async e => {
    e.preventDefault();

    // await console.log(submitData)
    await API;
  };

  render() {
    const filterList = this.state.menuItems
      .filter(item => {
        return (
          item.itemName
            .toLowerCase()
            .indexOf(this.state.filterSimilar.toLowerCase()) >= 0
        );
      })
      .map((item, index) => (
        <tr key={index}>
          <th scope='row'>{item.id}</th>
          <td
            onClick={() => this.selectItemForEdit(item.id)}
            className='edit-item-select'>
            {item.itemName}
          </td>
        </tr>
      ));

    const allItemsList = this.state.menuItems.map((item, index) => (
      <tr key={index}>
        <th scope='row'>{item.id}</th>
        <td
          onClick={() => this.selectItemForEdit(item.id)}
          className='edit-item-select'>
          {item.itemName}
        </td>
      </tr>
    ));

    return (
      <div className='cpanel-edit-div'>
        <div className='edit-dropdown'>
          <div className='select-edit-item-div'>
            <small id='createSimilarDesc' className='form-text text-muted'>
              Select a menu item to edit/update
            </small>
            <input
              name='filterSimilar'
              type='text'
              className='form-control'
              id='editFilterSimilar'
              aria-describedby='filterSimilar'
              placeholder='Search Item Name'
              value={this.state.filterSimilar}
              onChange={this.handleInputChange}
            />
            <div className='table-scroll edit-table'>
              <table className='table table-striped'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Item Name</th>
                  </tr>
                </thead>
                <tbody>
                  {// if the filter bar is empty
                  this.state.filterSimilar.length < 1 ? (
                    // display the all items once loaded
                    !this.state.menuItemsLoading ? (
                      allItemsList
                    ) : (
                      <tr>
                        <th scope='row'>-</th>
                        <td>Loading...</td>
                        <td> </td>
                      </tr>
                    )
                  ) : (
                    // else display filtered items
                    filterList
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='edit-image-form-div'>
          <div className='edit-photo'>
            <img
              src={this.state.selectedItem.imageUrl}
              alt={this.state.selectedItem.itemName}
            />
          </div>
          <div className='edit-form'>
            <span>{this.state.selectedItem.itemName}</span>
            <span>{this.state.selectedItem.itemPrice}</span>
            <span>{this.state.selectedItem.description}</span>
          </div>
        </div>
        <div className='edit-save-button'>
          <button className='btn btn-danger'>CANCEL</button>
          <button className='btn'>SAVE</button>
        </div>
      </div>
    );
  }
}

export default EditWidget;
