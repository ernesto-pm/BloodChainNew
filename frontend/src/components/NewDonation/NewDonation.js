import React, { Component } from "react";
import { withRouter } from "react-router";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import NavBar from "../NavBar";
import { connect } from "react-redux";
import * as action from "../reducers/actions";
import { selectors } from "../reducers";
import "./NewDonation.css";
const style = {
    marginLeft: "92%"
};

const initialState = {
    name: "",
    bloodType: "A+",
    bloodTypeValue: 1,
    RH: 1,
    rhType: "-",
    weight: "",
    temperature: "",
    degreeValue: 1,
    degree: ""
};
class NewDonation extends Component {
    constructor(props) {
        super();
        this.state = initialState;
    }

    handleChange = e => {
        const {
            target: { name, value }
        } = e;
        console.log(value);
        this.setState({ [name]: value });
    };

    handleBloodTypeChange = (event, index, value) => {
        if (value === 1) {
            this.setState({ bloodTypeValue: value, bloodType: "A" });
        } else if (value === 2) {
            this.setState({ bloodTypeValue: value, bloodType: "AB" });
        } else if (value === 3) {
            this.setState({ bloodTypeValue: value, bloodType: "B" });
        } else if (value === 4) {
            this.setState({ bloodTypeValue: value, bloodType: "O" });
        }
    };

    handleBloodTypeRH = (event, index, value) => {
        if (value === 1) {
            this.setState({ RH: value, rhType: "-" });
        } else if (value === 2) {
            this.setState({ RH: value, rhType: "+" });
        }
    };

    handleTemperatureDegree = (event, index, value) => {
        if (value === 1) {
            this.setState({ degreeValue: value, degree: "F" });
        } else if (value === 2) {
            this.setState({ degreeValue: value, degree: "C" });
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        const {
            name,
            bloodType,
            bloodTypeValue,
            weight,
            RH,
            rhType,
            temperature,
            degreeValue,
            degree
        } = this.state;
        const donation = {
            name,
            bloodType,
            bloodTypeValue,
            weight,
            RH,
            rhType,
            temperature,
            degreeValue,
            degree
        };
        this.props.onSubmit(donation);
        this.props.history.push("/home");
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <NavBar />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <div style={{ padding: "10%" }}>
                        <Card style={{ margin: "auto", width: "80%" }}>
                            <br />
                            <h2 style={{ textAlign: "center" }}>
                                New Donation
                            </h2>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    floatingLabelText="Name"
                                    margin="normal"
                                    label="name"
                                    name="name"
                                    onChange={this.handleChange.bind(this)}
                                    required
                                />
                                <br />
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
                                <br />
                                <TextField
                                    margin="normal"
                                    label="weight"
                                    floatingLabelText="Weight"
                                    defaultValue="1"
                                    name="weight"
                                    onChange={this.handleChange.bind(this)}
                                    required
                                    type="number"
                                />
                                <br />
                                <TextField
                                    margin="normal"
                                    label="temperature"
                                    floatingLabelText="Temperature"
                                    name="weight"
                                    onChange={this.handleChange.bind(this)}
                                    required
                                    defaultValue="90"
                                    type="number"
                                />
                                <br />
                                <SelectField
                                    floatingLabelText="Degree"
                                    value={this.state.degreeValue}
                                    onChange={this.handleTemperatureDegree}
                                    style={{ width: 70 }}
                                >
                                    <MenuItem value={1} primaryText="F" />
                                    <MenuItem value={2} primaryText="C" />
                                </SelectField>
                                <br />
                                <br />
                                <FloatingActionButton
                                    secondary={true}
                                    type="submit"
                                    style={style}
                                >
                                    <Send />
                                    <br />
                                </FloatingActionButton>
                            </form>
                        </Card>
                    </div>
                </MuiThemeProvider>
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
