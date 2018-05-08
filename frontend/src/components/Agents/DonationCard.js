import React, { Component } from "react";
import { withRouter, Redirect } from "react-router";
import "./DonationCard.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";

import { Link } from "react-router-dom";
import { MuiThemeProvider } from "material-ui/styles";
import AddIcon from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import PersonIcon from "material-ui-icons/Person";
import { FlatButton } from "material-ui";
import CheckIcon from "material-ui-icons/CheckCircle";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import axios from 'axios'
import DataService from "../../services/DataService"

const style = {
    marginRight: 20
};
class DonationCard extends Component {

    constructor(props) {
        super(props);
        this.checkBlockchainStatus = this.checkBlockchainStatus.bind(this);
    }

    state = {
        open: false,
        redirect: false,
        blockchain_status: ''
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

    checkBlockchainStatus = () => {
        let self = this;
        DataService.checkBatchStatus(this.props.patient.blockchain_batch_id).then(
            function success(res) {
                console.log(res)
                self.setState(...self.state, {blockchain_status: res.data[0].status})
            }
        )
    }

    render() {

        const donation = this.props.patient;

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
                                {donation.bloodGroup}
                                {"\t"}
                                {donation.bloodRH}
                            </Avatar>
                        }
                    >
                        <div className="container">
                            <h4>
                                <b>{donation.identifier}</b>
                            </h4>

                            <p>
                                Blood Type: {donation.bloodGroup} {donation.bloodRH}
                            </p>

                            <p>
                                Temperature: {donation.temperature} ℃
                            </p>

                            <p>
                                Weight: {donation.weight} kg
                            </p>

                            <p>
                                Known Health Issues: { donation.knownHealthIssues.split(";").map( (hi) => (
                                    <span>{hi} </span>
                            ))}
                            </p>

                            <p>
                                Blockchain Status: <span style={{color: "red"}}>{this.state.blockchain_status}</span>
                            </p>

                            <p>
                                Blockchain ID: "{donation.blockchain_batch_id}"
                            </p>


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

                        <CardActions>
                            <RaisedButton label="Check Blockchain Status" onClick={this.checkBlockchainStatus} primary = {true} />
                        </CardActions>

                        <br />
                    </ListItem>
                </List>

                <Dialog
                    title={donation.identifier}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <Avatar style={{ width: 60, height: 60 }}>
                        <PersonIcon style={{ width: 50, height: 50 }} />
                    </Avatar>
                    <p> Owner: {donation.owner_agent} </p>


                </Dialog>


            </div>
        );
    }
}

export default DonationCard;
