const Certification = artifacts.require("Certification");

module.exports = function(deployer) {
  deployer.deploy(Certification);
};
