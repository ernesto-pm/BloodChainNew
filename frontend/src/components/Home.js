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
        <br />
        <MuiThemeProvider>
          <div className="patientList">
            <PatientList patients={patients} />
          </div>
        </MuiThemeProvider>
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
