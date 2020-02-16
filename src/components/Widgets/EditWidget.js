import React, { Component } from 'react';
import Modal from '../Modal';
import MenuItem from '../MenuItem';
import API from '../../utils/API';
import '../../styles/Widgets.css';

class EditWidget extends Component {
  state = {
    menuItems: [],
    categories: [],
    categoryArray: [0],
    filterSimilar: '',
    menuItemsLoading: true,
    categoryLoading: true,
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
    similarList: [],
    imageUrl: '',
    selected: '',
    selectedId: ''
  };

  componentDidMount() {
    this.gatherAllItems();
    this.getCategories();
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

  uploadImage = async (resultEvent, widget) => {
    if (resultEvent.event === 'success') {
      let url = await resultEvent.info.secure_url;
      await widget.close();
      await this.setState({
        // newImageUrl: url,
        imageUrl: url
      });
      await this.setState(prevState => ({
        selectedItem: {
          ...prevState.selectedItem,
          imageUrl: url
        }
      }));
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

  handleCategorySelect = event => {
    console.log('------------ handleCategorySelect');
    console.log(event.target.value);
    console.log(event.target.selectedIndex);
    this.setState({
      selected: event.target.value,
      selectedId: event.target.selectedIndex + 1
    });
  };

  setCategoryValue = (text, id) => {
    console.log('------------ setCategoryValue');
    // console.log(this.state.categoryArray);
    let e = document.getElementById('select-id');

    // e.options[e.selectedIndex] = 9
    // e.value = 'test';
    // e.text = 'test';

    // this.setState({
    //   selected: 'testText',
    //   selectedId: 'testIndex'
    // });

    for (var i = 0; i < e.options.length; i++) {
      // console.log(e.options[i]);
      // console.log(e.options[i].id);
      // console.log(e.options[i].value);
      // console.log(e.options[i].selected);
      // console.log('-----------');
      // if (e.options[i].value.split(' ')[0].toLowerCase() === text) {
      if (e.options[i].value.toLowerCase() === text) {
        console.log('FOUND');
        e.options[i].selected = true;
        this.setState({
          selected: text,
          selectedId: id
        });
        console.log(this.state.selected);
        console.log(this.state.selectedId);
        break;
      }
    }
    console.log('------------ setCategoryValue bottom');
    console.log(this.state.selected);
    console.log(this.state.selectedId);

    // console.log(e.selectedIndex);
    // console.log(e.selected);
    // console.log(e.text);
    // console.log(e.value);
    // this.setState({
    //   selected: text,
    //   selectedId: index
    // });
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

  getCategories = async () => {
    let sidebar = [];
    let catItems = [];
    await API.getCategories().then(res => {
      sidebar[0] = { id: 0 };
      catItems[0] = 0;
      let categories = res.data;
      for (var i of categories) {
        sidebar[i.id] = i;
        catItems[i.id] = i.categoryName;
      }
    });

    await this.setState({
      categories: [...sidebar],
      categoryLoading: false,
      categoryArray: [...catItems]
    });
  };

  selectItemForEdit = async id => {
    await console.log('------------ selectItemForEdit');
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

    await this.setCategoryValue(
      this.state.categoryArray[item.categoryId],
      item.categoryId
    );

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

    await console.log('------------ selectItemForEdit bottom');
    await console.log(this.state.selected);
    await console.log(this.state.selectedId);
  };

  displayItemToSubmit = async () => {
    let submitData = {
      id: this.state.selectedItem.itemId,
      itemName: this.state.selectedItem.itemName,
      itemPrice: this.state.selectedItem.itemPrice,
      cookTime: this.state.selectedItem.cookTime,
      description: this.state.selectedItem.description,
      vegan: this.state.selectedItem.vegan,
      special: this.state.selectedItem.special,
      imageUrl: this.state.selectedItem.imageUrl,
      similarList: this.state.selectedItem.similarList
    };
    await console.log(submitData);
  };

  saveMenuItem = async e => {
    e.preventDefault();
    console.log('------------ saveMenuItem');
    console.log('------------ saveMenuItem');
    let submitData = {
      id: this.state.selectedItem.itemId,
      itemName: this.state.itemName,
      itemPrice: this.state.itemPrice,
      cookTime: this.state.cookTime,
      description: this.state.description,
      vegan: this.state.vegan,
      special: this.state.special,
      imageUrl: this.state.imageUrl,
      similarList: this.state.similarList
    };
    await console.log(submitData);
    await console.log(this.state.selectedId);
    await API.updateMenuItem(this.state.selectedId, submitData)
      .then(res => {
        if (res.status === 200) {
          alert('Success!');
          // TODO: RESET EVERYTHING
          window.location.reload();
        }
      })
      .catch(err => {
        alert('Data not saved, please try again');
        // TODO: RESET EVERYTHING
      });
  };

  getMenuItemName = index => {
    return this.state.menuItems[index].itemName;
  };
  
  addToSimilar = async e => {
    e.preventDefault();
    // console.log(e.target.id)
    // console.log(e.target.id.split('=')[1]);
    let itemId = parseInt(e.target.id.split('=')[1]);
    let itemToAdd = { similarMenuItemId: itemId };
    // console.log(itemToAdd);
    // const test = this.state.test;
    let doesExist = false;
    if (this.state.similarList.length < 3) {
      for (var i in this.state.similarList) {
        if (this.state.similarList[i].similarMenuItemId === itemId) {
          doesExist = true;
        }
      }
      if (!doesExist) {
        await this.setState({
          similarList: [...this.state.similarList, itemToAdd]
        });
      } else {
        console.log('EXISTS');
      }
    } else {
      console.log('TOO MANY ITEMS');
    }
    console.log(this.state.similarList);
    // if (!doesExist) {
    //   await this.setState({
    //     test: [...this.state.test, itemToAdd]
    //   });
    // } else {
    //   console.log('ALREADY ADDED');
    // }
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

    const categoryDropdown = this.state.categoryLoading ? (
      <option value='--'>--</option>
    ) : (
      this.state.categories
        .filter(item => {
          return item.id > 0;
        })
        .map((item, index) => (
          <option key={index} value={item.categoryName} id={item.id}>
            {item.categoryName.split(' ')[0]}
          </option>
        ))
    );

    const similarList = this.state.similarList.map((item, index) => (
      <div key={index} className='similar-confirm'>
        {this.getMenuItemName(item.similarMenuItemId)}
        <button
          id={`deleteId=${item.similarMenuItemId}`}
          className='btn similar-delete-button'
          onClick={e => this.deleteFromSimilar(e)}>
          X
        </button>
      </div>
    ));

    const filterAllItemsList = this.state.menuItems.map((item, index) => (
      <tr key={index}>
        <th scope='row'>{item.id}</th>
        <td>{item.itemName}</td>
        <td>
          <button
            id={`similarId=${item.id}`}
            name={item.itemName}
            className='btn create-item-similar'
            onClick={e => this.addToSimilar(e)}>
            ADD
          </button>
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
                      checked={this.state.vegan || false}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='edit-form-item'>
                    <label htmlFor='special'>Special?</label>
                    <input
                      name='special'
                      type='checkbox'
                      id='editSpecial'
                      checked={this.state.special || false}
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
                  <div className='edit-form-select-div'>
                    <label htmlFor='itemCategory'>Item Category</label>
                    <div className='menu-select'>
                      {this.state.categoryLoading ? (
                        <select>
                          <option value='--'>--</option>
                        </select>
                      ) : (
                        <select
                          id='select-id'
                          onChange={this.handleCategorySelect}>
                          {categoryDropdown}
                        </select>
                      )}
                    </div>
                    <small
                      id='createDescriptionDesc'
                      className='form-text text-muted'>
                      Select a menu category
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='edit-group5'>
          <div className='similar-items-div'>
            <label htmlFor='itemSimilar'>Similar Items</label>
            <small id='editSimilarDesc' className='form-text text-muted'>
              Select all similar items, search for items below
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
            <div className='table-scroll'>
              <table className='table table-striped'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Item Name</th>
                    <th scope='col'>Similar?</th>
                  </tr>
                </thead>
                <tbody>
                  {// if the filter bar is empty
                  this.state.filterSimilar.length < 1 ? (
                    // display the all items once loaded
                    !this.state.menuItemsLoading ? (
                      filterAllItemsList
                    ) : (
                      <tr>
                        <th scope='row'>0</th>
                        <td>Loading...</td>
                        <td> </td>
                      </tr>
                    )
                  ) : (
                    // else
                    // display filtered items
                    filterList
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className='similar-list-div'>
            <label htmlFor='itemSimilar'>Confirm Similar Items</label>
            <small id='editSimilarListDesc' className='form-text text-muted'>
              See list to confirm or delete similar items
            </small>
            {this.state.similarList.length > 0 ? (
              similarList
            ) : (
              <div style={{ fontStyle: 'italic' }}>No Similar Items</div>
            )}
          </div>
        </div>

        <div className='edit-save-button-div'>
          <Modal
            className=''
            title='Preview'
            text='Are you sure you want to update this item?'
            content={
              <MenuItem
                img={this.state.selectedItem.imageUrl}
                name={this.state.selectedItem.itemName}
                price={
                  this.state.selectedItem.itemPrice
                    ? this.state.selectedItem.itemPrice
                    : this.state.itemPrice
                }
                // id={item.id}
              />
            }
            buttonClose={<button className='btn btn-primary'>Cancel</button>}
            buttonSave={
              <button
                type='submit'
                value='Send'
                className='btn btn-primary'
                id='edit-form-submit-btn'
                onClick={e => this.saveMenuItem(e)}>
                Save
              </button>
            }>
            <button className='btn' onClick={this.displayItemToSubmit}>
              SAVE
            </button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default EditWidget;
