import React, { Component } from 'react';
import '../../styles/Widgets.css';
import API from '../../utils/API';

class EditWidget extends Component {
  state = {
    menuItems: [],
    filterSimilar: '',
    menuItemsLoading: true,
    selectedItem: {
      itemName: '',
      itemPrice: '',
      cookTime: '',
      description: '',
      vegan: false,
      special: false,
      // itemImage: '',
      similarList: [],
      imageUrl: ''
    },
    itemName: '',
    itemPrice: '',
    cookTime: '',
    description: '',
    vegan: false,
    special: false,
    // itemImage: '',
    similarList: [],
    imageUrl: ''
  };

  componentDidMount() {
    this.gatherAllItems();
  }

  widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'yowats0n',
      uploadPreset: 'twibcpgv'
    },
    (error, result) => {
      if (error) {
        console.log(error);
      }
      this.uploadImage(result, this.widget);
    }
  );

  uploadImage = (resultEvent, widget) => {
    if (resultEvent.event === 'success') {
      let url = resultEvent.info.secure_url;
      widget.close();
      this.setState({
        newImageUrl: url
      });
    }
  };

  showWidget = (e, widget) => {
    e.preventDefault();
    widget.open();
  };

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

  selectItemForEdit = async id => {
    let item = {};
    await API.getOneMenuItem(id).then(res => {
      console.log(res.data);
      item = {
        itemId: res.data.id,
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
      selectedItem: item,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      cookTime: item.cookTime,
      description: item.description,
      vegan: item.vegan,
      special: item.special,
      // itemImage: item.,
      // similarList: item.similarList,
      imageUrl: item.imageUrl
    });
  };

  saveMenuItem = async e => {
    e.preventDefault();
    let submitData = {
      itemName: this.state.itemName,
      itemPrice: this.state.itemPrice,
      cookTime: this.state.cookTime,
      description: this.state.description,
      vegan: this.state.vegan,
      special: this.state.special,
      // itemImage: this.state.,
      // similarList: this.state.similarList,
      imageUrl: this.state.imageUrl
    };
    await console.log(submitData);
    await API.updateMenuItem(this.state.itemId, submitData);
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
        <div className='edit-item-form-div'>
          <div className='edit-photo'>
            <img
              src={this.state.selectedItem.imageUrl}
              alt={this.state.selectedItem.itemName}
            />
            <div className='edit-image-button-div'>
              <button
                className='button upload-button'
                onClick={e => this.showWidget(e, this.widget)}>
                <i className='fas fa-cloud-upload-alt'></i> Edit Image
              </button>
            </div>
          </div>
          <div className='edit-item-form-container'>
            {!this.state.selectedItem ? (
              <span>Select an item</span>
            ) : (
              <div className='edit-form-inner-div'>
                <div className='edit-item-heading'>
                  {this.state.selectedItem.itemName
                    ? `${this.state.selectedItem.itemName} - ${this.state.selectedItem.itemId}`
                    : 'Select an item from above'}
                </div>
                <div className='edit-item-form-all-items'>
                  <div className='edit-form-item'>
                    <label htmlFor='itemName'>Item Name</label>
                    <input
                      name='itemName'
                      type='text'
                      id='editItemName'
                      value={this.state.itemName || ''}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='edit-form-item'>
                    <label htmlFor='itemPrice'>Item Price</label>
                    <input
                      name='itemPrice'
                      type='number'
                      id='editItemPrice'
                      value={this.state.itemPrice || ''}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='edit-form-item'>
                    <label htmlFor='cookTime'>Cook Time</label>
                    <input
                      name='cookTime'
                      type='number'
                      id='editCookTime'
                      value={this.state.cookTime || ''}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='edit-form-item'>
                    <label htmlFor='vegan'>Vegan?</label>
                    <input
                      name='vegan'
                      type='checkbox'
                      id='editVegan'
                      value={this.state.vegan || false}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='edit-form-item'>
                    <label htmlFor='special'>Special?</label>
                    <input
                      name='special'
                      type='checkbox'
                      id='editSpecial'
                      value={this.state.special || false}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='edit-form-item'>
                    <label htmlFor='description'>Item Description</label>
                    <textarea
                      name='description'
                      type='textarea'
                      className='form-control'
                      id='editItemDescription'
                      value={this.state.description || ''}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='edit-save-button-div'>
          <button className='btn btn-danger'>CANCEL</button>
          <button className='btn' onClick={e => this.saveMenuItem(e)}>
            SAVE
          </button>
        </div>
      </div>
    );
  }
}

export default EditWidget;
