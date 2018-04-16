'use strict'

const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')

const BloodPayload          = require('./blood_payload').BloodPayload
const CreateAgentPayload    = require('./blood_payload').CreateAgentPayload

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
        }

        // todo add additional functionalities
    }
}

module.exports = BloodHandler
