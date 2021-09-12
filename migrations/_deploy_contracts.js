const MediCoin = artifacts.require("MediCoin");

module.exports = function (deployer) {
  deployer.deploy(MediCoin);
};
