import React from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";

const style = {
  title: {
    cursor: "pointer"
  }
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
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
              onTouchTap={this.handleToggle}
              primaryText="Home"
            />
            <ListItem
              containerElement={<Link to="/" />}
              onTouchTap={this.handleToggle}
              primaryText="Logout"
            />
          </List>
        </Drawer>
      </div>
    );
  }
}
