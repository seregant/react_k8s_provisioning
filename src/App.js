import React from 'react';
import './App.css';
import LayoutDataPengguna from './app/LayoutDataPengguna'
import LoginPage from './app/LayoutLogin'
import DashboardUser from './app/LayoutDashboard'
import Register from './app/LayoutRegister'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DashboardAdmin from './app/LayoutDashboardAdmin';

class App extends React.Component {
  render() {
    return(
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/dashboard">
                <DashboardUser />
              </Route>
              <Route path="/admin">
                <DashboardAdmin />
              </Route>
              <Route path="/users">
                <LayoutDataPengguna/>
              </Route>
              <Route path="/">
                <LoginPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
