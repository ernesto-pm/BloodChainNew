import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { MuiThemeProvider } from "material-ui/styles";
import Logo from "../images/BChain.png";
import RedBackground from "../images/RedBackground.jpg";
import Particles from "react-particles-js";

class IndexComponent extends Component {
    render() {
        return (
            <div style={{ height: "100%", widht: "100%" }}>
                <div
                    style={{
                        justifyContent: "center",
                        display: "grid",
                        width: "100%",
                        height: "100%",
                        gridTemplateColumns: "repeat(1, 1fr)",
                        gridTemplateRows: "repeat(3, 110px)"
                    }}
                >
                    <div
                        style={{
                            gridColumn: " 1/ 2",
                            gridRow: "1/4"
                        }}
                    >
                        <Particles
                            params={{
                                particles: {
                                    number: {
                                        value: 50,
                                        density: {
                                            enable: true,
                                            value_area: 1000
                                        }
                                    },
                                    line_linked: {
                                        shadow: {
                                            enable: true,
                                            color: "rgba(255, 31, 31, 1)",
                                            blur: 1
                                        }
                                    },
                                    shape: {
                                        type: "circle",
                                        stroke: {
                                            width: 0,
                                            color: "#000000"
                                        },
                                        polygon: {
                                            nb_sides: 5
                                        }
                                    }
                                }
                            }}
                            style={{
                                width: "100%",
                                backgroundImage: `url(${RedBackground})`
                            }}
                        />
                    </div>
                    <div
                        style={{
                            gridRow: "2 / 3",
                            gridColumn: "1 / 2",
                            backgroundColor: "#0000"
                        }}
                    >
                        <MuiThemeProvider>
                            <Card
                                style={{
                                    width: "80%",
                                    margin: "auto",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                    transition: "0.3s",
                                    padding: "2px 16px",
                                    backgroundColor: "#ffff"
                                }}
                            >
                                <CardMedia>
                                    <img src={Logo} />
                                </CardMedia>
                                <CardTitle
                                    title="Welcome to BloodChain!"
                                    style={{ textAlign: "center" }}
                                >
                                    <br />
                                    <h4>
                                        Do you feel you don’t have much to
                                        offer? You have the most precious
                                        resource of all: the ability to save a
                                        life by donating blood! Help share this
                                        invaluable gift with someone in need.
                                    </h4>
                                </CardTitle>
                                <CardText />
                                <CardActions style={{ textAlign: "center" }}>
                                    <Link
                                        to={`/login`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FlatButton
                                            style={{
                                                border:
                                                    "1px solid rgba(221, 219, 218, 0.54)"
                                            }}
                                            backgroundColor="white"
                                            label="Login"
                                            primary={true}
                                        />
                                    </Link>

                                    <Link
                                        to={`/singup`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FlatButton
                                            style={{
                                                border:
                                                    "1px solid rgba(221, 219, 218, 0.54)"
                                            }}
                                            backgroundColor="white"
                                            label="Singup"
                                            secondary={true}
                                        />
                                    </Link>
                                </CardActions>
                            </Card>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(IndexComponent);
