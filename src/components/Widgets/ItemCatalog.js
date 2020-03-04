import React, { Component } from 'react';
import Modal from '../Modal';
import MenuItem from '../MenuItem';
import API from '../../utils/API';
import img from '../../img/Logo2.png';

class ItemCatalog extends Component {
  state = {
    filterItemCatalog: '',
    menuItemsLoading: true,
    menuItems: [],
    displayItemToDelete: false,
    displayItemToEdit: false
  };

  componentDidMount() {
    this.getAllItems();
  }

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

  editMenuItem = async id => {
    console.log(id);
    console.log('Edit Menu Item');
    this.setState({
      displayItemToEdit: true
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

    return (
      <div className='item-catalog-div'>
        {this.state.displayItemToEdit ? (
          <div className='individual-item'>
            EDIT ME
            <button onClick={() => this.completeEdit()}>DONE</button>
          </div>
        ) : (
          <div className='item-catalog-dropdown'>
            <div className='select-item-div'>
              {/* ADD SEARCH BAR */}
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
                    {/* if the filter bar is empty */}
                    {this.state.filterItemCatalog.length < 1 ? (
                      // display the all items once loaded
                      this.state.menuItemsLoading ? (
                        <tr>
                          <td scope='row'>-</td>
                          <td>Loading...</td>
                          <td> </td>
                          <td> </td>
                        </tr>
                      ) : (
                        allItemsList
                      )
                    ) : (
                      // else display filtered items
                      // filterList
                      <div className=''>filterList</div>
                    )}
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
