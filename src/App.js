import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import TodosPage from './Pages/TodosPage.js';
import AuthPage from './Pages/AuthPage.js';
import HomePage from './Pages/HomePage.js';
import { Component } from 'react';

export default class App extends Component {

  state = {
    token: localStorage.getItem('TOKEN')
  }

  handleTokenChange = (token) => {
    console.log('toooken ' + token);
    this.setState({ token });
    localStorage.setItem('TOKEN', token);
  }

  render() {
    const { token } = this.state;
    return (
      <div className="App">
        <Router>
          <div className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auth">Sign In</NavLink>
            <NavLink to="/todos">Todos</NavLink>
          </div>
          <Switch>
            <Route
              path="/"
              exact
              render={ routerProps => <HomePage { ...routerProps } /> }
            />
            <Route
              path="/auth"
              exact
              render={ routerProps => <AuthPage { ...routerProps } handleTokenChange={ this.handleTokenChange } /> }
            />
            <Route
              path="/todos"
              exact
              render={ routerProps => !!token ? <TodosPage { ...routerProps } token={token} handleTokenChange={ this.handleTokenChange } /> : <Redirect to="/auth" /> }
            />
          </Switch>
        </Router>
      </div>
    )
  }
}
