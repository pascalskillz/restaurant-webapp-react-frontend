import React, { Component } from 'react';
import Modal from '../Modal';
import MenuItem from '../MenuItem';
import EditWidget from './EditWidget';
import API from '../../utils/API';
import img from '../../img/Logo2.png';

class ItemCatalog extends Component {
  state = {
    filterItemCatalog: '',
    menuItemsLoading: true,
    menuItems: [],
    displayItemToEdit: false,
    itemToEditId: -1,
    categories: [],
    categoryLoading: true,
    newMenuItem: {}
  };

  componentDidMount() {
    this.getAllItems();
    this.getCategories();
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      newMenuItem: {
        ...prevState.newMenuItem,
        [name]: value
      }
    }));

    console.log(this.state.newMenuItem);
  };

  handleCategorySelect = async event => {
    console.log('------------ handleCategorySelect');
    console.log(event.target.value);

    let newCategoryObject = await this.state.categories.filter(item => {
      return item.categoryName === event.target.value;
    });

    await console.log(newCategoryObject[0].id);

    await this.setState(prevState => ({
      newMenuItem: {
        ...prevState.newMenuItem,
        categoryId: newCategoryObject[0].id
      }
    }));

    await console.log(this.state.newMenuItem);
  };

  // Image Handling
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
      this.setState(prevState => ({
        newMenuItem: {
          ...prevState.newMenuItem,
          // categoryId: newCategoryObject[0].id
          imageUrl: url
        }
      }));
    }
  };

  showWidget = (e, widget) => {
    e.preventDefault();
    widget.open();
  };

  getAllItems = async () => {
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
    let categoriesObject = {};
    await API.getCategories().then(res => {
      console.log('---------getCategories');
      console.log(res.data);
      categoriesObject = res.data;
    });

    await this.setState({
      categories: categoriesObject,
      categoryLoading: false
    });
  };

  createNewMenuItem = async e => {
    e.preventDefault();
    await console.log(this.state.newMenuItem);
    await API.createMenuItem(this.state.newMenuItem.categoryId, {
      itemName: this.state.itemname,
      itemPrice: this.state.itemprice,
      cookTime: this.state.cooktime,
      description: this.state.itemdescription,
      vegan: this.state.isvegan,
      special: this.state.isspecial,
      imageUrl: this.state.imageUrl,
      similarItems: this.state.similarList
    })
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
    // await e.preventDefault();
    // await console.log(this.state.newMenuItem);
    // const submitData = await {
    //   itemName: this.state.newMenuItem.itemname,
    //   itemPrice: this.state.newMenuItem.itemprice,
    //   cookTime: this.state.newMenuItem.cooktime,
    //   description: this.state.newMenuItem.itemdescription,
    //   vegan: this.state.newMenuItem.isvegan,
    //   special: this.state.newMenuItem.isspecial,
    //   imageUrl: this.state.newMenuItem.imageUrl,
    //   similarItems: this.state.newMenuItem.similarList
    // };

    // await console.log(submitData);
    // await API.createMenuItem(this.state.selectedId, submitData)
    //   .then(res => {
    //     if (res.status === 200) {
    //       alert('Success!');
    //       // TODO: RESET EVERYTHING
    //       window.location.reload();
    //     }
    //   })
    //   .catch(err => {
    //     alert('Data not saved, please try again');
    //     // TODO: RESET EVERYTHING
    //   });
  };

  editMenuItem = async id => {
    console.log(id);
    console.log('Edit Menu Item');
    this.setState({
      displayItemToEdit: true,
      itemToEditID: id
    });
  };

  completeEdit = () => {
    this.setState({
      displayItemToEdit: false
    });
  };

  deleteMenuItem = async id => {
    console.log(id);
    console.log('Delete Menu Item');
    this.setState({
      displayItemToDelete: true
    });
  };

  render() {
    // const filterList = this.state.menuItems
    //   .filter(item => {
    //     return (
    //       item.itemName
    //         .toLowerCase()
    //         .indexOf(this.state.filterItemCatalog.toLowerCase()) >= 0
    //     );
    //   })
    //   .map((item, index) => (
    //     <tr key={index}>
    //       <th scope='row'>{item.id}</th>
    //       <td
    //         onClick={() => this.selectItemForEdit(item.id)}
    //         className='catalog-item-name'>
    //         {item.itemName}
    //       </td>
    //       <td>
    //         <img
    //           style={{ width: 60 }}
    //           className='img-thumbnail'
    //           src={item.imageUrl}
    //         />
    //       </td>
    //       <td
    //         onClick={() => this.selectItemForEdit(item.id)}
    //         className='catalog-item-edit-button'>
    //         <a className='btn btn-primary'>Edit</a>
    //       </td>
    //       <td
    //         // onClick={() => this.selectItemForEdit(item.id)}
    //         className='catalog-item-delete-button'>
    //         <a className='btn btn-primary'>Delete</a>
    //       </td>
    //     </tr>
    //   ));

    const allItemsList = this.state.menuItems.map((item, index) => (
      <tr key={index}>
        <td scope='row'>{item.id}</td>
        <td className='catalog-item-name'>{item.itemName}</td>
        <td>
          <img
            style={{ width: 60 }}
            className='img-thumbnail'
            src={item.imageUrl}
          />
        </td>
        <td>
          <a
            className='btn btn-primary catalog-item-edit-button'
            onClick={() => this.editMenuItem(item.id)}>
            Edit
          </a>
        </td>
        <td>
          <Modal
            className='delete-modal-div'
            title='Preview'
            text='Are you sure you want to delete this item?'
            content={<MenuItem img={img} name='item' price='5' />}
            buttonClose={
              <button className='btn btn-warning catalog-item-cancel-button'>
                Cancel
              </button>
            }
            buttonSave={
              <button
                type='submit'
                value='Send'
                className='btn btn-primary catalog-item-delete-button'
                // id='catalog-item-delete-button'
                onClick={e => this.deleteMenuItem(e)}>
                Delete
              </button>
            }>
            <a className='btn btn-danger catalog-item-delete-button'>Delete</a>
          </Modal>
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
            {/* {item.categoryName.split(' ')[0]} */}
            {item.categoryName}
          </option>
        ))
    );

    const createWidget = (
      <div id='create-widget'>
        <div className='newItem-form-container'>
          <form className='newItem-widget-form'>
            <div id='newItem-name' className='newItem-form-item'>
              <label htmlFor='newItem-name'>Item Name</label>
              <input
                name='itemName'
                type='text'
                value={this.state.newMenuItem.itemName}
                onChange={this.handleInputChange}
              />
            </div>

            <div id='newItem-price' className='newItem-form-item'>
              <label htmlFor='newItem-price'>Item Price</label>
              <input
                name='itemPrice'
                type='number'
                value={this.state.newMenuItem.itemPrice}
                onChange={this.handleInputChange}
              />
            </div>

            <div id='newItem-cookTime' className='newItem-form-item'>
              <label htmlFor='newItem-cookTime'>Cook Time</label>
              <input
                name='cookTime'
                type='number'
                value={this.state.newMenuItem.cookTime}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='newItem-vegan-special-container'>
              <div id='newItem-vegan' className='newItem-form-item'>
                <label htmlFor='newItem-vegan'>Vegan?</label>
                <input
                  name='vegan'
                  type='checkbox'
                  checked={this.state.newMenuItem.vegan}
                  onChange={this.handleInputChange}
                />
              </div>

              <div id='newItem-special' className='newItem-form-item'>
                <label htmlFor='newItem-special'>Special?</label>
                <input
                  name='special'
                  type='checkbox'
                  checked={this.state.newMenuItem.special}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div id='newItem-itemDescription' className='newItem-form-item'>
              <label htmlFor='newItem-itemDescription'>Item Description</label>
              <textarea
                name='description'
                type='textarea'
                className='form-control'
                value={this.state.newMenuItem.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div
              id='newItem-itemCategory'
              className='newItem-form-select-div newItem-form-item'>
              <label htmlFor='newItem-itemCategory'>Item Category</label>
              <div className='newItem-itemCategory-select-div'>
                {this.state.categoryLoading ? (
                  <select id='select-id'>
                    <option value='--'>--</option>
                  </select>
                ) : (
                  <select
                    id='select-id'
                    onChange={e => this.handleCategorySelect(e)}>
                    {categoryDropdown}
                  </select>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className='newItem-image-upload-container'>
          {/* <div className='newItem-photo'>
            <img
              src={this.state.itemTonewItem.imageUrl}
              alt={this.state.itemTonewItem.itemName}
            />
          </div> */}
          <div className='newItem-image-button-div'>
            <button
              className='button upload-button'
              onClick={e => this.showWidget(e, this.widget)}>
              <i className='fas fa-cloud-upload-alt'></i> Upload an Image
            </button>
          </div>
        </div>

        <div className='similar-items-container'>Similar Items</div>
      </div>
    );

    return (
      <div className='item-catalog-div'>
        {this.state.displayItemToEdit ? (
          <div className='individual-item'>
            <EditWidget
              itemNum={this.state.itemToEditID}
              closeButton={
                <div
                  id='close-button-back-button'
                  onClick={() => this.completeEdit()}>
                  <i className='fas fa-arrow-left'></i> BACK
                </div>
              }
            />
          </div>
        ) : (
          <div className='item-catalog-dropdown'>
            <div className='select-item-div'>
              {/* SEARCH BAR */}
              <div className='search-bar-button-div'>
                <div className='search-bar'>
                  <div className='search-bar-contents'>
                    <input
                      name='itemname'
                      type='text'
                      className='form-control'
                      id='searchBar'
                      aria-describedby='createItem'
                      placeholder='Search for a Menu Item'
                      value={this.state.itemname}
                      onChange={this.handleInputChange}
                    />
                    <svg
                      id='searchIcon'
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='search'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                      className='svg-inline--fa fa-search fa-w-16 fa-fw'
                      onClick={() => console.log('SEARCH BAR')}>
                      <path
                        fill='currentColor'
                        d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'
                        class=''></path>
                    </svg>
                  </div>
                </div>
                <div className='new-item-button-div'>
                  <Modal
                    className='new-item-modal-div'
                    title='New Menu Item'
                    customStyle={{
                      content: {
                        position: 'absolute',
                        height: '80vh',
                        width: 675,
                        margin: 'auto'
                      }
                    }}
                    // text=''
                    content={createWidget}
                    buttonClose={
                      <button className='btn btn-warning catalog-item-cancel-button'>
                        Cancel
                      </button>
                    }
                    buttonSave={
                      <button
                        type='submit'
                        value='Send'
                        className='btn btn-primary new-item-save-button mx-3'
                        // id='catalog-item-delete-button'
                        onClick={e => this.createNewMenuItem(e)}>
                        Save
                      </button>
                    }>
                    <button className='btn btn-warning new-item-button'>
                      New Menu Item
                    </button>
                  </Modal>
                </div>
              </div>
              <div className='table-scroll edit-table'>
                <table className='table table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Item Name</th>
                      <th scope='col'>Image</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.menuItemsLoading ? (
                      <tr>
                        <td scope='row'>-</td>
                        <td>Loading...</td>
                        <td> </td>
                        <td> </td>
                      </tr>
                    ) : (
                      allItemsList
                    )}

                    {/* if the filter bar is empty
                    {this.state.filterItemCatalog.length < 1 ? (
                      // display the all items once loaded

                    ) : (
                      // else display filtered items
                      // filterList
                      <div className=''>filterList</div>
                    )} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ItemCatalog;
