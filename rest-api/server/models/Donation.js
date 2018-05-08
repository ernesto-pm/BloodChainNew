const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Donation = new Schema(
    {
        blockchain_batch_id: {
            type: String,
            required: true
        },
        identifier: {
            type: String,
            required: true,
            unique: true
        },
        owner_agent: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        temperature: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        bloodRH: {
            type: String,
            required: true
        },
        knownHealthIssues: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Donation', Donation);
