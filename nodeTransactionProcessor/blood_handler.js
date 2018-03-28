'use strict'

const TransactionHandler    = require('sawtooth-sdk/processor/handler').TransactionHandler
const BloodPayload          = require('./blood_payload')

const BLOOD_FAMILY      = require('./blood_state').BLOOD_FAMILY
const BLOOD_NAMESPACE   = require('./blood_state').BLOOD_NAMESPACE

class BloodHandler extends TransactionHandler {
    constructor() {
        super(BLOOD_FAMILY, ['1.0'], BLOOD_NAMESPACE)
    }

    apply(transactionProcessRequest, context) {
        console.log(transactionProcessRequest)
    }
}

module.exports = BloodHandler