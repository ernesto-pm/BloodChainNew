#BloodChain

## Instructions

1. Run `docker-compose up` to initialize sawtooth components
2. Open a new terminal window and run `npm install` 
3. Open a new terminal and run `node index.js tcp://localhost:4020` -> this will start and register the blood transaction family
4. Open a new terminal and run `node test.js` to test the creation of something in the blockchain.

You can view the outputs for each component in realtime, if you make modifications to the validator you need to restart the blockchain

