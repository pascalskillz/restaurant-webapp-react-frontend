import React, { Component } from 'react';
import Modal from '../Modal';
import MenuItem from '../MenuItem';
import API from '../../utils/API';
import '../../styles/cPanel.css';

class EditWidget extends Component {
  state = {
    itemToEdit: {},
    itemToEditLoading: true,
    categories: [],
    categoryLoading: true,
    menuItems: [],
    menuItemsLoading: true,
  };

  async componentDidMount() {
    await this.getItemToEdit(this.props.itemNum);
    await this.getCategories();
    await this.getAllMenuItems();
    await this.setCurrentItemCategory();
    await this.setCurrentItemSimilarItems();
  }

  widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'yowats0n',
      uploadPreset: 'twibcpgv',
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
      // await this.setState({
      //   imageUrl: url
      // });
      await this.setState((prevState) => ({
        itemToEdit: {
          ...prevState.itemToEdit,
          imageUrl: url,
        },
      }));
    }
  };

  showWidget = (e, widget) => {
    e.preventDefault();
    widget.open();
  };

  getItemToEdit = async (id) => {
    let item = {};
    await API.getOneMenuItem(id).then((res) => {
      item = res.data;
    });
    await console.log('---------getItemToEdit');
    await console.log(item);
    await this.setState({
      itemToEdit: item,
      itemToEditLoading: false,
    });
  };

  getCategories = async () => {
    let categoriesObject = {};
    await API.getCategories().then((res) => {
      console.log('---------getCategories');
      console.log(res.data);
      categoriesObject = res.data;
    });

    await this.setState({
      categories: categoriesObject,
      categoryLoading: false,
    });
  };

  getAllMenuItems = async () => {
    let allItemsArr = [];
    await API.getAllMenuItems().then((res) => {
      let items = res.data;
      allItemsArr = [...items];
    });

    await this.setState({
      menuItems: [...allItemsArr],
      menuItemsLoading: false,
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // this.setState({
    //   [name]: value
    // });

    this.setState((prevState) => ({
      itemToEdit: {
        ...prevState.itemToEdit,
        [name]: value,
      },
    }));

    console.log(this.state.itemToEdit);
  };

  handleCategorySelect = async (event) => {
    console.log('------------ handleCategorySelect');
    console.log(event.target.value);

    let newCategoryObject = await this.state.categories.filter((item) => {
      return item.categoryName === event.target.value;
    });

    await console.log(newCategoryObject[0].id);

    await this.setState((prevState) => ({
      itemToEdit: {
        ...prevState.itemToEdit,
        categoryId: newCategoryObject[0].id,
      },
    }));

    await console.log(this.state.itemToEdit);
  };

  setCurrentItemCategory = async () => {
    await console.log('---------setCurrentItemCategory');
    await console.log(this.state.itemToEdit);
    let currentItemCategoryId = await this.state.itemToEdit.categoryId;
    let currentItemCategoryName = await this.state.categories.filter((item) => {
      return item.id === currentItemCategoryId;
    });
    await console.log(currentItemCategoryName[0].categoryName);
    await this.setCategoryValue(currentItemCategoryName[0].categoryName);
  };

  setCategoryValue = (text) => {
    // console.log('------------ setCategoryValue');
    let e = document.getElementById('select-id');
    // console.log(e);
    for (var i = 0; i < e.options.length; i++) {
      if (e.options[i].value.toLowerCase() === text) {
        // console.log('FOUND');
        e.options[i].selected = true;
        break;
      }
    }
  };

  saveMenuItem = async (e) => {
    e.preventDefault();
    console.log(this.state.itemToEdit);
    await API.updateMenuItem(
      this.state.itemToEdit.categoryId,
      this.state.itemToEdit
    )
      .then((res) => {
        if (res.status === 200) {
          alert('Success!');
          // TODO: RESET EVERYTHING
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('Data not saved, please try again');
        // TODO: RESET EVERYTHING
      });
  };

  setCurrentItemSimilarItems = async () => {
    await console.log('---------setCurrentItemSimilarItems');
    await console.log(this.state.itemToEdit);
    if(this.state.itemToEdit.similarItems[0]){
      this.handleInitialSimilarItems(
        this.state.itemToEdit.similarItems[0].similarMenuItemId,
        0
      );
    }
    if(this.state.itemToEdit.similarItems[1]){
      this.handleInitialSimilarItems(
        this.state.itemToEdit.similarItems[1].similarMenuItemId,
        1
      );
    }
    if(this.state.itemToEdit.similarItems[2]){
      this.handleInitialSimilarItems(
        this.state.itemToEdit.similarItems[2].similarMenuItemId,
        2
      );
    }
  };

  handleInitialSimilarItems = async (similarItemId, similarItemArrayIndex) => {
    await console.log(`--handleInitialSimilarItems${similarItemArrayIndex}`);
    let tempItem = {};
    await API.getOneMenuItem(similarItemId)
      .then((res) => {
        tempItem = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await console.log(tempItem);
    let e = await document.getElementById(
      `similar-select-${similarItemArrayIndex}`
    );
    await console.log(e);
    for (var i = 0; i < e.options.length; i++) {
      if (e.options[i].value === tempItem.itemName) {
        e.options[i].selected = await true;
        break;
      }
    }
  };

  handleSimilarItemSelect = async (e, id) => {
    e.persist();
    await console.log('--handleSimilarItemSelect');
    await console.log(this.state.itemToEdit.similarItems);
    let localItemName = await e.target.value;
    let newSimilarItemList = await [...this.state.itemToEdit.similarItems];
    await console.log(newSimilarItemList);
    if (localItemName !== '--') {
      let itemToBeAddedToSimilarList = await this.state.menuItems.filter(
        (item) => {
          return item.itemName === localItemName;
        }
      );
      await console.log('itemToBeAddedToSimilarList');
      await console.log(itemToBeAddedToSimilarList);
      newSimilarItemList[id] = await {
        similarMenuItemId: itemToBeAddedToSimilarList[0].id,
      };
      await this.setState((prevState) => ({
        itemToEdit: {
          ...prevState.itemToEdit,
          similarItems: [...newSimilarItemList],
        },
      }));
    }
    await console.log('newSimilarList afterwards');
    await console.log(newSimilarItemList);
  };

  render() {
    const categoryDropdown = this.state.categoryLoading ? (
      <option value='--'>--</option>
    ) : (
      this.state.categories
        .filter((item) => {
          return item.id > 0;
        })
        .map((item, index) => (
          <option key={index} value={item.categoryName} id={item.id}>
            {/* {item.categoryName.split(' ')[0]} */}
            {item.categoryName}
          </option>
        ))
    );

    const similarItemsContainer = (
      <div className='similar-items-div'>
        <select
          id='similar-select-0'
          className='similar-items-select'
          onChange={(e) => this.handleSimilarItemSelect(e, 0)}>
          <option value='--'>--</option>
          {this.state.itemToEditLoading ? (
            <option value='--'>--</option>
          ) : (
            this.state.menuItems.map((item, index) => (
              <option key={index} value={item.itemName}>
                {item.itemName}
              </option>
            ))
          )}
        </select>
        <select
          id='similar-select-1'
          className='similar-items-select'
          onChange={(e) => this.handleSimilarItemSelect(e, 1)}>
          <option value='--'>--</option>
          {this.state.itemToEditLoading ? (
            <option value='--'>--</option>
          ) : (
            this.state.menuItems.map((item, index) => (
              <option key={index} value={item.itemName}>
                {item.itemName}
              </option>
            ))
          )}
        </select>
        <select
          id='similar-select-2'
          className='similar-items-select'
          onChange={(e) => this.handleSimilarItemSelect(e, 2)}>
          <option value='--'>--</option>
          {this.state.itemToEditLoading ? (
            <option value='--'>--</option>
          ) : (
            this.state.menuItems.map((item, index) => (
              <option key={index} value={item.itemName}>
                {item.itemName}
              </option>
            ))
          )}
        </select>
      </div>
    );

    return (
      <div id='edit-widget'>
        <div className='edit-form-container'>
          <form className='edit-widget-form'>
            <div id='edit-name' className='edit-form-item'>
              <label htmlFor='edit-name'>Item Name</label>
              <input
                name='itemName'
                type='text'
                value={this.state.itemToEdit.itemName || ''}
                onChange={this.handleInputChange}
              />
            </div>

            <div id='edit-price' className='edit-form-item'>
              <label htmlFor='edit-price'>Item Price</label>
              <input
                name='itemPrice'
                type='number'
                value={this.state.itemToEdit.itemPrice || ''}
                onChange={this.handleInputChange}
              />
            </div>

            <div id='edit-cookTime' className='edit-form-item'>
              <label htmlFor='edit-cookTime'>Cook Time</label>
              <input
                name='cookTime'
                type='number'
                value={this.state.itemToEdit.cookTime || ''}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='vegan-special-container'>
              <div id='edit-vegan' className='edit-form-item'>
                <label htmlFor='edit-vegan'>Vegan?</label>
                <input
                  name='vegan'
                  type='checkbox'
                  checked={this.state.itemToEdit.vegan || false}
                  onChange={this.handleInputChange}
                />
              </div>

              <div id='edit-special' className='edit-form-item'>
                <label htmlFor='edit-special'>Special?</label>
                <input
                  name='special'
                  type='checkbox'
                  checked={this.state.itemToEdit.special || false}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div id='edit-itemDescription' className='edit-form-item'>
              <label htmlFor='edit-itemDescription'>Item Description</label>
              <textarea
                name='description'
                type='textarea'
                className='form-control'
                value={this.state.itemToEdit.description || ''}
                onChange={this.handleInputChange}
              />
            </div>

            <div
              id='edit-itemCategory'
              className='edit-form-select-div edit-form-item'>
              <label htmlFor='edit-itemCategory'>Item Category</label>
              {/* <small className='form-text text-muted'>
                Select a menu category
              </small> */}
              <div className='edit-itemCategory-select-div'>
                {this.state.categoryLoading ? (
                  <select id='select-id'>
                    <option value='--'>--</option>
                  </select>
                ) : (
                  <select
                    id='select-id'
                    onChange={(e) => this.handleCategorySelect(e)}>
                    {categoryDropdown}
                  </select>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className='edit-image-upload-container'>
          <div className='edit-photo'>
            <img
              src={this.state.itemToEdit.imageUrl}
              alt={this.state.itemToEdit.itemName}
            />
          </div>
          <div className='edit-image-button-div'>
            <button
              className='button upload-button'
              onClick={(e) => this.showWidget(e, this.widget)}>
              <i className='fas fa-cloud-upload-alt'></i> Edit Image
            </button>
          </div>
        </div>

        <div className='similar-items-container'>
          <div className='similar-items-title'>Edit Similar Items:</div>
          {similarItemsContainer}
        </div>

        <div className='edit-save-button-div'>
          <Modal
            className='edit-modal-div'
            title='Preview'
            text='Are you sure you want to update this item?'
            content={
              <MenuItem
                img={this.state.itemToEdit.imageUrl}
                name={this.state.itemToEdit.itemName}
                price={
                  this.state.itemToEdit.itemPrice
                    ? this.state.itemToEdit.itemPrice
                    : this.state.itemPrice
                }
              />
            }
            buttonClose={<button className='btn btn-primary'>Cancel</button>}
            buttonSave={
              <button
                type='submit'
                value='Send'
                className='btn'
                id='edit-form-submit-btn'
                onClick={(e) => this.saveMenuItem(e)}>
                Save
              </button>
            }>
            <button className='btn' onClick={this.displayItemToSubmit}>
              SAVE
            </button>
          </Modal>
        </div>

        <div className='buttonFromProps btn'>{this.props.closeButton}</div>
      </div>
    );
  }
}

export default EditWidget;
