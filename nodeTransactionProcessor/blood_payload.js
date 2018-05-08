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
    constructor(id, agentOwner, temperature, weight, bloodGroup, bloodRH, knownHealthIssues) {
        this.id                 = id;
        this.agentOwner         = agentOwner;
        this.temperature        = temperature;
        this.weight             = weight;
        this.bloodGroup         = bloodGroup;
        this.bloodRH            = bloodRH;
        this.knownHealthIssues  = knownHealthIssues;
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

            if(payload.length !== 8) throw new InvalidTransaction('Invalid payload serialization')

            let id                  = payload[1]
            let agentOwner          = payload[2]
            let temperature         = payload[3]
            let weight              = payload[4]
            let bloodGroup          = payload[5]
            let bloodRH             = payload[6]
            let knownHealthIssues   = payload[7]

            let donationCreationPayload = new CreateDonationPayload(id, agentOwner, temperature, weight, bloodGroup, bloodRH, knownHealthIssues);

            if(!donationCreationPayload.id)             throw new InvalidTransaction('ID is required');
            if(!donationCreationPayload.agentOwner)     throw new InvalidTransaction('Owner is required');
            if(!donationCreationPayload.temperature)    throw new InvalidTransaction('Temperature is required');
            if(!donationCreationPayload.weight)         throw new InvalidTransaction('Weight is required');
            if(!donationCreationPayload.bloodGroup)     throw new InvalidTransaction('Blood Group is required');
            if(!donationCreationPayload.bloodRH)        throw new InvalidTransaction('Blood RH is required');
            if(!donationCreationPayload.knownHealthIssues) throw new InvalidTransaction('Known health issues is required');

            return donationCreationPayload;
        }
    }
}

module.exports = {BloodPayload, CreateAgentPayload, CreateDonationPayload}
