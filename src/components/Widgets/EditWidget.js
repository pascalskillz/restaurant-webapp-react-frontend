import React, { Component } from 'react';

class EditWidget extends Component {
  render() {
    return (
      <div className="cpanel-edit-div">

      <div className="edit-image">
        IMAGE
      </div>

      <div className="edit-form">
        <div className="edit-form-left">
          <form>

            <div className="form-group">
              <label htmlFor="itemName">Item Name</label>
              <input type="text" className="form-control" id="createItemName" aria-describedby="createItem" placeholder="Enter Item Name"/>
              <small id="createNameDesc" className="form-text text-muted">Enter the name for the menu item</small>
            </div>

            <br/>

            <div className="form-group">
              <label htmlFor="itemPrice">Item Price</label>
              <input type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="Enter Item Price"/>
              <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
            </div>

            <br/>

            <div className="form-group">
              <label htmlFor="itemPrice">Cook Time</label>
              <input type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="Enter Item Price"/>
              <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
            </div>

          </form>
        </div>
        <div className="edit-form-right">
          <form>

            <div className="form-group">
              <label htmlFor="itemPrice">Item Description</label>
              <input type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="Enter Item Price"/>
              <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
            </div>

            <br/>

            <div className="form-group">
              <label htmlFor="itemPrice">Select an Image</label>
              <input type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="Enter Item Price"/>
              <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
            </div>

            <br/>

            <div className="form-group">
              <label htmlFor="itemPrice">Similar Items</label>
              <input type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="Enter Item Price"/>
              <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
            </div>

            <br/>

            <div className="form-group">
              <label htmlFor="itemPrice">Vegan?</label>
              <input type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="Enter Item Price"/>
              <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
            </div>

          </form>

        </div>

        <div className="edit-form-submit">
          <button type="submit" value="Send" className="btn btn-dark">
            Save
          </button>
        </div>

      </div>

      </div>
    );
  }
}

export default EditWidget;