import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import IndexComponent from './Index'
import SignupComponent from './Signup'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path = "/" component = {IndexComponent} />
                    <Route exact path = "/signup" component = {SignupComponent} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
