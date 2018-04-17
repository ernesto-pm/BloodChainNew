require('dotenv').load()
const axios = require('axios')

const decodePayload = (payload) => Buffer.from(payload, 'base64').toString()

const getBlocks = () => {
    return axios.get(`${process.env.BLOCKCHAIN_RESTAPI_ADDR}/blocks`)
}

module.exports = {decodePayload, getBlocks}
