import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  console.log(document.cookie)
  console.log(decodedCookie)
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const checkCookie = () => {
  var username = getCookie("username");
  if (username !== "") {
  //  alert("Welcome again " + username);
   return true;
  } else {
    console.log('Cookie Error');
    return false
  }
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkCookie() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/admin', }} />
    )
  )} />
)

export default AuthRoute;