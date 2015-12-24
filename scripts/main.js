import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route} from 'react-router';
import { createHistory } from 'history';



/*
Import components
*/
import NotFound from './components/NotFound'
import StorePicker from './components/StorePicker'
import App from './components/App'






var routes = (
  <Router history={createHistory()}>
    <Router path="/" component={StorePicker}/>
    <Router path="/store/:storeId" component={App}/>
    <Router path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
