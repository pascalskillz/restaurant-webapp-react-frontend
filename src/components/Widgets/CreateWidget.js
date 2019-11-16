import React, { Component } from 'react';

class CreateWidget extends Component {
  render() {
    return (
      <div>
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


          <button type="submit" value="Send" className="btn btn-dark">
            Save
          </button>

        </form>

      </div>
    );
  }
}

export default CreateWidget;