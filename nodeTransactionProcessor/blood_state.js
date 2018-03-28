'use strict'

const crypto = require('crypto')

class BloodState {
    constructor(context) {
        this.context        = context
        this.addressCache   = new Map([])
        this.timeout        = 500 //ms
    }

}

// Function that creates a new hash for parameter 'x'
const createHash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)

// Custom transaction family we are creating
const BLOOD_FAMILY = 'blood'

// Creates the hash corresponding to the transaction family
const BLOOD_NAMESPACE = createHash(BLOOD_FAMILY).substring(0, 6)

// Paste bloodspace plus the hash generated
const makeBloodAddress = (x) => BLOOD_NAMESPACE + createHash(x)

const deserialize = (data) => {
    let bloodArray = data.split('|')
        .map(x => x.split(','))
        .map(x => [x[0], {state: x[0]}])
}

const serialize = (entries) => {
    let bloodStrings = []
    for(let entry of entries) {
        let ID      = entry[0]
        let blood   = entry[1]
        bloodStrings.push([ID, blood.state].join(','))
    }

    bloodStrings.sort()

    return Buffer.from(bloodStrings.join('|'))
}


module.exports = {
    BLOOD_NAMESPACE,
    BLOOD_FAMILY,
    BloodState
}