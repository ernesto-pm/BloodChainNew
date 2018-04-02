import React from "react";
import "./Home.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
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
        </div>
      </ListItem>
      <br />
    </List>
  </div>
);
export default PatientCard;
