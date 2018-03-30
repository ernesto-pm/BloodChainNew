import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import IndexComponent from "./Index";
import Singup from "./Singup";
import Login from "./Login";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={IndexComponent} />
          <Route exact path="/singup" component={Singup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
