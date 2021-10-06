pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface InterfaceMediCoin {
    function getOwner() external view returns(address); // abstract
    function balanceOf(address) external view returns(uint);
}

contract MediCoin is ERC20 {
    address public owner;
    address public minter;

    uint256 private _totalSupply;

    constructor() ERC20("MediCoin", "MVC") {
        owner = msg.sender;
        minter = msg.sender;
        _mint(msg.sender, 1000 * 10 ** 18);
    }

    modifier hasAccess {
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    function approve(address spender, uint256 amount)virtual override hasAccess public returns (bool) {
        super.approve(spender, amount);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) virtual override hasAccess public returns (bool) {
        super.decreaseAllowance(spender, subtractedValue);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) virtual override hasAccess public returns (bool) {
        super.increaseAllowance(spender, addedValue);
        return true;
    }

    function transfer(address recipient, uint256 amount) virtual override hasAccess public returns (bool) {
        super.transfer(recipient, amount);
        return true;
    }


    function mint(address account, uint256 amount) hasAccess public returns (bool) {
        _mint(account, amount);
        return true;
    }

}