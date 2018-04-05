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
        this.name   = name;
    }
}

class CreateDonationAction {
    constructor(id, type, weight, temperature, location) {
        this.id             = id;
        this.type           = type;
        this.weight         = weight;
        this.temperature    = temperature;
        this.location       = location;
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
        let id      = payload[0]
        let action  = payload[1]

        if(action === "CREATE_AGENT") {
            // If action was Create Agent, payload should just contain the name of the Agent apart from the id and action
            if(payload.length !== 3) throw new InvalidTransaction('Invalid payload serialization')

            let name = payload[2];
            let agentCreationPayload = new CreateAgentPayload(name);

            if(!agentCreationPayload.name) {
                throw new InvalidTransaction('Name is required');
            }

            return agentCreationPayload;
        }

        /*
        if(payload.length === 4) {
            let bloodPayload = new BloodPayload(payload[0], payload[1], payload[2], payload[3])

            if(!bloodPayload.id) {
                throw new InvalidTransaction('ID is required')
            }

            if(!bloodPayload.temperature) {
                throw new InvalidTransaction('Temperature is required')
            }

            if(!bloodPayload.weight) {
                throw new InvalidTransaction('Weight is required')
            }

            if(!bloodPayload.action) {
                throw new InvalidTransaction('Action is required')
            }

            return bloodPayload

        } else {
            throw new InvalidTransaction('Invalid payload serialization')
        }
        */
    }
}

module.exports = {BloodPayload, CreateAgentPayload}
