const {decodePayload, getBlocks} = require('../utils/blockchainUtils')
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const User = require('../models/User')

exports.createAgent = (req,res) =>{
    if(!req.body.username) return res.status(400).send({err:"No name provided"});
    if(!req.body.password) return res.status(400).send({err:"No password provided"});
    if(!req.body.fullName) return res.status(400).send({err:"No full name provided"});
    if(!req.body.address) return res.status(400).send({err:"No address provided"});
    if(!req.body.userType) return res.status(400).send({err:"No user type provided"});

    const context = createContext('secp256k1');
    const privateKey = context.newRandomPrivateKey();
    const signer = new CryptoFactory(context).newSigner(privateKey);
    const publicKey = signer.getPublicKey().asHex();

    let user = new User();
    user.username  = req.body.username;
    user.password  = req.body.password;
    user.fullName  = req.body.fullName;
    user.address   = req.body.address;
    user.userType  = req.body.userType;
    user.publicKey = publicKey;
    user.setPassword(req.body.password);

    user.save(function(err, user) {
        if(err) return res.status(500).send({err: err});
        return res.status(200).send({
            publicKey: publicKey,
            privateKey: privateKey
        })
    })


};

exports.getAgents = function(req, res) {

    getBlocks().then(
        function success(response) {
            let blocks = response.data.data;

        },
        function error(response) {
            console.error('Error trying to get blocks')
            response.status(500).send({err: 'Error trying to get blocks, is the blockchain address a valid sawtooth address?'})
        }
    )
};
