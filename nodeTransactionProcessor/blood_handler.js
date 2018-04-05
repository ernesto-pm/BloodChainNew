'use strict'

const TransactionHandler    = require('sawtooth-sdk/processor/handler').TransactionHandler
const InvalidTransaction    = require('sawtooth-sdk/processor/exceptions').InvalidTransaction
const BloodPayload          = require('./blood_payload').BloodPayload
const CreateAgentPayload    = require('./blood_payload').CreateAgentPayload

const BloodState        = require('./blood_state').BloodState
const BLOOD_FAMILY      = require('./blood_state').BLOOD_FAMILY
const BLOOD_NAMESPACE   = require('./blood_state').BLOOD_NAMESPACE


class BloodHandler extends TransactionHandler {
    constructor() {
        super(BLOOD_FAMILY, ['1.0'], BLOOD_NAMESPACE)
    }

    apply(transaction, context) {

        let payload = BloodPayload.fromBytes(transaction.payload)

        if(payload instanceof CreateAgentPayload) {
            //console.log("Payload is Instance of Create Agent")
            //console.log("Payload ->", payload);
        }



        /*
        let bloodState  = new BloodState(context)

        if(payload.action === 'create') {
            return bloodState.getDonation(payload.id)
                .then((donation) => {
                    if(donation !== undefined) {
                        throw new InvalidTransaction('Invalid Action: Blood donation already exists')
                    }

                    let createdDonation = {
                        id: payload.id,
                        blood: {
                            temperature: payload.temperature,
                            weight: payload.weight
                        }
                    }

                    console.log("Blood donation registered succesfully")

                    return bloodState.createDonation(payload.id, createdDonation)
                })

        } else if(payload.action === 'update') {

        } else if(payload.action === 'finalize') {

        } else {
            throw new InvalidTransaction('Invalid action')
        }
        //console.log("++++ Transaction ++++")
        //console.log(transactionProcessRequest)

        //console.log("++++ Context ++++")
        //console.log(context)
        */
    }
}

module.exports = BloodHandler
