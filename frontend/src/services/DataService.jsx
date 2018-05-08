import axios from 'axios'
import React, { Component } from "react";

const serverURL = 'http://localhost:8016'

class DataService extends Component {

    static createUser(username, password, fullName, address, userType) {
        return axios.post(`${serverURL}/api/agent`, {
            username: username,
            password: password,
            fullName: fullName,
            address: address,
            userType: userType
        })
    }

    static createDonation(identifier, agentOwner, temperature, weight, bloodGroup, bloodRH, knownHealthIssues) {
        return axios.post(`${serverURL}/api/donation`, {
            identifier: identifier,
            owner_agent: agentOwner,
            temperature: temperature,
            weight: weight,
            bloodGroup: bloodGroup,
            bloodRH: bloodRH,
            knownHealthIssues: knownHealthIssues
        })
    }

    static getDonationsByOwner(agentOwnerId) {
        return axios.post(`${serverURL}/api/owner_donations`, {
            owner_agent: agentOwnerId
        })
    }

    static checkBatchStatus(batch_id) {
        return axios.post(`${serverURL}/api/blockchain/checkBatchStatus`, {
            batch_id: batch_id
        })
    }

}

export default DataService
