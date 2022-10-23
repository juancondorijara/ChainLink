const EthPrice = artifacts.require('EthPrice');

const utils = require('web3-utils');

if (!process.env.LINK_ADDRESS) {
  console.error('Please set the LINK_ADDRESS environment variable using the value from Kaleido Chainlink service dashboard');
}

if (!process.env.ORACLE_ADDRESS) {
  console.error('Please set the ORACLE_ADDRESS environment variable using the value from Kaleido Chainlink service dashboard');
}

if (!process.env.JOB_ID) {
  console.error('Please set the JOB_ID environment variable after creating a new job specification in Chainlink using jobs/eth-price.json');
}

contract("EthPrice", async (accounts) => {
  let myContract, myContractV4;

  describe("Solidity 0.4 based EthPrice contract", async() => {
    it("deploys the EthPrice contract", async() => {
      myContract = await EthPrice.deployed();
      expect(myContract.address).to.match(/0x[0-9a-fA-F]{40}/);
    });

    it(`Calling requestEthereumPrice() with job ID ${process.env.JOB_ID}`, async () => {
      let result = await myContract.requestEthereumPrice(process.env.JOB_ID);
      expect(result.receipt.transactionHash).to.match(/0x[0-9a-fA-F]{64}/);

      const blockNumber = result.receipt.blockNumber;

      const eventList = await myContract.getPastEvents("allEvents", {fromBlock: utils.toHex(blockNumber), toBlock: utils.toHex(blockNumber)});
      const events = eventList.filter(ev => ev.transactionHash === result.receipt.transactionHash);
      expect(events.length).to.equal(1); // ChainlinkRequested
      expect(events[0].event).to.equal('ChainlinkRequested');
    });
  });
});