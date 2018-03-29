/*
    Contains class declaration for the type of transaction payload we want to create
 */

'use strict'

const InvalidTransaction = require('sawtooth-sdk/processor/exceptions').InvalidTransaction

class BloodPayload {
    constructor(id, temperature, weight, action) {
        this.id             = id
        this.temperature    = temperature
        this.weight         = weight
        this.action         = action
    }

    static fromBytes(payload) {
        payload = payload.toString().split(',')
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
    }
}

module.exports = BloodPayload