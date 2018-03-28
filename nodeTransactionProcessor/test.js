const createContext = require('sawtooth-sdk/signing').createContext
const CryptoFactory = require('sawtooth-sdk/signing').CryptoFactory

const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
console.log(privateKey)
const signer = new CryptoFactory(context).newSigner(privateKey)

let payload = ["idUno","tempDos","weightTres"]
payload = Buffer.from(payload.join(','))

const createHash = require('crypto').createHash
const protobuf = require('sawtooth-sdk').protobuf

const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: 'blood',
    familyVersion: '1.0',
    inputs: ['1cf1266e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7'],
    outputs: ['1cf1266e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7'],
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
    url: 'http://18.233.20.241:8008/batches',
    body: batchListBytes,
    headers: {'Content-Type': 'application/octet-stream'}
}, (err, response) => {
    if (err) return console.log(err)
    console.log(response.body)
})