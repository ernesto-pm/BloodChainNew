import React from "react";
import NavBar from "./NavBar";
import { MuiThemeProvider } from "material-ui/styles";
const Transactions = ({ actors }) => (
  <div>
    <MuiThemeProvider>
      <NavBar />
    </MuiThemeProvider>
    <h1>Blockchain Transactions Component</h1>
  </div>
);
export default Transactions;
