import React, { Component } from 'react';
import Modal from '../Modal';
import MenuItem from '../MenuItem';
import API from '../../utils/API';
import '../../styles/Widgets.css';

class DeleteWidget extends Component {
  state = {
    menuItems: [],
    // categories: [],
    // categoryArray: [0],
    filterSimilar: '',
    menuItemsLoading: true,
    // categoryLoading: true,
    selectedItem: {
      itemId: '',
      itemName: '',
      itemPrice: '',
      cookTime: '',
      description: '',
      vegan: false,
      special: false,
      similarList: [],
      imageUrl: ''
    },
    // itemName: '',
    // itemPrice: '',
    // cookTime: '',
    // description: '',
    // vegan: false,
    // special: false,
    // itemImage: '',
    // similarList: [],
    imageUrl: ''
    // selected: '',
    // selectedId: ''
  };

  componentDidMount() {
    this.gatherAllItems();
    // this.getCategories();
  }

  handleInputChange = event => {
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

  selectItemToDelete = async id => {
    await console.log('------------ selectItemToDelete');
    let item = {};
    await API.getOneMenuItem(id).then(res => {
      // console.log(res.data);
      item = {
        itemId: res.data.id,
        categoryId: res.data.categoryId,
        cookTime: res.data.cookTime,
        description: res.data.description,
        imageUrl: res.data.imageUrl,
        itemName: res.data.itemName,
        itemPrice: res.data.itemPrice,
        special: res.data.special,
        vegan: res.data.vegan
      };
    });

    await this.setState({
      selectedItem: item,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      cookTime: item.cookTime,
      description: item.description,
      vegan: item.vegan,
      special: item.special,
      imageUrl: item.imageUrl
    });

    await console.log('------------ selectItemToDelete bottom');
    await console.log(this.state.selectedItem);
    await console.log(this.state.selectedItem.itemId);
  };

  deleteMenuItem = async e => {
    e.preventDefault();
    console.log('------------ deleteMenuItem');
    await API.deleteMenuItem(this.state.selectedItem.itemId)
      .then(res => {
        if (res.status === 200) {
          alert('Success!');
          // TODO: RESET EVERYTHING
          window.location.reload();
        }
      })
      .catch(err => {
        alert('Item not deleted, please try again');
        // TODO: RESET EVERYTHING
      });
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
            onClick={() => this.selectItemToDelete(item.id)}
            className='edit-item-select'>
            {item.itemName}
          </td>
        </tr>
      ));

    const allItemsList = this.state.menuItems.map((item, index) => (
      <tr key={index}>
        <th scope='row'>{item.id}</th>
        <td
          onClick={() => this.selectItemToDelete(item.id)}
          className='edit-item-select'>
          {item.itemName}
        </td>
      </tr>
    ));

    return (
      <div className='cpanel-delete-div'>
        <div className='delete-dropdown'>
          <div className='select-edit-item-div'>
            <small id='createSimilarDesc' className='form-text text-muted'>
              Select a menu item to delete
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
        <div className='delete-display-item-div'>
          <MenuItem
            img={this.state.selectedItem.imageUrl}
            name={this.state.selectedItem.itemName}
            price={
              this.state.selectedItem.itemPrice
                ? this.state.selectedItem.itemPrice
                : this.state.itemPrice
            }
          />
        </div>
        <div className='delete-save-button-div'>
          <Modal
            className='delete-modal-div'
            title='Preview'
            text='Are you sure you want to delete this item?'
            content={
              <MenuItem
                img={this.state.selectedItem.imageUrl}
                name={this.state.selectedItem.itemName}
                price={
                  this.state.selectedItem.itemPrice
                    ? this.state.selectedItem.itemPrice
                    : this.state.itemPrice
                }
              />
            }
            buttonClose={<button className='btn btn-primary'>Cancel</button>}
            buttonSave={
              <button
                type='submit'
                value='Send'
                className='btn btn-primary'
                id='create-form-submit-btn'
                onClick={e => this.deleteMenuItem(e)}>
                Delete
              </button>
            }>
            <button
              className='btn delete-button'
              // onClick={this.displayItemToSubmit}
            >
              DELETE
            </button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DeleteWidget;
