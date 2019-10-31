import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const checkAuth = () => {
  const ts = localStorage.getItem('ts')
  if ( !ts ){
    return false;
  }

  try {
    if (ts < Date().now()/1000){
      return false;
    }
  } catch (e) {
    console.log(e)
    return false;
  }
  console.log('👍🏽')
  console.log(`ts: ${ts}`)
}

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const checkCookie = () => {
  var username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
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
      <Redirect to={{ pathname: '/', }} />
    )
  )} />
)

export default AuthRoute;