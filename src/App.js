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
<<<<<<< HEAD
import Footer from './components/Footer';
import Contact from './containers/Contact';
=======
>>>>>>> 164d12511ccd8c49dd2434266705b4e18b3326d3

import './styles/App.css';

// FOOTER IMPORT GOES HERE !!
// import Footer from './components/Footer
import Footer from './components/Footer';


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
<<<<<<< HEAD
            <Route exact path="/contact" component={Contact} />
=======
            <Route exact path="/admin" component={Admin} />
>>>>>>> e48398b79ab3bede8231a2ff24d2c46facc28755
            <Route component={Main} />
          </Switch>
        </div>   
      </div>
      <Footer/> 
    </Router>
  </MyProvider>
);
<<<<<<< HEAD
export default App
=======

export default App;

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//          lat: -1.2884,
//          lng: 36.8233
//         }}
//       />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyA7IlTzWHoo8InZXKMsMluISUIlN2xgdxQE'
// })(MapContainer);
>>>>>>> 164d12511ccd8c49dd2434266705b4e18b3326d3
