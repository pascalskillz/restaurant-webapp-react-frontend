import React, { Fragment, Component } from 'react';
import { MyConsumer } from '../Context';
import { default as Sb } from '../components/SidebarCard';
import { default as Item } from '../components/MenuItem';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Jumbo from '../components/Jumbo';
import { Pagination } from 'react-bootstrap';
import API from '../utils/API';
import img from '../img/old-logo.jpg';
import '../styles/Menu.css';

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      favs: [],
      allItems: [],
      categories: [],
      catMenuItems: [],
      allItemsLoading: true,
      categoryLoading: true,
      selected: 'Loading...',
      mobile: false,
      currentPage: 1,
      ordersPerPage: 9,
      totalPages: 0,
      totalElements: 0,
      viewFullMenu: true,
      selectedId: -1
    };
  }

  componentDidMount() {
    // this.getFavorites()
    // this.getAllMenuItems()
    // this.scrollToTop();
    // this.gatherMenuItemsByCategory(5, 0);
    this.gatherAllItems(this.state.currentPage);
    this.getCategories();
    this.isMobile();
    window.addEventListener('resize', this.isMobile);
  }

  scrollToTop = () => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  };

  isMobile = () => {
    if (window.innerWidth < 1100) {
      this.setState({ mobile: true, selected: 'Full Menu', selectedId: 0 });
    } else {
      this.setState({ mobile: false });
      this.getCategories();
      this.gatherAllItems();
    }
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
      // console.log(sidebar);
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

  gatherAllItems = async (currentPage) => {
    let allItemsArr = [];
    let pageNum = 0;
    let pageTotal = 0;
    let elementsTotal = 0;
    await API.getAllMenuItems(currentPage, this.state.ordersPerPage).then(res => {
      let items = res.data.content;
      pageNum = res.data.number + 1;
      pageTotal = res.data.totalPages;
      elementsTotal = res.data.totalElements;
      console.log(items)
      allItemsArr = [...items];
    });

    this.setState({
      allItems: [...allItemsArr],
      currentPage: pageNum,
      totalPages: pageTotal,
      totalElements: elementsTotal,
      allItemsLoading: false
    });
    //await console.log('All Items')
    // await console.log(this.state.allItems)
  };

  setSidebar = async x => {
    if (!this.state.mobile) {
      let length = this.state.categories.length;
      //console.log(`setSidebar: ${x}`);
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
    }
  };

  handleMobileSelect = event => {
    console.log(event.target.value);
    console.log(event.target.selectedIndex);
    this.setState({
      selected: event.target.value,
      selectedId: event.target.selectedIndex
    });
    // this.setState({ value: event.target.value });
  };

  // handleSubmit(event) {
  //   alert('Your favorite flavor is: ' + this.state.value);
  //   event.preventDefault();
  // }

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

  gatherMenuItemsByCategory = async (categoryId, currentPage) => {
    let allMenuItems = [];
    let pageNum = 0;
    let pageTotal = 0;
    let elementsTotal = 0;
    await API.getMenuItemsByCategory(categoryId, currentPage, this.state.ordersPerPage).then(res => {
      let items = res.data.content;
      pageNum = res.data.number + 1;
      pageTotal = res.data.totalPages;
      elementsTotal = res.data.totalElements;
      allMenuItems = [...items];
      //console.log("pageTotal " + pageTotal + "  elementsTotal " + elementsTotal + " pageNum " + pageNum)
      //console.log(items);
    });

    this.setState({
      catMenuItems: [...allMenuItems],
      currentPage: pageNum,
      totalPages: pageTotal,
      totalElements: elementsTotal,
      allItemsLoading: false
    });
  }

  handleCategorySelect = (categoryId) => {
    this.setState({ viewFullMenu: false });
    this.gatherMenuItemsByCategory(categoryId, 0);
  }

  handleFullMenuView = () => {
    this.gatherAllItems(1);
    this.setState({ viewFullMenu: true });
    //console.log(this.state.allItems);
    //console.log(this.state.viewFullMenu);
  }

  handleFirst = () => {
    if (this.state.currentPage > 1) {
      window.scrollTo(0, 0);
      if (this.state.viewFullMenu) {
        this.gatherAllItems(1);
      }
      else {
        this.gatherMenuItemsByCategory(this.state.selectedId, 1);
      }
    }
  }
  handleNext = () => {
    console.log(`currentPage ${this.state.currentPage}`);
    if (this.state.currentPage < this.state.totalPages) {
      window.scrollTo(0, 0);
      if (this.state.viewFullMenu) {
        this.gatherAllItems(this.state.currentPage + 1);
      }
      else {
        this.gatherMenuItemsByCategory(this.state.selectedId, this.state.currentPage + 1);
        // console.log(`selectedId: ${this.state.selectedId}`);
        // console.log(`currentPage: ${this.state.currentPage}`);
        // console.log(`totalPages: ${this.state.totalPages}`);
      }
    }
  }

  handlePrev = () => {
    console.log(`currentPage ${this.state.currentPage}`);
    if (this.state.currentPage > 1) {
      window.scrollTo(0, 0);
      if (this.state.viewFullMenu) {
        this.gatherAllItems(this.state.currentPage - 1);
      }
      else {
        this.gatherMenuItemsByCategory(this.state.selectedId, this.state.currentPage - 1);
        //this.state.currentPage--;
      }
    }
  }
  handleLast = () => {
    if (this.state.currentPage != this.state.totalPages) {
      window.scrollTo(0, 0);
      if (this.state.viewFullMenu) {
        this.gatherAllItems(this.state.totalPages);
      } else {
        this.gatherMenuItemsByCategory(this.state.selectedId, this.state.totalPages);
      }
    }
  }

  render() {
    const filteredItemList = this.state.catMenuItems
      // .filter(item => {
      //   //console.log(item)
      //   return item.categoryId === this.state.selectedId;
      // })
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

    const mobileCategories = this.state.categoryLoading ? (
      <option value='--'>--</option>
    ) : (
        this.state.categories
          .filter(item => {
            return item.id > 0;
          })
          .map((item, index) => (
            <option key={index} value={item.categoryName} id={item.id}>
              {item.categoryName.split(" ")[0]}
            </option>
          ))
      );

    return (
      <MyConsumer>
        {({ loaded }) => (
          <div className='menu-js top'>
            <Navbar page='MENU' />
            <Jumbo
              src='https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
              alt='Menu Picture'
              text='Browse the Menu'
            />
            <div className='menu-div'>
              <div className='menu-sidebar'>
                {this.state.mobile ? (
                  <div className='menu-select-mobile'>
                    {this.state.categoryLoading ? (
                      <select>
                        <option value='--'>--</option>
                      </select>
                    ) : (
                        <form>
                          <select
                            // value={this.state.mobileCategoryValue}
                            onChange={this.handleMobileSelect}>
                            <option id='0' value='Full Menu'>
                              Full Menu
                          </option>
                            {mobileCategories}
                          </select>
                        </form>
                      )}
                  </div>
                ) : (
                    <Fragment>
                      <div
                        className='sidebar-top-div sb-toggle'
                        id='sbItem-0'
                        onClick={() => { this.handleFullMenuView(); this.setSidebar(0) }}>
                        <Sb name='Full Menu' img={img} />
                      </div>
                      <div className='sidebar-inner-div'>
                        {this.state.categoryLoading ? (
                          <div>Loading...</div>
                        ) : (
                            this.state.categories
                              .filter(filterItem => {
                                // console.log(filterItem.id);
                                return filterItem.id > 0;
                              })
                              .map((item, index) => (
                                <div
                                  key={index}
                                  id={`sbItem-${item.id}`}
                                  className='sidebar-inner-item sb-toggle'
                                  sbactive='false'
                                  onClick={() => { this.setSidebar(item.id); this.handleCategorySelect(item.id) }}>
                                  <Sb name={item.categoryName} img={img} />
                                </div>
                              ))
                          )}
                      </div>
                    </Fragment>
                  )}
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
                      // <div className='category-item-div'>{allItemsList}</div>
                      <div className='category-item-div'>{filteredItemList}</div>
                    )}

                  <div className="pagination-container">
                    <div className="paging">
                      <div className="page-count">
                        <span>
                          Showing {this.state.currentPage} of {this.state.totalPages} Pages
						                </span>
                      </div>
                      <div className="page-numbers">
                        <Pagination>
                          <Pagination.First onClick={() => this.handleFirst()} />
                          <Pagination.Prev onClick={() => this.handlePrev()} />
                          <Pagination.Next onClick={() => this.handleNext()} />
                          <Pagination.Last onClick={() => this.handleLast()} />
                          {/*To DO: disable the navigations when there is nothing left */}
                        </Pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Menu;
