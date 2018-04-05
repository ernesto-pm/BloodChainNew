import React, { Component } from "react";
import { withRouter } from "react-router";
import Paper from "material-ui/Paper";
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
import NavBar from "./NavBar";
import { connect } from "react-redux";
import * as action from "./reducers/actions";
import { selectors } from "./reducers";

const style = {
  marginLeft: "95%"
};

const initialState = {
  name: "",
  type: 1,
  typeName: "Donor",
  bloodType: "A+",
  bloodTypeValue: 1,
  weight: "",
  height: "",
  sex: "F",
  sexValue: 1,
  age: "",
  diseases: [
    {
      nameD: "",
      description: ""
    }
  ]
};
class Singup extends Component {
  constructor(props) {
    super();
    this.state = initialState;
  }

  handleChange = e => {
    const { target: { name, value } } = e;
    console.log(value);
    this.setState({ [name]: value });
  };

  handleTypeChange = (event, index, value) => {
    if (value === 1) {
      this.setState({ type: value, typeName: "Donor" });
    } else {
      this.setState({ type: value, typeName: "Receptor" });
    }
  };

  handleBloodTypeChange = (event, index, value) => {
    if (value === 1) {
      this.setState({ bloodTypeValue: value, bloodType: "A+" });
    } else {
      this.setState({ bloodTypeValue: value, bloodType: "O+" });
    }
  };

  handleSexChange = (event, index, value) => {
    if (value === 1) {
      this.setState({ sexValue: value, typeName: "F" });
    } else {
      this.setState({ sexValue: value, typeName: "M" });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      type,
      typeName,
      bloodType,
      bloodTypeValue,
      weight,
      height,
      sex,
      sexValue,
      age,
      diseases: [{ nameD, description }]
    } = this.state;
    const patient = {
      name,
      type,
      typeName,
      bloodType,
      bloodTypeValue,
      weight,
      height,
      sex,
      sexValue,
      age,
      diseases: [{ nameD, description }]
    };
    this.props.onSubmit(patient);
    this.props.history.push("/home");
  };

  render() {
    const {
      username,
      password,
      name,
      address,
      state,
      city,
      zipCode,
      type
    } = this.state;

    return (
      <div>
        <MuiThemeProvider>
          <NavBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>New Patient</h2>
            <form onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                label="name"
                placeholder="Name"
                name="name"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <SelectField
                floatingLabelText="type"
                value={this.state.type}
                onChange={this.handleTypeChange}
              >
                <MenuItem value={1} primaryText="Donor" />
                <MenuItem value={2} primaryText="Receptor" />
              </SelectField>
              <SelectField
                floatingLabelText="bloodType"
                value={this.state.bloodTypeValue}
                onChange={this.handleBloodTypeChange}
              >
                <MenuItem value={1} primaryText="A+" />
                <MenuItem value={2} primaryText="O+" />
              </SelectField>
              <SelectField
                floatingLabelText="sex"
                value={this.state.sexValue}
                onChange={this.handleSexChange}
              >
                <MenuItem value={1} primaryText="F" />
                <MenuItem value={2} primaryText="M" />
              </SelectField>
              <TextField
                margin="normal"
                label="weight"
                placeholder="Weight"
                name="weight"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="height"
                placeholder="Height"
                name="height"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="age"
                placeholder="Age"
                name="age"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <br />
              <h3>Diseases</h3>
              <TextField
                margin="normal"
                label="nameD"
                placeholder="Name"
                name="nameD"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="description"
                placeholder="Description"
                name="description"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <FloatingActionButton
                secondary={true}
                type="submit"
                style={style}
              >
                <Send />
              </FloatingActionButton>
            </form>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

const withRedux = connect(null, dispatch => {
  return {
    onSubmit: patient => {
      dispatch(action.addPatient(patient));
    }
  };
});

export default withRedux(Singup);
