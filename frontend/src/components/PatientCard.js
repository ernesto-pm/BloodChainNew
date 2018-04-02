import React from "react";
import "./Home.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
const PatientCard = patients => (
  <div className="card">
    <List>
      <ListItem disabled={true} leftAvatar={<Avatar>A+</Avatar>}>
        <div className="container">
          <h4>
            {/* <pre>{JSON.stringify(patients[0], null, 2)}</pre> */}
            <b>John Cahl</b>
          </h4>
          <p>Diabetes - Type 1</p>
        </div>
      </ListItem>
      <br />
    </List>
  </div>
);
export default PatientCard;
