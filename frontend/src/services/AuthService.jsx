import axios from 'axios'
import React, { Component } from "react";

const serverURL = 'http://localhost:8016'

class AuthService extends Component {

    static saveToken(token){
        window.localStorage['ds-token'] = token;
    };

    static getToken(){
        return window.localStorage['ds-token'];
    };

    static userLogin(user) {
        return axios.post(`${serverURL}/api/agent/login`, user)
            .then(function(response){
                console.log(response)
                AuthService.saveToken(response.data.token);
                //$rootScope.isLoggedIn = true;
                //$rootScope.currentUser = currentUser();
                //$rootScope.isAdminReviewing = false;
            })
    };

    static logout(){
        return new Promise(
            function(resolve, reject) {
                window.localStorage.removeItem('ds-token');
                resolve(null)
            }
        )

        //$rootScope.isLoggedIn = false;
        //$rootScope.currentUser = null;
    };

    static currentUser(){
        if(AuthService.isLoggedIn()){
            var token = AuthService.getToken();
            var payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);
            return{
                id: payload._id,
                username: payload.username,
                fullName: payload.fullName,
                address: payload.address,
                userType: payload.userType,
                exp: payload.exp
            };
        }else{
            return null;
        }
    };

    static isLoggedIn(){
        var token = AuthService.getToken();
        var payload;
        if(token){
            payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
        }else{
            return false;
        }
    };

}

export default AuthService
