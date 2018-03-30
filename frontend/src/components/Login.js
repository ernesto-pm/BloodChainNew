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
import AppBar from "material-ui/AppBar";
import Icon from "../images/iconDrop.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import "./App.css";
import _ from "lodash";
import { Link } from "react-router-dom";

const style = {
  marginLeft: "95%"
};

const initialState = {
  users: [
    {
      id: 1,
      username: "dany",
      password: "1234",
      type: "hospital"
    },
    {
      id: 2,
      username: "ernie",
      password: "1234",
      type: "hospital"
    },
    { id: 3, username: "itzi", password: "1234", type: "bank" },
    { id: 4, username: "keki", password: "1234", type: "bank" }
  ],
  logged: false
};

class Login extends Component {
  constructor(props) {
    super();
    this.state = { initialState };
  }

  componentDidMount() {
    this.setState(initialState);
  }
  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ ...this.state, [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.confirmUser(username, password);
  };

  confirmUser = (username, passw) => {
    _.find(this.state.users, user => {
      if (user.username === username && user.password === passw) {
        return this.setState({
          ...initialState,
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
          <AppBar
            title="Login"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
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

export default withRouter(Login);
