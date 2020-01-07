import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import { default as Sb } from '../components/SidebarCard';
import { default as Item } from '../components/MenuItem';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../utils/API';
import img from '../img/old-logo.jpg';
import '../styles/Menu.css';

class Menu extends Component {
  state = {
    favs: [],
    allItems: [],
    categories: [],
    allItemsLoading: true,
    categoryLoading: true,
    selected: 'Loading...'
  };

  componentDidMount() {
    // this.getFavorites()
    // this.getAllMenuItems()
    this.gatherAllItems();
    this.getCategories();
  }

  // getAllMenuItems = async() => {
  //   API
  //     .getAllMenuItems()
  //     .then( res => {
  //       let data = res.data
  //       console.log(data)
  //     })
  // }

  getOneMenuItem = async itemId => {
    API.getOneMenuItem(itemId).then(res => {
      let data = res.data;
      console.log(data);
    });
  };

  getCategories = async () => {
    let sidebar = [];
    await API.getCategories().then(res => {
      sidebar[0] = { id: 0 };
      let categories = res.data;
      // console.log(categories)
      for (var i of categories) {
        // console.log(i)
        sidebar[i.id] = i;
      }
      console.log(sidebar);
    });

    await this.setState({
      categories: [...sidebar],
      categoryLoading: false
    });

    await this.setFromDropdown();

    /** Update started to filter cate. items abdul  */
    //[if categoryindesxparam is exist, then categoryindex will cateindexpram if not exist , gonna use 500 "Full menu"]
    // await this.setSidebar(categoryIndex) // await this.setSidebar(categoryIndex)
    // console.log(paramsString, params, categoryIndexParam);
    // await console.log('Categories')
    // await console.log(this.state.categories)
  };

  setFromDropdown = async () => {
    let paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
    const categoryIndexParam = parseInt(params.get('category'));
    // console.log(`categoryIndexParam: ${categoryIndexParam}`)
    let categoryIndex = categoryIndexParam > 0 ? categoryIndexParam : 0;
    // console.log(`categoryIndex: ${categoryIndex}`)
    this.setSidebar(categoryIndex);
  };

  gatherAllItems = async () => {
    let allItemsArr = [];
    await API.getAllMenuItems().then(res => {
      let items = res.data;
      // console.log(items)
      allItemsArr = [...items];
    });

    await this.setState({
      allItems: [...allItemsArr],
      allItemsLoading: false
    });
    //await console.log('All Items')
    // await console.log(this.state.allItems)
  };

  setSidebar = async x => {
    let length = this.state.categories.length;
    // console.log(`setSidebar: ${x}`);
    if (x === 0) {
      document.getElementById(`sbItem-0`).setAttribute('sbactive', 'true');
      this.setState({
        selected: 'Full Menu',
        selectedId: 0
      });
      for (var j = 1; j < length; j++) {
        document
          .getElementById(`sbItem-${j}`)
          .setAttribute('sbactive', 'false');
      }
    }
    if (x !== 0) {
      document.getElementById(`sbItem-0`).setAttribute('sbactive', 'false');
      for (var i = 1; i < length; i++) {
        if (x === i) {
          document
            .getElementById(`sbItem-${i}`)
            .setAttribute('sbactive', 'true');
          this.setState({
            selected: this.state.categories[i].categoryName,
            selectedId: i
            //categorySelected: this.state.allItems['categoryId']
          });
          // console.log(this.state.categories[i].categoryName)
        } else {
          document
            .getElementById(`sbItem-${i}`)
            .setAttribute('sbactive', 'false');
        }
      }
    }
  };

  // NOT CURRENTLY BEING USED
  // getFavorites = async() => {
  //   let localFavs = [...this.state.categories]
  //   let temp = []
  //   for (var i = 0; i < 12; i++){
  //     let rand = Math.floor(Math.random() * localFavs.length)
  //     temp[i] = localFavs[rand]
  //     localFavs.splice(rand, 1)
  //   }
  //   await this.setState({
  //     favs: [...temp],
  //     selected: 'Full Menu'
  //   })
  // }

  render() {
    const filteredItemList = this.state.allItems
      .filter(item => {
        //console.log(item)
        return item.categoryId === this.state.selectedId;
      })
      .map((item, index) => (
        <div key={index} className='filtered-grid-item'>
          <Link to={'/item/' + item.id}>
            <Item
              img={item.imageUrl}
              name={item.itemName}
              price={item.itemPrice}
              id={item.id}
            />
          </Link>
        </div>
      ));

    const allItemsList = this.state.allItems.map((item, index) => (
      <div key={index} className='all-grid-item'>
        <Link to={'/item/' + item.id}>
          <Item
            img={item.imageUrl}
            name={item.itemName}
            price={item.itemPrice}
            id={item.id}
          />
        </Link>
      </div>
    ));

    return (
      // <Navbar />
      <MyConsumer>
        {({ state }) => (
          <div className='menu-js'>
            <Navbar page='MENU' default='dark'/>
            <div className='menu-div'>
              <div className='menu-sidebar'>
                <div
                  className='sidebar-top-div sb-toggle'
                  id='sbItem-0'
                  onClick={() => this.setSidebar(0)}>
                  <Sb name='Full Menu' img={img} />
                </div>
                <div className='sidebar-inner-div'>
                  {this.state.categoryLoading ? (
                    <div>Loading...</div>
                  ) : (
                    this.state.categories
                      .filter(filterItem => {
                        console.log(filterItem.id);
                        return filterItem.id > 0;
                      })
                      .map((item, index) => (
                        <div
                          key={index}
                          id={`sbItem-${item.id}`}
                          className='sidebar-inner-item sb-toggle'
                          sbactive='false'
                          onClick={() => this.setSidebar(item.id)}>
                          <Sb name={item.categoryName} img={img} />
                        </div>
                      ))
                  )}
                </div>
              </div>
              <div className='menu-categories'>
                <div className='category-title-div'>
                  <div className='title-header-text'>{this.state.selected}</div>
                </div>
                <div className='category-item-container'>
                  {this.state.selected === 'Full Menu' ? (
                    !this.state.allItemsLoading ? (
                      <div className='all-item-div'>{allItemsList}</div>
                    ) : (
                      <div>Loading...</div>
                    )
                  ) : (
                    <div className='category-item-div'>{filteredItemList}</div>
                  )}
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Menu;
