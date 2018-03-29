const createContext = require('sawtooth-sdk/signing').createContext
const CryptoFactory = require('sawtooth-sdk/signing').CryptoFactory
const crypto        = require('crypto')
const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)

let payload = ["idUno","tempDos","weightTres","create"]
let id = payload[0]
payload = Buffer.from(payload.join(','))

const createHash = require('crypto').createHash
const protobuf = require('sawtooth-sdk').protobuf


// Function that creates a new hash for parameter 'x'
const createBloodHash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)

// Custom transaction family we are creating
const BLOOD_FAMILY = 'blood'

// Creates the hash corresponding to the transaction family
const BLOOD_NAMESPACE = createBloodHash(BLOOD_FAMILY).substring(0, 6)

// Paste bloodspace plus the hash generated
const makeBloodAddress = (x) => BLOOD_NAMESPACE + createBloodHash(x)

let bloodAddress = makeBloodAddress(id)

const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: 'blood',
    familyVersion: '1.0',
    inputs: [bloodAddress],
    outputs: [bloodAddress],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    payloadSha512: createHash('sha512').update(payload).digest('hex')
}).finish()

const signature = signer.sign(transactionHeaderBytes)

const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payload
})

const transactions = [transaction]

const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
}).finish()

const signature2 = signer.sign(batchHeaderBytes)
const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: signature2,
    transactions: transactions
})

const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
}).finish()

const request = require('request')
request.post({
    url: 'http://localhost:8024/batches',
    body: batchListBytes,
    headers: {'Content-Type': 'application/octet-stream'}
}, (err, response) => {
    if (err) return console.log(err)
    console.log(response.body)
})