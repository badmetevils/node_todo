import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Auth from './utils';
import Navbar from './layout/Navbar';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Registeration from './components/Registration';
import User from './components/User';
import Admin from './components/Admin';

import './styles/main.scss';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isValid, setIsValid] = useState(localStorage.getItem('isValid'));
  useEffect(() => {
    if (Boolean(token)) {
      Auth.validateToken(token)
        .then(res => {
          // console.log(res);
          setIsValid(res.isValid);
          localStorage.setItem('isValid', isValid);
        })
        .catch(err => {
          // console.log(err);
          localStorage.removeItem('token');
          localStorage.removeItem('isValid');
          setIsValid(false);
        });
    }
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" render={props => (isValid ? <Redirect to="/user" /> : <Home {...props} />)} strict />
          <Route exact path="/user" component={User} strict />
          <Route exact path="/user/admin" component={Admin} strict />
          <Route
            exact
            path="/login"
            render={props => (isValid ? <Redirect to="/user" /> : <Login {...props} />)}
            strict
          />
          <Route
            exact
            path="/register"
            render={props => (isValid ? <Redirect to="/user" /> : <Registeration {...props} />)}
            strict
          />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('todo'));
