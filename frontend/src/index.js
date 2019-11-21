import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import App from './app';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/:userId" component={App} />
    </div>
  </Router>,
  document.getElementById('root')
);
