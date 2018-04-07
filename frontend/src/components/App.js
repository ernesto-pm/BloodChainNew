import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import IndexComponent from "./Index";
import Singup from "./Singup";
import Login from "./Login";
import Home from "./Home";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import PatientForm from "./PatientForm";
import Transactions from "./Transactions";
import PatientDetail from "./PatientDetail";

const store = createStore(appReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={IndexComponent} />
            <Route exact path="/singup" component={Singup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/patients/new" component={PatientForm} />
            <Route
              exact
              path="/user/:id/transactions"
              component={Transactions}
            />
            <Route
              exact
              path="/user/:id/patientDetail"
              component={PatientDetail}
            />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
