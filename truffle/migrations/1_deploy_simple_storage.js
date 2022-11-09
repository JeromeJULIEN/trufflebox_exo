// const SimpleStorage = artifacts.require("SimpleStorage");

// module.exports = function (deployer) {
//   deployer.deploy(SimpleStorage);
// };

const Greeting = artifacts.require("Greeting");

module.exports = function (deployer) {
  deployer.deploy(Greeting);
};
