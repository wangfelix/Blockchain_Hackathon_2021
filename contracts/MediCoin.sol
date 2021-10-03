pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface InterfaceMediCoin {
    function getOwner() external view returns(address); // abstract
    function balanceOf(address) external view returns(uint);
}

contract MediCoin is ERC20 {
    address public owner;

    constructor() ERC20("MediCoin", "MDC") {
        owner = payable(msg.sender);
        _mint(msg.sender, 1000 * 10 ** 18);
    }

    modifier hasAccess {
        require(owner == msg.sender, "No access rights");
        _;
    }

    function transfer(address recipient, uint256 amount) virtual override hasAccess public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

}