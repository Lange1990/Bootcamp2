import React from 'react';
import Main from './components/Main';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
      <Main/>
    </BrowserRouter>
  ,
  document.getElementById('app')
);
