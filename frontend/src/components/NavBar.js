import React from "react";
import { Link, Redirect } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import AuthService from '../services/AuthService';

const style = {
    title: {
        cursor: "pointer"
    }
};


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            redirect: false
        };

        this.logout = this.logout.bind(this);
    }

    handleToggle() {
        this.setState({ open: !this.state.open });
    }

    logout() {
        AuthService.logout().then(
            () => {
                console.log("Succesfully logged out")
                this.setState({redirect : true});
            })
    }

    render() {

        const {redirect} = this.state;

        if(redirect) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <AppBar
                    onLeftIconButtonClick={this.handleToggle.bind(this)}
                    title={<span style={style.title}>BloodChain</span>}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={open => this.setState({ open })}
                >
                    <List>
                        <ListItem
                            containerElement={<Link to="/home" />}
                            onClick={this.handleToggle}
                            primaryText="Home"
                        />
                        <ListItem
                            containerElement={<Link to="/user/1/transactions" />}
                            onClick={this.handleToggle}
                            primaryText="Transactions"
                        />
                        <ListItem
                            onClick={this.logout}
                            primaryText="Logout"
                        />
                    </List>
                </Drawer>
            </div>
        );
    }
}
