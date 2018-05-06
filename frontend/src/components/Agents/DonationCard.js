import React from "react";
import "./DonationCard.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router-dom";
import { MuiThemeProvider } from "material-ui/styles";
import AddIcon from "material-ui/svg-icons/content/add";

const style = {
    marginRight: 20
};
const DonationCard = patient => (
    <div className="card">
        <List>
            <ListItem
                disabled={true}
                leftAvatar={
                    <Avatar>
                        {patient.patient.bloodType}
                        {"\t"}
                        {patient.patient.RH}
                    </Avatar>
                }
            >
                <div className="container">
                    <h4>
                        <b>{patient.patient.name}</b>
                    </h4>
                    {patient.patient.bloodType} {patient.patient.RH}
                    {patient.patient.weight} - {patient.patient.temperature}
                    {patient.patient.degree}
                    <div className="goIcon">
                        <MuiThemeProvider>
                            <FloatingActionButton
                                secondary={true}
                                style={style}
                                containerElement={
                                    <Link to="/user/1/donation" />
                                }
                            >
                                <AddIcon />
                            </FloatingActionButton>
                        </MuiThemeProvider>
                    </div>
                </div>

                <br />
            </ListItem>
        </List>
    </div>
);
export default DonationCard;
