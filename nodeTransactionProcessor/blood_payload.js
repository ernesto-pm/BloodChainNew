/*
    Contains class declaration for the type of transaction payload we want to create
 */

'use strict'

const InvalidTransaction = require('sawtooth-sdk/processor/exceptions').InvalidTransaction

class BloodPayload {
    constructor(id, temperature, weight) {
        this.id             = id
        this.temperature    = temperature
        this.weight         = weight
    }

    static fromBytes(payload) {
        payload = payload.toString().split(',')
        if(payload.length == 3) {
            let bloodPayload = new BloodPayload(payload[0], payload[1], payload[2])

            if(!bloodPayload.id) {
                throw new InvalidTransaction('ID is required')
            }

            if(!bloodPayload.temperature) {
                throw new InvalidTransaction('Temperature is required')
            }

            if(!bloodPayload.weight) {
                throw new InvalidTransaction('Weight is required')
            }

            return bloodPayload

        } else {
            throw new InvalidTransaction('Invalid payload serialization')
        }
    }
}

module.exports = BloodPayload