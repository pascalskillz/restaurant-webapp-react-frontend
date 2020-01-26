import React, { Fragment,Component } from "react";
import { MyConsumer } from '../Context';
import { default as Sb } from "../components/SidebarCard";
import { default as Item } from "../components/MenuItem";
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import API from "../utils/API";
import img from "../img/old-logo.jpg";
import "../styles/Menu.css";
// import '../styles/Main.css'
import '../styles/cart.css';

import store from '../store'



class Cart extends Component {
  state = {
    allItems: [],
    categories: [],
    allItemsLoading: true,
    categoryLoading: true,
    selected: 'Loading...',
    mobile: false
  };

  componentDidMount() {
    // this.getFavorites()
    // this.getAllMenuItems()
    // this.scrollToTop();
    this.gatherAllItems();
    this.getCategories();
    this.isMobile();
    window.addEventListener('resize', this.isMobile);
  }

  scrollToTop = () => {
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
  };

  isMobile = () => {
    if (window.innerWidth < 1100) {
      this.setState({ mobile: true, selected: 'Cart List', selectedId: 0 });
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
    if (!this.state.mobile) {
      let length = this.state.categories.length;
      // console.log(`setSidebar: ${x}`);
      if (x === 0) {
        document.getElementById(`sbItem-0`).setAttribute('sbactive', 'true');
        this.setState({
          selected: 'Cart List',
          selectedId: 0
        });
        for (var j = 1; j < length; j++) {
          // document
            // .getElementById(`sbItem-${j}`)
            // .setAttribute('sbactive', 'false');
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
            // document
              // .getElementById(`sbItem-${i}`)
              // .setAttribute('sbactive', 'false');
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

  render() {
     const filteredItemList = this.state.allItems
       .filter(item => {
         //console.log(item)
         return item.categoryId === this.state.selectedId;
       })
       .map((item, index) => (
         <div key={index} className="filtered-grid-item">
           <Link to={"/item/" + item.id}>
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
       <div key={index} className="all-grid-item">
         <Link to={"/item/" + item.id}>
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
      <MyConsumer>
        {({ state }) => (
          <div className="cart-js top">
            <Navbar page="CART" />
            <Jumbo
              src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb"
              alt="Cart Picture"
              text="Your Cart"
            />
            <div className="cart-div">
              <div className="menu-categories">
                <div className="category-title-div">
                  <div className="title-header-text">{this.state.selected}</div>
                </div>
                <div className="category-item-container">
                  {this.state.selected === "Cart List" ? (
                    !this.state.allItemsLoading ? (
                      <div className="all-item-div">{allItemsList}</div>
                    ) : (
                      <div>Loading...</div>
                    )
                  ) : (
                    <div className="category-item-div">{filteredItemList}</div>
                  )}
                </div>
              </div>

              <div className="checkout-sidebar">
                {this.state.mobile ? (
                  <div className="menu-select-mobile"></div>
                ) : (
                  <Fragment>
                    <div
                      className="sidebar-top-div sb-toggle"
                      id="sbItem-0"
                      onClick={() => this.setSidebar(0)}
                    >
                      <Sb name="Total Amount" img={img} />
                    </div>
                    <div className="sidebar-inner-div">
                      {this.state.categoryLoading ? (
                        <div>Loading...</div>
                      ) : (
                        <div
                          className="sidebar-inner-item sb-toggle"
                          sbactive="false"
                        >
                          <Sb name={"Placeholder"} img={img} />
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Cart;
