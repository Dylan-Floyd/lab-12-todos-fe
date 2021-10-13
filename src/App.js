import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import TodosPage from './Pages/TodosPage.js';
import AuthPage from './Pages/AuthPage.js';
import HomePage from './Pages/HomePage.js';
import { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default class App extends Component {

  theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3483a2',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0
          }
        }
      }
    },
  });

  state = {
    token: localStorage.getItem('TOKEN')
  }

  handleTokenChange = (token) => {
    this.setState({ token });
    localStorage.setItem('TOKEN', token);
  }

  signOut = () => {
    this.handleTokenChange('');
  }

  render() {
    const { token } = this.state;
    return (
      <div className="App">
        <Router>
          <ThemeProvider theme={this.theme}>
            <div className="nav">
              <NavLink to="/">Home</NavLink>
              {token ? <NavLink onClick={ this.signOut } to="/auth">Sign Out</NavLink> : <NavLink to="/auth">Sign In</NavLink> }
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
          </ThemeProvider>
        </Router>
      </div>
    )
  }
}
