import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
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

class IndexComponent extends Component {
  render() {
    return (
      <div style={{ widht: "100px", padding: "10%", margin: "0 auto" }}>
        <MuiThemeProvider>
          <Card
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              transition: "0.3s",
              padding: "2px 16px"
            }}
          >
            <CardMedia>
              <img src={Logo} alt="" />
            </CardMedia>
            <CardTitle
              title="Welcome to BloodChain!"
              style={{ textAlign: "center" }}
            />
            <CardText>
              <h3>
                Do you feel you don’t have much to offer? You have the most
                precious resource of all: the ability to save a life by donating
                blood! Help share this invaluable gift with someone in need.
              </h3>
            </CardText>
            <CardActions style={{ textAlign: "center" }}>
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                <FlatButton label="Login" primary={true} />
              </Link>

              <Link to={`/singup`} style={{ textDecoration: "none" }}>
                <FlatButton label="Singup" secondary={true} />
              </Link>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(IndexComponent);
