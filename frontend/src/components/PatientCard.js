import React from "react";
import "./Home.css";
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
const PatientCard = patient => (
  <div className="card">
    <List>
      <ListItem
        disabled={true}
        leftAvatar={<Avatar>{patient.patient.bloodType}</Avatar>}
      >
        <div className="container">
          <h4>
            <b>{patient.patient.name}</b>
          </h4>
          {patient.patient.diseases.map((disease, i) => (
            <div key={i}>
              {disease.name} - {disease.description}
            </div>
          ))}
          {patient.patient.age} years
          <div className="goIcon">
            <MuiThemeProvider>
              <FloatingActionButton
                secondary={true}
                style={style}
                containerElement={<Link to="/user/1/patientDetail" />}
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
export default PatientCard;
