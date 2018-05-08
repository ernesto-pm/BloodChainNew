const {decodePayload, getBlocks} = require('../utils/blockchainUtils')
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const {BlockchainProcessor} = require('../utils/blockchainUtils')
const request = require('request')
const User = require('../models/User')
const passport  = require('passport');

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
    user.privateKey = privateKey.asHex();
    user.setPassword(req.body.password);

    let processor = new BlockchainProcessor(user.privateKey);
    let batchListBytes = processor.createAgentAction(user.username, user.userType);

    request.post({
        url: 'http://localhost:8024/batches',
        body: batchListBytes,
        headers: {'Content-Type': 'application/octet-stream'}
        },
        (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500).send({err: err});
            }

            user.save(function(err, user) {
                if(err) {
                    console.log(err);
                    return res.status(500).send({err: err});
                }
                return res.status(200).send({user: user, blockchainResponse: response});
            })
        }
    )

};



exports.agentLogin = function(req, res) {
    if(!req.body.username) return res.status(400).send({err: 'Username is required'});
    if(!req.body.password) return res.status(400).send({err: 'Password is required'});

    passport.authenticate('local' , (err, user, info) => {

        if(err) return res.status(500).send({err : err});

        if(user) {
            let token = user.generateJwt(false, '','');
            return res.status(200).send({token: token});
        }else{
            return res.status(401).send({err: info});
        }

    })(req , res);

}



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
