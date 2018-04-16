/*
    Contains class declaration for the type of transaction payload we want to create
 */

'use strict'

const {InvalidTransaction} = require('sawtooth-sdk/processor/exceptions')

class CreateAgentPayload {
    constructor(name, type) {
        this.name       = name;
        this.timeStamp  = new Date();
        this.type       = type;
    }
}

class CreateDonationPayload {
    constructor(agentOwner, temperature, weight, bloodType) {
        this.agentOwner = agentOwner;
        this.temperature = temperature;
        this.weight = weight;
        this.bloodType = bloodType;
    }
}

class BloodPayload {

    static fromBytes(payload) {
        payload = payload.toString().split(',')
        let action  = payload[0]

        if(action === "CREATE_AGENT") {

            if(payload.length !== 3) throw new InvalidTransaction('Invalid payload serialization')

            let name = payload[1];
            let type = payload[2];

            let agentCreationPayload = new CreateAgentPayload(name, type);

            if(!agentCreationPayload.name)                      throw new InvalidTransaction('Name is required');
            if(!agentCreationPayload.type)                      throw new InvalidTransaction('Type is required');
            if (agentCreationPayload.name.indexOf('|') !== -1)  throw new InvalidTransaction('Name cannot contain "|"')

            return agentCreationPayload;

        } else if (action === "CREATE_DONATION") {

            if(payload.length !== 5) throw new InvalidTransaction('Invalid payload serialization')

            let agentOwner = payload[1]
            let temperature = payload[2]
            let weight = payload[3]
            let bloodType = payload[4]

            let donationCreationPayload = new CreateDonationPayload(agentOwner, temperature, weight, bloodType);

            if(!donationCreationPayload.agentOwner)     throw new InvalidTransaction('Owner is required');
            if(!donationCreationPayload.temperature)    throw new InvalidTransaction('Temperature is required');
            if(!donationCreationPayload.weight)         throw new InvalidTransaction('Weight is required');
            if(!donationCreationPayload.bloodType)      throw new InvalidTransaction('Type is required');

            return donationCreationPayload;
        }
    }
}

module.exports = {BloodPayload, CreateAgentPayload, CreateDonationPayload}
