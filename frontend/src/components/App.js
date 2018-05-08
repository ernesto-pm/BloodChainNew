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
import NewDonation from "./NewDonation";
import Transactions from "./Transactions/Donation";
import HistoryTx from "./Transactions/History";
import Donation from "./Transactions/Donation";

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
                        <Route
                            exact
                            path="/donations/new"
                            component={NewDonation}
                        />
                        <Route
                            exact
                            path="/user/:id/transactions"
                            component={HistoryTx}
                        />
                        <Route
                            exact
                            path="/user/:id/donation"
                            component={Donation}
                        />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
