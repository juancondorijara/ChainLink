const EthPrice = artifacts.require("EthPrice");

const LINK_CONTRACT_ADDRESS = process.env.LINK_ADDRESS;
const ORACLE_CONTRACT_ADDRESS = process.env.ORACLE_ADDRESS;

module.exports = function(deployer) {
  deployer.deploy(EthPrice, LINK_CONTRACT_ADDRESS, ORACLE_CONTRACT_ADDRESS);
};
