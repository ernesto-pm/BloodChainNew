'use strict'

const crypto = require('crypto')

class BloodState {

    constructor(context) {
        this.context        = context
        this.addressCache   = new Map([])
        this.timeout        = 500 //ms
    }

    getDonation(id) {
        return this.loadDonations(id).then((donations) => {
            console.log(donations)
            donations.get(id)
        })
    }

    createDonation(id, donation) {
        let address = makeBloodAddress(id)

        return this.loadDonations(id).then( (donations) => {
            donations.set(id, donation)
            return donations
        }).then( (donations) => {
            let data = serialize(donations)

            this.addressCache.set(address, data)
            let entries = {
                [address]: data
            }

            return this.context.setState(entries, this.timeout)
        })
    }

    loadDonations(id) {
        let address = makeBloodAddress(id)

        if(this.addressCache.has(address)) {
            //console.log("******** Address cache contains address *******")
            if(this.addressCache.get(address) === null) {
                return Promise.resolve(new Map([]))
            } else {
                return Promise.resolve(deserialize(this.addressCache.get(address)))
            }

        } else {
            //console.log("******** Address cache does not contain address *******")
            return this.context.getState([address], this.timeout)
                .then((addressValues) => {
                    if(!addressValues[address].toString()) {
                        this.addressCache.set(address, null)
                        return new Map([])
                    } else {
                        let data = addressValues[address].toString()
                        this.addressCache.set(address, data)
                        return deserialize(data)
                    }
                })
        }
    }

}

const AGENT = 'ae'

// Function that creates a new hash for parameter 'x'
const createHash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)

const createSmallerHash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 62)

// Custom transaction family we are creating
const BLOOD_FAMILY = 'blood'

// Creates the hash corresponding to the transaction family
const BLOOD_NAMESPACE = createHash(BLOOD_FAMILY).substring(0, 6)

// Paste bloodspace plus the hash generated
const makeBloodAddress = (x) => BLOOD_NAMESPACE + createHash(x)

const makeAgentAddress = (id) => BLOOD_NAMESPACE + AGENT + createSmallerHash(id)

const deserialize = (data) => {
    let bloodArray = data.split('|')
        .map(x => x.split(','))
        .map(x => [x[0], {id: x[0], blood: x[1]}])
    return new Map(bloodArray)
}

const serialize = (entries) => {
    let bloodStrings = []
    for(let entry of entries) {
        let ID      = entry[0]
        let blood   = entry[1]
        bloodStrings.push([ID, blood].join(','))
    }

    bloodStrings.sort()

    return Buffer.from(bloodStrings.join('|'))
}


module.exports = {
    BLOOD_NAMESPACE,
    BLOOD_FAMILY,
    BloodState
}
