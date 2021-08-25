import {useEffect} from 'react';
import logo from './logo.svg';
import ErrorBoundry from './components/ErrorBoundry'
import './App.css';
import Loader from 'react-loader-spinner';
import {Provider } from 'react-redux'
import store from './redux/store'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './components/Register';

function App() {
  // componentDidMount() {
  //   document.getElementsByClassName('overlay')[0].classList.remove('overlay');
  //  document.querySelectorAll("#loaderComponent")[0].hidden = true;
  //  document.getElementById('app-main-container').style.height =  '' +  window.innerHeight  + 'px'
  // }
    // Similar to componentDidMount.
 useEffect(() => {
    document.querySelectorAll("#loaderComponent")[0].hidden = true;     // first method on page load
  }, [] );
  return (
    <Provider store={store}>
      <div className="App">
          <ErrorBoundry>
          <div id="loaderComponent">
              <Loader type="Circles" className="loader" color="#00BFFF"/>
          </div>
          <div id="app-main-container"  className="overlay wall">
          <Router>
                <div>
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className="nav-link"> Home </Link></li>
                    <li><Link to={'/register'} className="nav-link">Registration</Link></li>
                  </ul>
                  </nav>
                  <hr />
                  <Switch>
                      <Route exact path='/' component={Dashboard} />
                      <Route path='/register' component={Register} />
                  </Switch>
                </div>
            </Router>
          </div>
        </ErrorBoundry>
      </div>
    </Provider>
  );
}

export default App;
