import React, { Component }     from "react";
import { withRouter, Redirect } from "react-router";
import RaisedButton             from 'material-ui/RaisedButton';
import TextField                from "material-ui/TextField";
import NavBar                   from "./NavBar";
import AuthService              from "../services/AuthService";
import "./App.css";

const initialState = {
    username_error_text: '',
    password_error_text: '',
    redirect: false
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        if(AuthService.isLoggedIn()) {
            this.setState({redirect : true});
        }
    }

    login() {
        let self = this;
        let {username, password} = this.refs;
        username = username.input.value;
        password = password.input.value;

        AuthService.userLogin({username: username, password: password}).then(
            function success(res) {
                self.setState({redirect: true});
            },
            function error(res) {

            }
        )
    }


    render() {

        const {redirect} = this.state;

        if(redirect) {
            return <Redirect to='/home'/>
        }

        return (
            <div>
                <NavBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h3>Login</h3>
                            <hr/>
                            <div>
                                <TextField
                                    floatingLabelText = "Input your Username"
                                    fullWidth
                                    ref = "username"
                                    errorText={this.state.username_error_text}
                                />

                                <TextField
                                    floatingLabelText = "Input your password"
                                    fullWidth
                                    ref = "password"
                                    type = "password"
                                    errorText={this.state.password_error_text}
                                />


                                <RaisedButton
                                    label = "Login"
                                    primary = {true}
                                    onClick = {this.login}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
