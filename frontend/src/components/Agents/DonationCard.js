import React, { Component } from "react";
import { withRouter, Redirect } from "react-router";
import "./DonationCard.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router-dom";
import { MuiThemeProvider } from "material-ui/styles";
import AddIcon from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import PersonIcon from "material-ui-icons/Person";
import { FlatButton } from "material-ui";
import CheckIcon from "material-ui-icons/CheckCircle";

const style = {
    marginRight: 20
};
class DonationCard extends Component {
    state = {
        open: false,
        redirect: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleDonate = () => {
        console.log("DONATE!!!!");
        this.setState({
            redirect: true
        });
    };
    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/user/1/transactions" />;
        }

        const patient = this.props;
        const actions = [
            <FlatButton
                label="Donate"
                labelPosition="before"
                primary={true}
                icon={<CheckIcon />}
                onClick={this.handleDonate}
            />
        ];
        return (
            <div className="card">
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar>
                                {patient.patient.bloodType}
                                {"\t"}
                                {patient.patient.rhType}
                            </Avatar>
                        }
                    >
                        <div className="container">
                            <h4>
                                <b>{patient.patient.name}</b>
                            </h4>
                            {patient.patient.bloodType} {patient.patient.RH}
                            {patient.patient.weight} -{" "}
                            {patient.patient.temperature}
                            {patient.patient.degree}
                            <div className="goIcon">
                                <MuiThemeProvider>
                                    <FloatingActionButton
                                        secondary={true}
                                        style={style}
                                        onClick={this.handleClickOpen}
                                    >
                                        <AddIcon />
                                    </FloatingActionButton>
                                </MuiThemeProvider>
                            </div>
                        </div>

                        <br />
                    </ListItem>
                </List>
                <Dialog
                    title={patient.patient.name}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <Avatar style={{ width: 60, height: 60 }}>
                        <PersonIcon style={{ width: 50, height: 50 }} />
                    </Avatar>
                    <p> Owner:{" agentowner"}</p>
                    <p>
                        Name:
                        {" " + patient.patient.name + " "}
                    </p>
                    <p>
                        Blood Type:{" "}
                        {" " +
                            patient.patient.bloodType +
                            patient.patient.rhType}
                    </p>
                    <p>
                        Temperature:{" "}
                        {" " +
                            patient.patient.temperature +
                            patient.patient.degree}
                    </p>
                    <p>Weight:{" " + patient.patient.weight}</p>
                </Dialog>
            </div>
        );
    }
}

export default DonationCard;
