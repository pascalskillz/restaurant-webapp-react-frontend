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
            <Route exact path="/admin" component={Admin} />
            <Route component={Main} />
          </Switch>
        </div>   
      </div>
      <Footer/> 
    </Router>
  </MyProvider>
);

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