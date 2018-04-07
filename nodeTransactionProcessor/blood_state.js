'use strict'

const crypto = require('crypto')
const {InvalidTransaction} = require('sawtooth-sdk/processor/exceptions')

class BloodState {

    constructor(context) {
        this.context        = context
        this.addressCache   = new Map([])
        this.timeout        = 500 //ms
    }

    getAgent(name) {
        return this.loadAgents(name).then((agents) => agents.get(name))
    }

    createAgent(name) {
        let address = makeAddress(name)

        return this.loadAgents(name)
            .then(
                (agents) => {
                    agents.set(name, name)
                    return agents
                })
            .then(
                (agents) => {
                    let data = serializeAgent(agents)

                    this.addressCache.set(address, data)
                    let entries = {
                        [address] : data
                    }

                    console.log("Setting agent in blockchain state... please check console for details/errors")
                    return this.context.setState(entries, this.timeout)
                })

    }

    loadAgents(name) {
        let address = makeAddress(name)

        if(this.addressCache.has(address)) {
            // Contains address but that slot doesn't have anything inside it
            if(this.addressCache.get(address) === null) {
                return Promise.resolve(new Map([])) // return a new map with an empty array inside it
            } else {
                return Promise.resolve(deserializeAgent(this.addressCache.get(address)))
            }
        } else {
            // First get state in the specified timeout on the specified address
            // We get a result of values for that address inside the context
            // Check if the value in the address is empy, then set it to null and return a new empty iterable map
            // Else transform that value in the address to a string and return it with the deserialize function
            return this.context.getState([address], this.timeout)
                .then(
                    (addressValues) => {
                        if(!addressValues[address].toString()) {
                            this.addressCache.set(address, null)
                            return new Map([])
                        } else {
                            let data = addressValues[address].toString()
                            this.addressCache.set(address, data)
                            return deserializeAgent(data)
                        }
                    })
        }
    }


}


const hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)

const BLOOD_FAMILY = 'blood'

const BLOOD_NAMESPACE = hash(BLOOD_FAMILY).substring(0, 6)

const makeAddress = (x) => BLOOD_NAMESPACE + hash(x)

module.exports = {
    BLOOD_NAMESPACE,
    BLOOD_FAMILY,
    BloodState
}

// All agents inside the blockchain are going to be stored inside the blockchain with its values separated by a |
const serializeAgent = (agents) => {
    let agentStrs = []
    for(let nameAgent of agents) {
        let name = nameAgent[0]
        agentStrs.push([name].join(','))
    }

    agentStrs.sort()

    return Buffer.from(agentStrs.join('|'))
}

// Deserialize data based on the serialization method above, returns a map with all agents deserialized
const deserializeAgent = (data) => {
    let agentsIterable = data.split('|').map(x => x.split(','))
        .map(x => [x[0], {name: x[0]}])

    return new Map(agentsIterable)
}
