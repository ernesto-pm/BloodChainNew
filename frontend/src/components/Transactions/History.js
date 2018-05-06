import React from "react";
import NavBar from "../NavBar";
import { MuiThemeProvider } from "material-ui/styles";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import AddIcon from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router-dom";

const style = {
    marginRight: 20
};
const HistoryTx = ({ actors }) => (
    <div>
        <MuiThemeProvider>
            <NavBar />

            <h1>Blockchain Transactions Component</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Banco de Sangre</TableHeaderColumn>
                        <TableHeaderColumn>Tipo de Sangre</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>Médica Sur</TableRowColumn>
                        <TableRowColumn>A+</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>
                            Instituto Nacional de Nutrición
                        </TableRowColumn>
                        <TableRowColumn>O+</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </MuiThemeProvider>
    </div>
);
export default HistoryTx;
