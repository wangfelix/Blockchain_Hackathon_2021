pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MediCoin is ERC20 {
    address public owner;

    constructor() ERC20("MediCoin", "MVC") {
        owner = msg.sender;
        addMinter
        _mint(msg.sender, 1000 * 10 ** 18);
    }

    modifier hasAccess {
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

   // Wer soll Zugriff haben?
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }


    function transfer(address recipient, uint256 amount) virtual override hasAccess public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    // deployer gets minter and pauser role
    constructor(string memory name, string memory symbol) public {
        _setupRole(DEFAULT_ADMIN_ROLE, owner());
        _setupRole(MINTER_ROLE, owner());
        _setupRole(PAUSER_ROLE, owner());
    }

    // minter can add amount of token to the total supply
    function mint(address to, uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, owner()), "Must have minter role to mint");
        _mint(to, amount);
    }
}