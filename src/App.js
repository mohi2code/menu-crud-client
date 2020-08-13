import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import NewFood from "./NewFood";
import Food from './Food';
import EditFood from './EditFood';
import NewCategory from './NewCategory';
import Category from './Category';
import EditCategory from './EditCategory';

export default function App() {
  const API_URL = 'http://localhost:3000';
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/categories`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status == 200)
          setCategories(res.data);
      })
      .catch(err => {
        if (err.response.status == 401) {
          setToken('');
        } else {
          console.error(err.response.data);
        }
      });

    axios.get(`${API_URL}/food`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status == 200)
          setFood(res.data);
      })
      .catch(err => {
        if (err.response.status == 401) {
          setToken('');
        } else {
          console.error(err.response.data);
        }
      });
  }, []);

  const adjustToken = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }, [token])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token ? <Dashboard categories={categories} food={food} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login API_URL={API_URL} token={token} setToken={adjustToken} />
        </Route>
        <Route path="/register">
          <Register API_URL={API_URL} token={token} />
        </Route>

        <Route path="/newFood">
          <NewFood API_URL={API_URL} token={token} setToken={adjustToken} categories={categories} />
        </Route>
        <Route path="/food/:id">
          <Food API_URL={API_URL} token={token} setToken={setToken} categories={categories} />
        </Route>
        <Route path="/editFood/:id">
          <EditFood API_URL={API_URL} token={token} setToken={setToken} categories={categories} />
        </Route>

        <Route path="/newCategory">
          <NewCategory API_URL={API_URL} token={token} setToken={adjustToken} categories={categories} />
        </Route>
        <Route path="/categories/:id">
          <Category API_URL={API_URL} token={token} setToken={setToken} categories={categories} />
        </Route>
        <Route path="/editCategory/:id">
          <EditCategory API_URL={API_URL} token={token} setToken={setToken} categories={categories} />
        </Route>
      </Switch>
    </Router>
  );
}
