import React, { Component } from 'react';
import '../../styles/Widgets.css'
import API from '../../utils/API';


class CreateWidget extends Component {

  state = {
    menuItems: [],
    filterSimilar: '',
    menuItemsLoading: true,
    
    itemname: '',
    itemprice: '',
    cooktime: '',
    itemdescription: '',
    isvegan: false,
    isspecial: false,
    itemimage: '',
    similarList: [],
    imageUrl: '',

  }

  componentDidMount() {
    // const similarSearch = document.getElementById('createFilterSimilar')
    // similarSearch.addEventListener('keyup', this.displayMatches)
    // this.fillMatchArray()
    this.gatherAllItems()
  }

  widget = window.cloudinary.createUploadWidget({
    cloudName: 'yowats0n',
    uploadPreset: 'twibcpgv'
  },
  (error, result) => {
    if(error){
      console.log(error)
    }
    this.uploadImage(result, this.widget)
  })


  handleInputChange = event => {
    // event.preventDefault()
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  gatherAllItems = async() => {
    let allItemsArr = []
    await API
      .getAllMenuItems()
      .then( res => {
        let items = res.data
        // console.log(items)
        allItemsArr = [...items]
      })
    
    await this.setState({
      menuItems: [...allItemsArr],
      menuItemsLoading: false,
    })
    // await console.log('Menu Items')
    // await console.log(this.state.menuItems)
  }

  uploadImage = (resultEvent, widget) => {
    if(resultEvent.event === 'success'){
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

  // THESE WORK BUT ARE SLOW

  // findMatches = (userText) => {
  //   return this.state.menuItems.filter(items => {
  //     const regex = new RegExp(userText, 'gi');
  //     return items.itemName.match(regex)
  //   })
  // }

  // displayMatches = () => {
  //   const matchArray = this.findMatches(this.state.filterSimilar)
  //   console.log(this.state.filterSimilar)
  //   console.log(matchArray)
  //   this.setState({
  //     matchArray: [...matchArray]
  //   })
  // }

  addToSimilar = (e) => {
    e.preventDefault()
    if (!this.state.similarList.includes(e.target.id)){
      this.setState({
        similarList: [...this.state.similarList, e.target.id]
      })
    }
    else {
      console.log('ALREADY EXISTS')
    }
  }

  deleteFromSimilar = async(e) => {
    e.preventDefault()
    console.log(e.target.id)
    const deleteFilter = await this.state.similarList.filter(item  => {
      return item.split('=')[1] !== e.target.id.split('=')[1]
    })
    await this.setState({
      similarList: [...deleteFilter]
    })
    await console.log(this.state.similarList)
  }

  submitForm = async(e) => {
    e.preventDefault()
    const submitData = {
      itemName: this.state.itemname,
      itemPrice: this.state.itemprice,
      cookTime: this.state.cooktime,
      description: this.state.itemdescription,
      vegan: this.state.isvegan,
      special: this.state.isspecial,
      imageUrl: this.state.imageUrl,
    }

    await API
      .createMenuItem(3, submitData)
      .then(res => {
        if(res.status === 200){
          alert("Success!")
        }
      })
      .catch(err => {
        alert("Data not saved, please try again")
      })
  }

  render() {

    const filterList = this.state.menuItems.filter(item => {
      return item.itemName.toLowerCase().indexOf(this.state.filterSimilar.toLowerCase()) >= 0
    })
    .map((item, index) => (
      <tr key={index}>
        <th scope="row">{item.id}</th>
        <td>{item.itemName}</td>
        <td><button id={`similarId=${item.id}`} name="issimilar" className="btn create-item-similar" onClick={(e) => this.addToSimilar(e)}>ADD</button></td>
      </tr>
      )
    )

    const allItemsList = this.state.menuItems.map((item, index) => (
      <tr key={index}>
        <th scope="row">{item.id}</th>
        <td>{item.itemName}</td>
        <td><button id={`similarId=${item.id}`} name="issimilar" className="btn create-item-similar" onClick={(e) => this.addToSimilar(e)}>ADD</button></td>
      </tr>
    ))

    const similarList = this.state.similarList.map((item, index) => (
      <div key={index} className="similar-confirm">
        {item}
        <button id={`deleteId=${item.split('=')[1]}`} className="btn similar-delete-button" onClick={(e) => this.deleteFromSimilar(e)}>X</button>
      </div>
    ))

    return (
      <div className="cpanel-create-div">
        <div className="create-form">

          <form className="create-inner-form">
            <div className="form-grid-group">
              <div className="create-group1 flex-group">
                <div className="form-group create-group1a padding-group">
                  <label htmlFor="itemName">Item Name</label>
                  <input name="itemname" type="text" className="form-control" id="createItemName" aria-describedby="createItem" placeholder="Enter Item Name"
                  value={this.state.itemname} onChange={this.handleInputChange}
                  />
                  <small id="createNameDesc" className="form-text text-muted">Enter the name for the menu item</small>
                </div>

                <div className="form-group create-group1b padding-group">
                  <label htmlFor="itemPrice">Item Price</label>
                  <input name="itemprice" type="number" className="form-control" id="createItemPrice" aria-describedby="createItem" placeholder="$"
                  value={this.state.itemprice} onChange={this.handleInputChange}
                  />
                  <small id="createPriceDesc" className="form-text text-muted">Enter the price for the menu item</small>
                </div>
              {/* </div> */}

              {/* <div className="create-group2 flex-group"> */}
                <div className="form-group create-group2a padding-group">
                  <label htmlFor="cookTime">Cook Time</label>
                  <input name="cooktime" type="number" className="form-control" id="createCookTime" aria-describedby="cookTime" placeholder="Minutes"
                  value={this.state.cooktime} onChange={this.handleInputChange}
                  />
                  <small id="createCooktimeDesc" className="form-text text-muted">Enter the cooking time for the menu item</small>
                </div>

                <div className="radio-div">
                  <div className="form-group create-group2b radio-group">
                    <label htmlFor="itemPrice">Vegan?</label>
                    <input name="isvegan" type="checkbox" className="form-control" id="createItemVegan" aria-describedby="createVegan" 
                    checked={this.state.isvegan} onChange={this.handleInputChange}
                    />
                    <small id="createVeganDesc" className="form-text text-muted">Is this menu item vegan?</small>
                  </div>

                  <div className="form-group create-group2b radio-group">
                    <label htmlFor="itemPrice">Special?</label>
                    <input name="isspecial" type="checkbox" className="form-control" id="createItemSpecial" aria-describedby="createSpecial" 
                    checked={this.state.isspecial} onChange={this.handleInputChange}
                    />
                    <small id="createVeganDesc" className="form-text text-muted">Is this a special menu item?</small>
                  </div>
                </div>

              </div>

              <div className="create-group3 flex-group">
                <div className="form-group create-group3a padding-group">
                  <label htmlFor="itemDescription">Item Description</label>
                  <textarea name="itemdescription" type="textarea" className="form-control" id="createItemDescription" aria-describedby="itemDesc" placeholder="Enter Description"
                  value={this.state.itemdescription} onChange={this.handleInputChange}
                  />
                  <small id="createDescriptionDesc" className="form-text text-muted">Enter a description for the menu item</small>
                </div>
              </div>
            </div>


            <div className="create-group4 flex-group">
              <label htmlFor="itemImage">Upload an Image</label>
              <button className='button upload-button' onClick={(e) => this.showWidget(e, this.widget)}><i className='fas fa-cloud-upload-alt'></i> Upload Image(s)</button>
              <small id="createImageDesc" className="form-text text-muted">Upload an image for the menu item</small>
            </div>

            <div className="create-group5">

              <div className="similar-items-div">
                <label htmlFor="itemSimilar">Similar Items</label>
                <small id="createSimilarDesc" className="form-text text-muted">Select all similar items, search for items below</small>
                <input name="filterSimilar" type="text" className="form-control" id="createFilterSimilar" aria-describedby="filterSimilar" placeholder="Search Item Name" value={this.state.filterSimilar} onChange={this.handleInputChange}/>
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
                      {/* THIS WORKS BUT IT IS SLOW AF */}

                      {/* {
                        this.state.matchArray.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.itemName}</td>
                            <td><input id={`similarId=${item.id}`} name="issimilar" type="checkbox" className="form-control create-item-similar" aria-describedby="createSimilar" onClick={(e) => console.log(e.target)}/></td>
                          </tr>
                        ))
                      } */}

                      {/* USE THIS INSTEAD */}

                      {
                        // if the filter bar is empty
                        this.state.filterSimilar.length < 1
                        ?
                          // display the all items once loaded
                          !this.state.menuItemsLoading
                          ?
                            allItemsList 
                          :
                            <tr>
                              <th scope="row">0</th>
                              <td>Loading...</td>
                              <td> </td>
                            </tr>
                        // else
                        : 
                          // display filtered items
                          filterList 
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="similar-list-div">                
                <label htmlFor="itemSimilar">Confirm Similar Items</label>
                <small id="createSimilarListDesc" className="form-text text-muted">See list to confirm or delete similar items</small>
                {
                  this.state.similarList.length > 0
                  ?
                    similarList 
                  :
                    <div style={{'fontStyle': 'italic'}}>No Similar Items</div>
                }
              </div>
            </div>

          </form>

        </div>

        <div className="create-form-submit">
          <button type="submit" value="Send" className="btn btn-primary" id="create-form-submit-btn" onClick={(e) => this.submitForm(e)}>
            Save
          </button>
        </div>

      </div>
    );
  }
}

export default CreateWidget;