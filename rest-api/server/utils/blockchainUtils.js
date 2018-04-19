require('dotenv').load()
const axios = require('axios')
const secp256k1 = require('sawtooth-sdk/signing/secp256k1')
const {CryptoFactory} = require('sawtooth-sdk/signing')
const {protobuf} = require('sawtooth-sdk')
const crypto = require('crypto')
const {createHash} = require('crypto')

const decodePayload = (payload) => Buffer.from(payload, 'base64').toString()
const getBlocks = () => axios.get(`${process.env.BLOCKCHAIN_RESTAPI_ADDR}/blocks`)
const hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)
const BLOOD_FAMILY = 'blood'
const BLOOD_NAMESPACE = hash(BLOOD_FAMILY).substring(0, 6)
const makeAgentAddress = (x) => BLOOD_NAMESPACE + hash(x + 'ae')
const makeDonationAddress = (x) => BLOOD_NAMESPACE + hash(x + 'dn')

class BlockchainProcessor {
    constructor(privateKey) {
        this.context = new secp256k1.Secp256k1Context()
        this.privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKey)
        this.signer = new CryptoFactory(this.context).newSigner(this.privateKey)
    }

    createBatchListBytes(address, payload) {
        const transactionHeaderBytes = protobuf.TransactionHeader.encode({
            familyName: 'blood',
            familyVersion: '1.0',
            inputs: [address],
            outputs: [address],
            signerPublicKey: this.signer.getPublicKey().asHex(),
            batcherPublicKey: this.signer.getPublicKey().asHex(),
            payloadSha512: createHash('sha512').update(payload).digest('hex')
        }).finish()

        const signature = this.signer.sign(transactionHeaderBytes)

        const transaction = protobuf.Transaction.create({
            header: transactionHeaderBytes,
            headerSignature: signature,
            payload: payload
        })

        const transactions = [transaction]

        const batchHeaderBytes = protobuf.BatchHeader.encode({
            signerPublicKey: this.signer.getPublicKey().asHex(),
            transactionIds: transactions.map((txn) => txn.headerSignature),
        }).finish()

        const signature2 = this.signer.sign(batchHeaderBytes)
        const batch = protobuf.Batch.create({
            header: batchHeaderBytes,
            headerSignature: signature2,
            transactions: transactions
        })

        const batchListBytes = protobuf.BatchList.encode({
            batches: [batch]
        }).finish()

        return batchListBytes
    }

    createAgentAction(name, type) {
        let address = makeAgentAddress(name)
        let payload = ["CREATE_AGENT", name, type]
        payload = Buffer.from(payload.join(','))

        return this.createBatchListBytes(address, payload)
    }

    createDonationAction(id, agentOwner, temperature, weight, bloodType) {
        let address = makeDonationAddress(id)
        let payload = ["CREATE_DONATION", id, agentOwner, temperature, weight, bloodType]
        payload = Buffer.from(payload.join(','))

        return this.createBatchListBytes(address, payload)
    }
}

//let processor = new BlockchainProcessor("4c4c37061f84f2b66f29fcef80fc09bf2511f170094c5da31a5b825a2480a251")
//console.log(processor.createAgentAction("Hospital Angeles", "Hospital"))

module.exports = {decodePayload, getBlocks, BlockchainProcessor}
