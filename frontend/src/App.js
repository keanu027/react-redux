import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import Login from './components/account/login';
import PrivateRoute from './components/common/PrivateRoute';
import AdminPage from './components/pages/Admin/Dashboard';
import UserPage from './components/pages/User/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={(props) => <Login {...props} />} />
          <Route path='/login' exact render={(props) => <Login {...props} />} />

          <PrivateRoute exact path='/1' component={AdminPage} />
          <PrivateRoute exact path='/3' component={UserPage} />

          <Route path='/' render={(props) => <Login {...props} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
