import axios from 'axios'
import React, { Component } from "react";

const serverURL = 'http://localhost:8016'

class DataService extends Component {

    static getSomething() {
        return axios.get(`${serverURL}/api/something`)
    }

    static createUser(username, password, fullName, address, userType) {
        return axios.post(`${serverURL}/api/agent`, {
            username: username,
            password: password,
            fullName: fullName,
            address: address,
            userType: userType
        })
    }

}

export default DataService
