import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as action from "./reducers/actions";
import { selectors } from "./reducers";
import NavBar from "./NavBar";
import { MuiThemeProvider } from "material-ui/styles";
import PatientList from "./PatientList";
import AddIcon from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Logo from "../images/hospital2.svg";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";

const style = {
  marginRight: 20
};
class Home extends Component {
  render() {
    const { patients } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <NavBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <List>
            <ListItem disabled={true} leftAvatar={<Avatar src={Logo} />}>
              <h3>Hospital Ángeles</h3>
            </ListItem>
          </List>
        </MuiThemeProvider>

        <br />
        <MuiThemeProvider>
          <div className="patientList">
            <PatientList patients={patients} />
          </div>
        </MuiThemeProvider>
        <div className="addIcon">
          <MuiThemeProvider>
            <FloatingActionButton
              secondary={true}
              style={style}
              containerElement={<Link to="/patients/new" />}
            >
              <AddIcon />
            </FloatingActionButton>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const withRedux = connect(
  state => ({
    patients: selectors.getPatientList(state)
  }),
  null
);

export default withRedux(Home);
