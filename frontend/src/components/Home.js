import React, { Component } from "react";
import { withRouter, Redirect} from "react-router";
import { connect } from "react-redux";
import * as action from "./reducers/actions";
import { selectors } from "./reducers";
import NavBar from "./NavBar";
import { MuiThemeProvider } from "material-ui/styles";
import DonationList from "./Agents/DonationList";
import AddIcon from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Logo from "../images/hospital2.svg";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";

import AuthService from '../services/AuthService'
import DataService from '../services/DataService'

const style = {
    marginRight: 20
};


class Home extends Component {

    constructor(props) {
        super(props);
        let currentUser = AuthService.currentUser()
        this.state = {
            currentUser: currentUser,
            redirect: currentUser ? false : false,
            donations: []
        }
    }

    componentDidMount() {
        let self = this;
        DataService.getDonationsByOwner(this.state.currentUser.id).then(
            function success(res) {
                self.setState(...self.state, {donations: res.data.donations});
            },
            function error(res) {
                console.error(res)
            })
    }

    render() {

        const {redirect, donations} = this.state;

        if(redirect) {
            return <Redirect to='/home'/>
        }


        return (
            <div>

                <NavBar />


                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={<Avatar src={Logo} />}
                    >
                        <h3>{this.state.currentUser.username} ({this.state.currentUser.fullName})</h3>
                    </ListItem>
                </List>

                <br/>

                <div className="patientList">
                    <DonationList patients={donations} />
                </div>

                <div className="addIcon">

                    <FloatingActionButton
                        secondary={true}
                        style={style}
                        containerElement={<Link to="/donations/new" />}
                    >
                        <AddIcon />
                    </FloatingActionButton>

                </div>
            </div>
        );
    }
}

export default Home;
