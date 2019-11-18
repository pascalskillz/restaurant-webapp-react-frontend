import React, { Component } from 'react';
import '../../styles/Widgets.css'
import API from '../../utils/API';


class CreateWidget extends Component {

  state = {
    menuItems: [
      { id: 1, itemName: 'bread' },
      { id: 2, itemName: 'chicken' },
      { id: 3, itemName: 'rice' },
      { id: 4, itemName: 'fish' },
      { id: 5, itemName: 'peas' },
    ],
    matchArray: [],
    filterSimilar: '',
    
  }

  componentDidMount() {
    const similarSearch = document.getElementById('createFilterSimilar')
    similarSearch.addEventListener('keyup', this.displayMatches)
    this.fillMatchArray()
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  fillMatchArray = async() => {
    API
      .getAllMenuItems()
      .then( res => {
        let items = res.data
        this.setState({
          matchArray: [...items]
        })
      })
  }

  uploadImage = (resultEvent, widget) => {
    if(resultEvent.event === 'success'){
      // console.log(resultEvent.info.secure_url)
      let url = resultEvent.info.secure_url
      widget.close()
      this.setState({
        imageUrl: url
      })
    }
  }

  showWidget = (e, widget) => {
    e.preventDefault()
    widget.open()
  }

  findMatches = (userText) => {
    return this.state.menuItems.filter(items => {
      const regex = new RegExp(userText, 'gi');
      return items.itemName.match(regex)
    })
  }

  displayMatches = () => {
    const matchArray = this.findMatches(this.state.filterSimilar)
    console.log(this.state.filterSimilar)
    console.log(matchArray)
    this.setState({
      matchArray: [...matchArray]
    })
  }

  render() {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: 'yowats0n',
      uploadPreset: 'twibcpgv'
    },
    (error, result) => {
      if(error){
        console.log(error)
      }
      this.uploadImage(result, widget)
    })

    return (
      <div className="cpanel-create-div">
        <div className="create-form">

          <form>

            <div className="create-group1 flex-group">
              <div className="form-group create-group1a padding-group">
                <label htmlFor="itemName">Item Name</label>
                <input name="itemname" type="text" className="form-control" id="createItemName" aria-describedby="createItem" placeholder="Enter Item Name"/>
                <small id="createNameDesc" className="form-text text-muted">Enter the name for the menu item</small>
              </div>

              <div className="form-group create-group1b padding-group">
                <label htmlFor="itemPrice">Item Price</label>
                <input name="itemprice" type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="$"/>
                <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
              </div>
            </div>


            <div className="create-group2 flex-group">
              <div className="form-group create-group2a padding-group">
                <label htmlFor="cookTime">Cook Time</label>
                <input name="cooktime" type="number" className="form-control" id="createCookTime" aria-describedby="cookTime" placeholder="Minutes"/>
                <small id="createCooktimeDesc" className="form-text text-muted">Enter the cooking time for the menu item</small>
              </div>

              <div className="form-group create-group2b padding-group">
                <label htmlFor="itemPrice">Vegan?</label>
                <input name="isvegan" type="checkbox" className="form-control" id="createItemVegan" aria-describedby="createVegan"/>
                <small id="createVeganDesc" className="form-text text-muted">Is this menu item vegan?</small>
              </div>
            </div>

            <div className="create-group3 flex-group">
              <div className="form-group create-group3a padding-group">
                <label htmlFor="itemDescription">Item Description</label>
                <textarea name="itemdescription" type="textarea" className="form-control" id="createItemDescription" aria-describedby="itemDesc" placeholder="Enter Description"/>
                <small id="createDescriptionDesc" className="form-text text-muted">Enter a description for the menu item</small>
              </div>
            </div>


            <div className="create-group3 flex-group">
              <label htmlFor="itemImage">Upload an Image</label>
              <button className='button upload-button' onClick={(e) => this.showWidget(e, widget)}><i className='fas fa-cloud-upload-alt'></i> Upload Image(s)</button>
              <small id="createImageDesc" className="form-text text-muted">Upload an image for the menu item</small>
            </div>
            
            <br/>

            <div className="create-group4 flex-group">
              <label htmlFor="itemSimilar">Similar Items</label>
              <small id="createSimilarDesc" className="form-text text-muted">Select all similar items, search for items below</small>
              <input name="filterSimilar" type="text" className="form-control" id="createFilterSimilar" aria-describedby="filterSimilar" placeholder="Search Item Name" 
                value={this.state.filterSimilar} onChange={this.handleInputChange}/>
              <div className="table-scroll">
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Similar?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.matchArray.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.id}</th>
                          <td>{item.itemName}</td>
                          <td><input id={`similarId=${item.id}`} name="issimilar" type="checkbox" className="form-control create-item-similar" aria-describedby="createSimilar" onClick={(e) => console.log(e.target)}/></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

    
            

          </form>

        </div>

        <div className="create-form-submit">
          <button type="submit" value="Send" className="btn btn-green" id="create-form-submit-btn">
            Save
          </button>
        </div>

      </div>
    );
  }
}

export default CreateWidget;