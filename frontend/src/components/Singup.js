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

const initialState = {
    username_error_text: '',
    password_error_text: '',
    address_error_text: '',
    fullName_error_text: '',
    finished: false,
    stepIndex: 0,
    isAwaitingResponse: false
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

    signUp = () => {
        let {username, password, address, fullName} = this.refs;

        if(!username.input.value) {
            this.setState(...this.state, {username_error_text: "Username required"})
            return
        } else {
            this.setState(...this.state, {username_error_text: ""})
        }

        if(!password.input.value) {
            this.setState(...this.state, {password_error_text: "Password required"})
            return
        } else {
            this.setState(...this.state, {password_error_text: ""})
        }

        if(!fullName.input.value) {
            this.setState(...this.state, {fullName_error_text: "Full name required"})
            return
        } else {
            this.setState(...this.state, {fullName_error_text: ""})
        }

        if(!address.input.value) {
            this.setState(...this.state, {address_error_text: "Address required"})
            return
        } else {
            this.setState(...this.state, {address_error_text: ""})
        }

        //login with dataservice

    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState(...this.state, {
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
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
                        Almost Done, take note of the public and private keys, if you lose your private key there is no way to restore it.
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
