/*
    Contains class declaration for the type of transaction payload we want to create
 */

'use strict'

const InvalidTransaction = require('sawtooth-sdk/processor/exceptions').InvalidTransaction

var actionEnum = Object.freeze({
    "CREATE_AGENT" : "1",
    "CREATE_DONATION" : "2"
})

class CreateAgentPayload {
    constructor(name) {
        this.name       = name;
        this.timeStamp  = new Date();
    }
}

class BloodPayload {

    constructor(id, action, timestamp) {
        this.id         = id;
        this.action     = action;
        this.timeStamp  = timestamp;
    }

    static fromBytes(payload) {
        payload = payload.toString().split(',')
        let action  = payload[0]

        if(action === "CREATE_AGENT") {
            // If action was Create Agent, payload should just contain the name of the Agent
            if(payload.length !== 2) throw new InvalidTransaction('Invalid payload serialization')

            let name = payload[1];
            let agentCreationPayload = new CreateAgentPayload(name);

            if(!agentCreationPayload.name) throw new InvalidTransaction('Name is required');

            if (agentCreationPayload.name.indexOf('|') !== -1) throw new InvalidTransaction('Name cannot contain "|"')

            return agentCreationPayload;
        }
    }
}

module.exports = {BloodPayload, CreateAgentPayload}
