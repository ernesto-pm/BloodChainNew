import React, { Component } from "react";
import { withRouter } from "react-router";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Chip from "material-ui/Chip";
import NavBar from "../NavBar";
import { connect } from "react-redux";
import * as action from "../reducers/actions";
import AuthService from "../../services/AuthService";
import DataService from "../../services/DataService";
import Snackbar from 'material-ui/Snackbar';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

const initialState = {
    bloodType: "A",
    bloodTypeValue: 1,
    RH: 1,
    rhType: "-",
    knownHealthIssues: [],
    identifier_error_text: '',
    temperature_error_text: '',
    weight_error_text: '',
    currentUser: AuthService.currentUser(),
    openSnackbar: false,
    snackbarMessage: '',
};

class NewDonation extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;

        this.addHealthIssue = this.addHealthIssue.bind(this);
        this.addDonation = this.addDonation.bind(this);
    }

    handleBloodTypeChange = (event, index, value) => {
        if (value === 1) {
            this.setState(...this.state, { bloodTypeValue: value, bloodType: "A" });
        } else if (value === 2) {
            this.setState(...this.state, { bloodTypeValue: value, bloodType: "AB" });
        } else if (value === 3) {
            this.setState(...this.state, { bloodTypeValue: value, bloodType: "B" });
        } else if (value === 4) {
            this.setState(...this.state, { bloodTypeValue: value, bloodType: "O" });
        }
    };

    handleBloodTypeRH = (event, index, value) => {
        if (value === 1) {
            this.setState(...this.state, { RH: value, rhType: "-" });
        } else if (value === 2) {
            this.setState(...this.state, { RH: value, rhType: "+" });
        }
    };

    handleDeleteHealthIssue(index) {
        let {knownHealthIssues} = this.state;
        knownHealthIssues.splice(index,1);
        this.setState(...this.state, {knownHealthIssues: knownHealthIssues})
    }

    addHealthIssue() {
        let {healthIssue} = this.refs;
        let {knownHealthIssues} = this.state;

        knownHealthIssues.push(healthIssue.input.value);


        this.setState(...this.state, {knownHealthIssues: knownHealthIssues})
        healthIssue.input.value = ""

    }

    addDonation() {
        let {identifier, temperature, weight} = this.refs;
        let self = this;

        if(!identifier.input.value) {
            this.setState(...this.state, {identifier_error_text: "Identifier required"})
            return
        } else {
            this.setState(...this.state, {identifier_error_text: ""})
        }

        if(!temperature.input.value) {
            this.setState(...this.state, {temperature_error_text: "Temperature required"})
            return
        } else {
            this.setState(...this.state, {temperature_error_text: ""})
        }

        if(!weight.input.value) {
            this.setState(...this.state, {weight_error_text: "Weight required"})
            return
        } else {
            this.setState(...this.state, {weight_error_text: ""})
        }

        let knownHealthIssues = this.state.knownHealthIssues.join(";");
        identifier = identifier.input.value;
        temperature = temperature.input.value;
        weight = weight.input.value;

        this.refs.identifier.input.value = "";
        this.refs.temperature.input.value = "";
        this.refs.weight.input.value = "";
        this.state.knownHealthIssues = [];

        DataService.createDonation(identifier, this.state.currentUser.id, temperature, weight, this.state.bloodType, this.state.rhType, knownHealthIssues).then(
            function success(res) {
                let link = JSON.parse(res.data.blockchainResponse.body).link
                self.setState(...self.state, {
                    openSnackbar: true,
                    link: link,
                    snackbarMessage: `Blockchain donation successfuly submission requested`
                })
            },
            function error(err) {
                console.error(err);
            }
        )
    }


    render() {

        let healthIssuesChips = this.state.knownHealthIssues.map((healthIssue, i) => {
            return (
                <Chip key = {i} style={styles.chip} onRequestDelete={() => this.handleDeleteHealthIssue(i)}>
                    {healthIssue}
                </Chip>
            )
        })


        return (
            <div>
                <NavBar />
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">

                            <div className="card" style={{width: "100%"}}>
                                <div className="card-header">
                                    Register New Blood Donation
                                </div>

                                <div className="card-body">

                                    This donation owner will be automatically set as you. All data will be encrypted before being stored in the blockchain.

                                    <TextField
                                        floatingLabelText = "Enter the donation Identifier, i.e: D0nat10n-0003"
                                        fullWidth
                                        ref = "identifier"
                                        errorText={this.state.identifier_error_text}
                                    />

                                    <TextField
                                        floatingLabelText = "Enter the blood's temperature (in ºC)"
                                        fullWidth
                                        ref = "temperature"
                                        errorText={this.state.temperature_error_text}
                                        type = "number"
                                    />

                                    <TextField
                                        floatingLabelText = "Enter the blood's weight (in Kg)"
                                        fullWidth
                                        ref = "weight"
                                        errorText={this.state.weight_error_text}
                                        type = "number"
                                    />

                                    <SelectField
                                        floatingLabelText="Blood Type"
                                        value={this.state.bloodTypeValue}
                                        onChange={this.handleBloodTypeChange}
                                        style={{ width: 100 }}
                                    >
                                        <MenuItem value={1} primaryText="A" />
                                        <MenuItem value={2} primaryText="AB" />
                                        <MenuItem value={3} primaryText="B" />
                                        <MenuItem value={4} primaryText="O" />
                                    </SelectField>
                                    {"\t"}
                                    <SelectField
                                        floatingLabelText="RH"
                                        value={this.state.RH}
                                        onChange={this.handleBloodTypeRH}
                                        style={{ width: 70 }}
                                    >
                                        <MenuItem value={1} primaryText="-" />
                                        <MenuItem value={2} primaryText="+" />
                                    </SelectField>

                                    <br/>

                                    <TextField
                                        floatingLabelText = "Enter any known health issues of the patient (Optional)"
                                        ref = "healthIssue"
                                        fullWidth
                                        type = "text"
                                    />
                                    <RaisedButton
                                        label = "Add"
                                        primary = {false}
                                        onClick = {this.addHealthIssue}
                                    />

                                    <br/>
                                    <br/>

                                    <div style={styles.wrapper}>
                                        {healthIssuesChips}
                                    </div>


                                    <RaisedButton
                                        label = "Submit Transaction"
                                        primary = {true}
                                        onClick = {this.addDonation}
                                    />

                                    <Snackbar
                                        open={this.state.openSnackbar}
                                        message={this.state.snackbarMessage}
                                        autoHideDuration={8000}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const withRedux = connect(null, dispatch => {
    return {
        onSubmit: donation => {
            dispatch(action.addPatient(donation));
        }
    };
});

export default withRedux(NewDonation);
