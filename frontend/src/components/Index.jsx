import React, { Component } from 'react';
import {withRouter} from 'react-router';

class IndexComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3>This is the Index Component</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(IndexComponent)
