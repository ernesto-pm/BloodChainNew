import React from "react";
import "./DonationCard.css";
import ListItem from "material-ui/List/ListItem";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";
import DonationCard from "./DonationCard";

const DonationList = ({ patients }) => {

    console.log(patients)

    return (
        <div className="list">
            <ul>
                {patients.map((patient, i) => (
                    <DonationCard patient={patient} key={i} />
                ))}
            </ul>
        </div>
    );
}
export default DonationList;
