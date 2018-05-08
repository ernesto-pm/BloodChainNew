import React, { Component } from "react";
import { withRouter } from "react-router";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import * as action from "./reducers/actions";
import { selectors } from "./reducers";
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import CircularProgress from 'material-ui/CircularProgress';
import DataService from "../services/DataService";
import { Link } from "react-router-dom";
import Snackbar from 'material-ui/Snackbar';

const initialState = {
    username_error_text: '',
    password_error_text: '',
    address_error_text: '',
    fullName_error_text: '',
    finished: false,
    stepIndex: 0,
    isAwaitingResponse: false,
    user: {},
    openSnackbar: false,
    snackbarMessage: '',
    link: ''
};

class Singup extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;

        this.signUp = this.signUp.bind(this);
    }

    handleTypeChange = (event, index, value) => {
        if (value === 1) {
            this.setState({ type: value, typeName: "Hospital" });
        } else {
            this.setState({ type: value, typeName: "Bank" });
        }
    };

    signUp() {
        let {username, password, address, fullName, userType} = this.refs;
        let self = this;

        username = username.input.value;
        password = password.input.value;
        address = address.input.value;
        fullName = fullName.input.value;
        userType = userType.props.value == 1 ? "Hospital" : "Bank";

        if(!username) {
            this.setState(...this.state, {username_error_text: "Username required"})
            return
        } else {
            this.setState(...this.state, {username_error_text: ""})
        }

        if(!password) {
            this.setState(...this.state, {password_error_text: "Password required"})
            return
        } else {
            this.setState(...this.state, {password_error_text: ""})
        }

        if(!fullName) {
            this.setState(...this.state, {fullName_error_text: "Full name required"})
            return
        } else {
            this.setState(...this.state, {fullName_error_text: ""})
        }

        if(!address) {
            this.setState(...this.state, {address_error_text: "Address required"})
            return
        } else {
            this.setState(...this.state, {address_error_text: ""})
        }

        DataService.createUser(username, password, fullName, address, userType).then(
            function success(res) {
                console.log(res.data)
                let link = JSON.parse(res.data.blockchainResponse.body).link
                self.setState(...self.state, {
                    user: res.data.user,
                    openSnackbar: true,
                    link: link,
                    snackbarMessage: `Blockchain agent submission requested`
                })
                self.handleNext()
            },
            function error(res) {
                console.log(res.data)
            }
        )

    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState(...this.state, {
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            openSnackbar: false
        });
    };

    getStepContent(stepIndex) {
        switch(stepIndex) {
            case 0:
                return(
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

                        <TextField
                            floatingLabelText = "Input your full-name"
                            fullWidth
                            ref = "fullName"
                            errorText={this.state.fullName_error_text}
                        />

                        <TextField
                            floatingLabelText = "Input your full address"
                            fullWidth
                            ref = "address"
                            errorText={this.state.address_error_text}
                        />

                        <SelectField
                            floatingLabelText="User Type"
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                            ref = "userType"
                            fullWidth
                        >
                            <MenuItem value={1} primaryText="Hospital" />
                            <MenuItem value={2} primaryText="Bank" />
                        </SelectField>

                        <div style={{marginTop: 12}}>
                            {this.state.isAwaitingResponse ?
                                <CircularProgress/>
                                :
                                <RaisedButton
                                    label = "Register"
                                    primary = {true}
                                    onClick = {this.signUp}
                                />
                            }
                        </div>
                    </div>
                )

            case 1:
                return(
                    <div className="text-center">
                        Almost Done.
                        <br/>
                        We submitted a request to the blockchain for a new agent with your data. You can check the progress <a href={this.state.link} target="_blank">here</a>.
                        <br/>
                        Please take note of the public and private keys, if you lose your private key there is no way to restore it.
                        <br/>
                        You will need the private key if you want to sign batches outside of this application.
                        <br/>

                        <hr width="500px"/>

                        <div>
                            <span>Private Key: <span className="badge badge-primary">{this.state.user.privateKey}</span></span>
                        </div>

                        <div>
                            <span>Public Key: <span className="badge badge-success">{this.state.user.publicKey}</span></span>
                        </div>

                        <br/>

                        <RaisedButton
                            label = "Done"
                            primary = {true}
                            onClick = {this.handleNext}
                        />
                    </div>
                )

            case 2:
                return(
                    <div className="text-center">
                        <div>
                            Everything ready.
                        </div>

                        <br/>

                        <RaisedButton
                            label = "Login Now"
                            primary = {true}
                            onClick = {this.handleNext}
                            containerElement={<Link to="/login" />}
                        />
                    </div>
                )
        }
    }

    render() {
        const {
            finished,
            stepIndex
        } = this.state;

        return (
            <div>
                <NavBar />

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h3>Sign-Up</h3>
                            <hr/>

                            <Stepper activeStep = {stepIndex}>
                                <Step>
                                    <StepLabel>
                                        Sign-up
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        Get Public & Private Keys
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        Done
                                    </StepLabel>
                                </Step>
                            </Stepper>

                            {this.getStepContent(stepIndex)}

                            </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.openSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={8000}
                />
            </div>
        );
    }
}

const withRedux = connect(null, dispatch => {
  return {
    onSubmit: user => {
      dispatch(action.addUser(user));
    }
  };
});

export default withRedux(Singup);
