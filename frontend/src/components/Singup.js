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
  username: "",
  password: "",
  name: "",
  address: "",
  state: "",
  city: "",
  zipCode: "",
  type: 1,
  typeName: ""
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
      this.setState({ type: value, typeName: "Hospital" });
    } else {
      this.setState({ type: value, typeName: "Bank" });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      username,
      password,
      name,
      address,
      state,
      city,
      zipCode,
      type,
      typeName
    } = this.state;
    const user = {
      username,
      password,
      name,
      address,
      state,
      city,
      zipCode,
      type,
      typeName
    };
    this.props.onSubmit(user);
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
            <h2>Singup</h2>
            <form onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                label="username"
                placeholder="Username"
                name="username"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="name"
                placeholder="Name"
                name="name"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="address"
                placeholder="Address"
                name="address"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="state"
                placeholder="State"
                name="state"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="city"
                placeholder="City"
                name="city"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="zipCode"
                placeholder="Zip Code"
                name="zipCode"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <SelectField
                floatingLabelText="type"
                value={this.state.type}
                onChange={this.handleTypeChange}
              >
                <MenuItem value={1} primaryText="Hospital" />
                <MenuItem value={2} primaryText="Bank" />
              </SelectField>
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
    onSubmit: user => {
      dispatch(action.addUser(user));
    }
  };
});

export default withRedux(Singup);
