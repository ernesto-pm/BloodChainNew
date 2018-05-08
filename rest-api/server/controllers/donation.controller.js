const Donation              = require('../models/Donation')
const User                  = require('../models/User')
const {BlockchainProcessor} = require('../utils/blockchainUtils')
const request               = require('request')

exports.createDonation = (req,res) => {

    if(!req.body.identifier)        return res.status(400).send({err:"No name provided"});
    if(!req.body.owner_agent)       return res.status(400).send({err:"No password provided"});
    if(!req.body.temperature)       return res.status(400).send({err:"No full name provided"});
    if(!req.body.weight)            return res.status(400).send({err:"No address provided"});
    if(!req.body.bloodGroup)        return res.status(400).send({err:"No user type provided"});
    if(!req.body.bloodRH)           return res.status(400).send({err:"No user type provided"});
    if(!req.body.knownHealthIssues) return res.status(400).send({err:"No user type provided"});

    // First check if user is in the database
    User.findById(req.body.owner_agent, function(err, user) {
        if(err) return res.status(500).send({err: "Error locating owner user"})
        if(!user) return res.status(404).send({err: "Error, no owner user found"})

        let donation = new Donation();
        donation.identifier         = req.body.identifier;
        donation.owner_agent        = req.body.owner_agent;
        donation.temperature        = req.body.temperature;
        donation.weight             = req.body.weight;
        donation.bloodGroup         = req.body.bloodGroup;
        donation.bloodRH            = req.body.bloodRH;
        donation.knownHealthIssues  = req.body.knownHealthIssues;

        let processor = new BlockchainProcessor(user.privateKey)
        let batchListBytes = processor.createDonationAction(donation.identifier, donation.owner_agent, donation.temperature, donation.weight, donation.bloodGroup, donation.bloodRH, donation.knownHealthIssues);

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
                let link = JSON.parse(response.body).link
                donation.blockchain_batch_id = link.split("=")[1];

                donation.save(function(err, donation) {
                    if(err) {
                        console.log(err);
                        return res.status(500).send({err: err});
                    }
                    return res.status(200).send({donation: donation, blockchainResponse: response});
                })
            }
        )

    })

}

exports.getDonations = (req,res) => {
    if(!req.body.owner_agent) return res.status(400).send({err:"No owner agent provided"});
    Donation.find({owner_agent: req.body.owner_agent}, (err, donations) => {
        if(err) return res.status(500).send({err: err});

        return res.status(200).send({donations: donations});
    })
}
