import axios from 'axios'
import React, { Component } from "react";

const serverURL = 'http://localhost:8016'

class AuthService extends Component {

    static saveToken(token) {
        window.localStorage['blood-token'] = token;
    }

    static getToken(token) {
        return window.localStorage['blood-token'];
    }

    static currentUser() {
        if(this.isLoggedIn()) {
            let token = this.getToken();
            let payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);
            return {...payload}
        } else {
            return null;
        }
    }

    static isLoggedIn() {
        let token = this.getToken();
        let payload;
        if(token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }

    }


}

export default AuthService
