import React from "react";
import "./Home.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
import PatientCard from "./PatientCard";

const PatientList = ({ patients }) => (
  <div className="list">
    {/* <pre>{JSON.stringify(patients, null, 2)}</pre> */}
    <ul>
      {patients.map((patient, i) => <PatientCard patients={patient} key={i} />)}
    </ul>
  </div>
);
export default PatientList;
