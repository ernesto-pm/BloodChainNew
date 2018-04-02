import React, { Component } from "react";
import { withRouter, Redirect } from "react-router";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { MuiThemeProvider } from "material-ui/styles";
import Logo from "../images/BloodChain.png";
import Icon from "../images/iconDrop.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import "./App.css";
import _ from "lodash";
import { Link } from "react-router-dom";
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
  logged: false
};

class Login extends Component {
  constructor(props) {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    this.setState({
      username: "",
      password: "",
      logged: false
    });
  }
  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ ...this.state, [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(this.props.users);
    this.confirmUser(username, password);
  };

  confirmUser = (username, passw) => {
    _.find(this.props.users, user => {
      if (user.username === username && user.password === passw) {
        return this.setState({
          ...this.state,
          logged: true
        });
      } else {
        return console.log("ERROR: User not found");
      }
    });
  };

  render() {
    const logged = this.state.logged;

    if (logged) {
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <MuiThemeProvider>
          <NavBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div className="LoginForm">
            <Card>
              <img src={Logo} alt="" width=" 70%" />
              <CardText>
                <div
                  style={{ padding: 16, marginBottom: 8, textAlign: "center" }}
                >
                  <form onSubmit={this.handleSubmit}>
                    <TextField
                      margin="username"
                      label="username"
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange.bind(this)}
                      fullWidth
                      required
                    />
                    <br />
                    <TextField
                      margin="password"
                      label="password"
                      placeholder="Password"
                      name="password"
                      type="password"
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
                </div>
              </CardText>
            </Card>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const withRedux = connect(
  state => ({
    users: selectors.getUserList(state)
  }),
  null
);

export default withRedux(Login);
