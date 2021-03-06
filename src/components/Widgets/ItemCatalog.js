import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import Modal from '../Modal';
import MenuItem from '../MenuItem';
import EditWidget from './EditWidget';
import API from '../../utils/API';
import img from '../../img/Logo2.png';

class ItemCatalog extends Component {
  state = {
    // filterItemCatalog: '',
    searchBar: '',
    menuItemsLoading: true,
    menuItems: [],
    displayItemToEdit: false,
    itemToEditId: -1,
    categories: [],
    categoryLoading: true,
    newMenuItem: {
      cookTime: '',
      description: '',
      imageUrl:
        'https://res.cloudinary.com/yowats0n/image/upload/v1586801348/tandoor/ywuvwxjovuoypiffnrwp.jpg',
      itemName: 'Tandoor India',
      itemPrice: '',
      special: false,
      vegan: false,
      similarItems: [],
      // similarItems: [
      //   { similarMenuItemId: 0 },
      //   { similarMenuItemId: 0 },
      //   { similarMenuItemId: 0 },
      // ],
      categoryId: 1,
    },
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    totalElements: 0,
    allMenuItems: [],
    filterView: false,
    filterParam: '',
    filteredItems: [],
  };

  componentDidMount() {
    this.getAllItems(this.state.currentPage);
    this.getCategories();
    this.getAllItemsOnPageLoad();
    console.log(`page:${this.state.currentPage}`);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      newMenuItem: {
        ...prevState.newMenuItem,
        [name]: value,
      },
    }));

    console.log(this.state.newMenuItem);
  };

  handleSearchBarChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleCategorySelect = async (event) => {
    await event.persist();
    await console.log('------------ handleCategorySelect');
    await console.log(event.target.value);

    let newCategoryObject = await this.state.categories.filter((item) => {
      return item.categoryName === event.target.value;
    });

    await console.log(newCategoryObject[0].id);

    await this.setState((prevState) => ({
      newMenuItem: {
        ...prevState.newMenuItem,
        categoryId: newCategoryObject[0].id,
      },
    }));

    await console.log(this.state.newMenuItem);
  };

  // Image Handling
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

  uploadImage = (resultEvent, widget) => {
    if (resultEvent.event === 'success') {
      let url = resultEvent.info.secure_url;
      widget.close();
      this.setState((prevState) => ({
        newMenuItem: {
          ...prevState.newMenuItem,
          // categoryId: newCategoryObject[0].id
          imageUrl: url,
        },
      }));
    }
  };

  showWidget = (e, widget) => {
    e.preventDefault();
    widget.open();
  };

  getAllItemsOnPageLoad = async () => {
    let allMenuItems = [];
    await API.getAllMenuItems(1, 2000).then((res) => {
      let items = res.data.content;
      allMenuItems = [...items];
    });
    await this.setState({
      allMenuItems: allMenuItems,
    });
  };

  getAllItems = async (currentPage) => {
    let allItemsArr = [];
    let pageNum = 0;
    let totalPages = 0;
    let totalElements = 0;
    await API.getAllMenuItems(currentPage, this.state.itemsPerPage).then(
      (res) => {
        let items = res.data.content;
        console.log(res.data);
        // console.log(items)
        allItemsArr = [...items];
        pageNum = res.data.number + 1;
        totalPages = res.data.totalPages;
        totalElements = res.totalElements;
      }
    );

    await this.setState({
      menuItems: [...allItemsArr],
      menuItemsLoading: false,
      currentPage: pageNum,
      totalPages: totalPages,
      totalElements: totalElements,
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

  createNewMenuItem = async (e) => {
    e.preventDefault();
    const submitData = await {
      itemName: this.state.newMenuItem.itemName,
      itemPrice: this.state.newMenuItem.itemPrice,
      cookTime: this.state.newMenuItem.cookTime,
      description: this.state.newMenuItem.description,
      vegan: this.state.newMenuItem.vegan,
      special: this.state.newMenuItem.special,
      imageUrl: this.state.newMenuItem.imageUrl,
      similarItems: this.state.newMenuItem.similarItems,
    };
    await console.log('--newMenuItem');
    await console.log(this.state.newMenuItem);
    await console.log('--submitData');
    await console.log(submitData);
    await API.createMenuItem(this.state.newMenuItem.categoryId, submitData)
      .then((res) => {
        if (res.status === 200) {
          alert('Success!');
          console.log(res);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('Data not saved, please try again');
        console.log(err);
        window.location.reload();
      });
  };

  editMenuItem = async (id) => {
    console.log(id);
    console.log('Edit Menu Item');
    this.setState({
      displayItemToEdit: true,
      itemToEditID: id,
    });
  };

  completeEdit = () => {
    this.setState({
      displayItemToEdit: false,
    });
  };

  deleteMenuItem = async (id) => {
    await console.log('Delete Menu Item');
    await console.log(id);
    await API.deleteMenuItem(id)
      .then((res) => {
        if (res.status === 200) {
          alert('Success!');
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('Item not deleted, please try again');
        console.log(err);
      });
  };

  // handleSimilarItemSelect = async (e, id) => {
  //   e.persist();
  //   await console.log('--handleSimilarItemSelect');
  //   await console.log(this.state.newMenuItem.similarItems);
  //   let localItemName = await e.target.value;
  //   let newSimilarItemList = await [...this.state.newMenuItem.similarItems];
  //   await console.log(newSimilarItemList);
  //   if (localItemName !== '--') {
  //     let itemToBeAddedToSimilarList = await this.state.menuItems.filter(
  //       (item) => {
  //         return item.itemName === localItemName;
  //       }
  //     );
  //     await console.log('itemToBeAddedToSimilarList');
  //     await console.log(itemToBeAddedToSimilarList);
  //     newSimilarItemList[id] = await {
  //       similarMenuItemId: itemToBeAddedToSimilarList[0].id,
  //     };
  //     await this.setState((prevState) => ({
  //       newMenuItem: {
  //         ...prevState.newMenuItem,
  //         similarItems: [...newSimilarItemList],
  //       },
  //     }));
  //   }
  //   await console.log('newSimilarList afterwards');
  //   await console.log(newSimilarItemList);
  // };

  handleSimilarItemSelect = async (e, id) => {
    e.persist();
    await console.log('--handleSimilarItemSelect');
    await console.log(this.state.newMenuItem.similarItems);
    let localItemName = await e.target.value;
    let newSimilarItemList = [];
    if (this.state.newMenuItem.similarItems.length === 0) {
      newSimilarItemList = [{}];
    } else if (this.state.newMenuItem.similarItems.length === 1) {
      newSimilarItemList = await [
        this.state.newMenuItem.similarItems[0],
      ];
    } else if (this.state.newMenuItem.similarItems.length === 2) {
      newSimilarItemList = await [
        this.state.newMenuItem.similarItems[0],
        this.state.newMenuItem.similarItems[1],
      ];
    } else if (this.state.newMenuItem.similarItems.length === 3) {
      newSimilarItemList = await [
        this.state.newMenuItem.similarItems[0],
        this.state.newMenuItem.similarItems[1],
        this.state.newMenuItem.similarItems[2],
      ];
    }

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
        newMenuItem: {
          ...prevState.newMenuItem,
          similarItems: [...newSimilarItemList],
        },
      }));
    }
    await console.log('newSimilarList afterwards');
    await console.log(newSimilarItemList);
  };

  handleFirst = () => {
    if (this.state.currentPage > 1) {
      this.getAllItems(1);
    }
  };
  handleNext = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.getAllItems(this.state.currentPage + 1);
    }
  };

  handlePrev = () => {
    if (this.state.currentPage > 1) {
      this.getAllItems(this.state.currentPage - 1);
    }
  };
  handleLast = () => {
    if (this.state.currentPage != this.state.totalPages) {
      this.getAllItems(this.state.totalPages);
    }
  };

  handleSearchBarSubmit = async (e) => {
    e.preventDefault();
    await console.log('Search Submitted');

    await this.setState({
      filterView: true,
      filterParam: this.state.searchBar,
    });
  };

  handleSearchBarCompleted = async () => {
    this.getAllItems(1);
    this.setState({
      filterView: false,
      filterParam: '',
      searchBar: '',
    });
  };

  render() {
    const filterList = this.state.allMenuItems
      .filter((item) => {
        return (
          item.itemName
            .toLowerCase()
            .indexOf(this.state.searchBar.toLowerCase()) >= 0
        );
      })
      .map((item, index) => (
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
              content={
                <MenuItem
                  img={item.imageUrl}
                  name={item.itemName}
                  price={item.itemPrice}
                />
              }
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
                  onClick={() => this.deleteMenuItem(item.id)}>
                  Delete
                </button>
              }>
              <a className='btn btn-danger catalog-item-delete-button'>
                Delete
              </a>
            </Modal>
          </td>
        </tr>
      ));

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
            content={
              <MenuItem
                img={item.imageUrl}
                name={item.itemName}
                price={item.itemPrice}
              />
            }
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
                onClick={() => this.deleteMenuItem(item.id)}>
                Delete
              </button>
            }>
            <a className='btn btn-danger catalog-item-delete-button'>Delete</a>
          </Modal>
        </td>
      </tr>
    ));

    const similarItemsContainer = (
      <div className='similar-items-div'>
        <select
          className='similar-items-select'
          onChange={(e) => this.handleSimilarItemSelect(e, 0)}>
          <option value='--'>--</option>
          {this.state.menuItemsLoading ? (
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
          className='similar-items-select'
          onChange={(e) => this.handleSimilarItemSelect(e, 1)}>
          <option value='--'>--</option>
          {this.state.menuItemsLoading ? (
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
          className='similar-items-select'
          onChange={(e) => this.handleSimilarItemSelect(e, 2)}>
          <option value='--'>--</option>
          {this.state.menuItemsLoading ? (
            <option value='--'>--</option>
          ) : (
            // <option value="--">--</option>
            this.state.menuItems.map((item, index) => (
              <option key={index} value={item.itemName}>
                {item.itemName}
              </option>
            ))
          )}
        </select>
      </div>
    );

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
                    onChange={(e) => this.handleCategorySelect(e)}>
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
              onClick={(e) => this.showWidget(e, this.widget)}>
              <i className='fas fa-cloud-upload-alt'></i> Upload an Image
            </button>
          </div>
        </div>

        <div className='similar-items-container'>
          <div className='similar-items-title'>Select Three Similar Items:</div>
          {similarItemsContainer}
        </div>
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
                    <form onSubmit={(e) => this.handleSearchBarSubmit(e)}>
                      <input
                        name='searchBar'
                        type='text'
                        className='form-control'
                        id='searchBar'
                        // aria-describedby='createItem'
                        placeholder='Search for a Menu Item'
                        value={this.state.searchBar}
                        onChange={this.handleSearchBarChange}
                      />
                    </form>
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
                      onClick={(e) => this.handleSearchBarSubmit(e)}>
                      <path
                        fill='currentColor'
                        d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'
                        class=''></path>
                    </svg>
                  </div>
                </div>
                <div className='all-items-button-div'>
                  {this.state.filterView ? (
                    <a
                      className='btn btn-primary catalog-item-edit-button'
                      onClick={() => this.handleSearchBarCompleted()}>
                      BACK
                    </a>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className='new-item-button-div'>
                  {this.state.currentPage === 1 ? (
                    <Modal
                      className='new-item-modal-div'
                      title='New Menu Item'
                      customStyle={{
                        content: {
                          position: 'absolute',
                          height: '80vh',
                          width: 675,
                          margin: 'auto',
                        },
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
                          onClick={(e) => this.createNewMenuItem(e)}>
                          Save
                        </button>
                      }>
                      <button className='btn btn-warning new-item-button'>
                        New Menu Item
                      </button>
                    </Modal>
                  ) : (
                    <div className='new-item-modal-div'>
                      <a
                        className='btn btn-primary catalog-item-edit-button'
                        onClick={() => this.handleFirst()}>
                        BACK
                      </a>
                    </div>
                  )}
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
                    ) : !this.state.filterView ? (
                      allItemsList
                    ) : (
                      filterList
                    )}
                  </tbody>
                </table>
              </div>
              <div className='catalog-pagination'>
                <div className='catalog-pagination-left'>
                  Showing {this.state.currentPage} of {this.state.totalPages}{' '}
                  Pages
                </div>
                <div className='catalog-pagination-right'>
                  <Pagination>
                    <Pagination.First onClick={() => this.handleFirst()} />
                    <Pagination.Prev onClick={() => this.handlePrev()} />
                    <Pagination.Next onClick={() => this.handleNext()} />
                    <Pagination.Last onClick={() => this.handleLast()} />
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ItemCatalog;
