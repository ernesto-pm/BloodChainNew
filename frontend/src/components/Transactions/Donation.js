import React from "react";
import NavBar from "../NavBar";
import { MuiThemeProvider } from "material-ui/styles";

const Donation = ({ actors }) => (
    <div>
        <MuiThemeProvider>
            <NavBar />
        </MuiThemeProvider>
        <h1>Detalle / Acciones</h1>
    </div>
);
export default Donation;
