import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as action from "./reducers/actions";
import { selectors } from "./reducers";
import NavBar from "./NavBar";
import { MuiThemeProvider } from "material-ui/styles";
import PatientList from "./PatientList";

class Home extends Component {
  render() {
    const { patients } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <NavBar />
        </MuiThemeProvider>
        <br />
        <MuiThemeProvider>
          <PatientList patients={patients} />
        </MuiThemeProvider>
        {/* <pre>{JSON.stringify(patients, null, 2)}</pre> */}
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
