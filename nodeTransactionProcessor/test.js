const createContext = require('sawtooth-sdk/signing').createContext
const CryptoFactory = require('sawtooth-sdk/signing').CryptoFactory
const crypto        = require('crypto')
const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)

//let payload = ["idUno","tempDos","weightTres","create"]

// For creating agents you specify the action, name, and type (Hospital, Banco de donacion)
let payload = ["CREATE_AGENT", "Medica", "HOSPITAL"]
//let payload = ["CREATE_DONATION", "Medica", "30", "1", "O+"]

let id = payload[1]
payload = Buffer.from(payload.join(','))

const createHash = require('crypto').createHash
const protobuf = require('sawtooth-sdk').protobuf

const hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)

const BLOOD_FAMILY = 'blood'

const BLOOD_NAMESPACE = hash(BLOOD_FAMILY).substring(0, 6)

const makeAddress = (x) => BLOOD_NAMESPACE + hash(x)

let address = makeAddress(id)

const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: 'blood',
    familyVersion: '1.0',
    inputs: [address],
    outputs: [address],
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

console.log(payload)

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
