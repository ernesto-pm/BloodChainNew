import React, { Component } from 'react';
import {withRouter} from 'react-router';

class SignupComponent extends Component {
    render() {
        return (
            <div>
                <h3>This is the Signup Component</h3>
            </div>
        )
    }
}

export default withRouter(SignupComponent)
