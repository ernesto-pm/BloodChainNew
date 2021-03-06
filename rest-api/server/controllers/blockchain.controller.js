const {decodePayload} = require('../utils/blockchainUtils')
const {CreateDonationPayload, CreateAgentPayload} = require('../../../nodeTransactionProcessor/blood_payload')
const axios = require('axios')

exports.decodeBlock = (req, res) => {
    if(!req.body.block) return res.status(401).send({err: "Error, block to decode must be passed as body parameter"})

    const decoded = decodePayload(req.body.block).split(',')
    let payload = null;

    if(decoded[0] === "CREATE_DONATION") {

        let id          = decoded[1]
        let agentOwner  = decoded[2]
        let temperature = decoded[3]
        let weight      = decoded[4]
        let bloodType   = decoded[5]

        payload = new CreateDonationPayload(id, agentOwner, temperature, weight, bloodType);

    } else if ( decoded[0] === "CREATE_AGENT") {

        let name = decoded[1];
        let type = decoded[2];

        payload = new CreateAgentPayload(name, type);
    }

    return res.status(200).send(payload)
}


exports.getBatchStatus = (req, res) => {
    if(!req.body.batch_id) return res.status(401).send({err: "Error, no batch id specified"})

    axios.get(`http://127.0.0.1:8024/batch_statuses?id=${req.body.batch_id}`).then(
        function success(response) {
            return res.status(200).send(response.data.data)
        },
        function error() {
            res.status(500).send({err: "Error querying the blockchain"})
        }
    )

}
