'use strict'

const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')

const {BloodPayload, CreateAgentPayload, CreateDonationPayload} = require('./blood_payload')

const { BLOOD_NAMESPACE, BLOOD_FAMILY, BloodState } = require('./blood_state')


class BloodHandler extends TransactionHandler {

    constructor() {
        super(BLOOD_FAMILY, ['1.0'], BLOOD_NAMESPACE)
    }

    apply(transaction, context) {

        let payload = BloodPayload.fromBytes(transaction.payload)
        let bloodState = new BloodState(context)

        // Create Agent
        if(payload instanceof CreateAgentPayload) {
            console.log("Received Creation request for new Agent")

            return bloodState.getAgent(payload.name)
                .then(
                    (agent) => {
                        if(agent !== undefined) {
                            console.log("Agent already Exists: ", agent)
                            throw new InvalidTransaction('Invalid Action: Agent already exists')
                        }

                        let createdAgent = {
                            name: payload.name,
                            type: payload.type
                        }

                        console.log("Attempting to create agent")
                        return bloodState.createAgent(payload.name, createdAgent)
                    }
                )
        } else if (payload instanceof CreateDonationPayload) {
            console.log("Received Creation request for new Donation")

            return bloodState.getDonation(payload.id)
                .then(
                    (donation) => {
                        if(donation !== undefined) {
                            console.log("Donation already Exists: ", donation)
                            throw new InvalidTransaction('Invalid Action: Donation already exists')
                        }

                        let createdDonation = {
                            id: payload.id,
                            agentOwner: payload.agentOwner,
                            temperature: payload.temperature,
                            weight : payload.weight,
                            bloodGroup : payload.bloodGroup,
                            bloodRH: payload.bloodRH,
                            knownHealthIssues: payload.knownHealthIssues
                        }

                        console.log("Attempting to create donation", createdDonation)
                        return bloodState.createDonations(payload.id, createdDonation)
                    }
                )

        }

        // todo add additional functionalities
    }
}

module.exports = BloodHandler
