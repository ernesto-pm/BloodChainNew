'use strict'

const TransactionProcessor  = require('sawtooth-sdk/processor').TransactionProcessor;
const BloodHandler          = require('./blood_handler')

if(process.argv.length < 3) {
    console.log("Missing a validator address")
    process.exit(1)
}

const address = process.argv[2]

const transactionProcessor = new TransactionProcessor(address);
transactionProcessor.addHandler(new BloodHandler())

transactionProcessor.start()