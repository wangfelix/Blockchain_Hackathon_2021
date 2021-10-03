const MediCoin = artifacts.require("MediCoin");
const MediSystem = artifacts.require("MediSystem");

module.exports = function (deployer, network) {
  deployer.deploy(MediCoin);
  deployer.deploy(MediSystem);
};
