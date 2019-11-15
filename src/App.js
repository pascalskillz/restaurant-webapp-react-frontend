<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyProvider } from "./Context";
import Login from "./containers/Login";
import Main from "./containers/Main";
import Menu from "./containers/Menu";
import Reservation from "./containers/Reservation";
import Signup from "./containers/Signup";
import Admin from "./containers/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./containers/Contact";
import ControlPanel from "./containers/ControlPanel";
import AuthRoute from "./components/AuthRoute";
import MenuItemDetail from "./containers/MenuItemDetail";
=======
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MyProvider } from './Context'
import Login from './containers/Login';
import Main from './containers/Main';
import Menu from './containers/Menu';
import Reservation from './containers/Reservation';
import Signup from './containers/Signup';
import Admin from './containers/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './containers/Contact';
import ControlPanel from './containers/ControlPanel';
import AuthRoute from './components/AuthRoute';
import Test from './containers/Test';
import Item from './containers/Item';
>>>>>>> refs/remotes/origin/develop

import "./styles/App.css";

const App = () => (
  <MyProvider>
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/reservation" component={Reservation} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/admin" component={Admin} />
<<<<<<< HEAD
            <Route path="/item/" component={MenuItemDetail} />
=======
            <Route exact path="/test" component={Test} />
            <Route path="/item/:id" component={Item} />
>>>>>>> refs/remotes/origin/develop
            <AuthRoute exact path="/cPanel" component={ControlPanel} />
            {/* <Route exact path="/cPanel" component={ControlPanel} /> */}
            <Route component={Main} />
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  </MyProvider>
);
export default App;
