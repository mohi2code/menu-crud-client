import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}
