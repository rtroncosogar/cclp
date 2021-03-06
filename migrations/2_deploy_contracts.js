const AllowanceRegistry = artifacts.require('./AllowanceRegistry.sol')
const RestrictedTransferToken = artifacts.require('./RestrictedTransferToken.sol')

const REGISTRY_OWNER="0x9C803151d0fD38f8C9FCEe7D5d02498dF6067E5A"; //ajunge key


const INITIAL_AMOUNT=0;
const TOKEN_NAME="cCLP";
const DECIMAL_UNITS=0;
const TOKEN_SYMBOL="Compensacion de Liquidez Protegida";
const SUPPLY_CONTROLLER="0x9C803151d0fD38f8C9FCEe7D5d02498dF6067E5A"; //ajunge key
const TOKEN_OWNER="0x9C803151d0fD38f8C9FCEe7D5d02498dF6067E5A"; //ajunge key

module.exports = function (deployer) {
  deployer.deploy(AllowanceRegistry)
  .then(() => {
    return AllowanceRegistry.deployed();
  })
  .then((instance) => {
    return instance.transferOwnership(REGISTRY_OWNER);
  })
  .then(() => {
    return deployer.deploy(
            RestrictedTransferToken, 
            INITIAL_AMOUNT, 
            TOKEN_NAME, 
            DECIMAL_UNITS, 
            TOKEN_SYMBOL, 
            SUPPLY_CONTROLLER,
            AllowanceRegistry.address)
  })
  .then(() => {
    return RestrictedTransferToken.deployed();
  })
  .then((instance) => {
    return instance.transferOwnership(TOKEN_OWNER);
  })
  
}
