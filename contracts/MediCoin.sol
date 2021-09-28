pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MediCoin is ERC20 {
    address public owner;
    address public minter;

    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;

    constructor() ERC20("MediCoin", "MVC") {
        owner = msg.sender;
        minter = msg.sender;
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
        super.transfer(recipient, amount);
        return true;
    }

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        _balances[receiver] += amount;
    }


    /*
        // deployer gets minter and pauser role
        constructor(string memory name, string memory symbol) public {
            setupRole(DEFAULT_ADMIN_ROLE, owner());
            setupRole(MINTER_ROLE, owner());
            setupRole(PAUSER_ROLE, owner());
        }

        // minter can add amount of token to the total supply
        function mint(address to, uint256 amount) public virtual {
            require(hasRole(MINTER_ROLE, owner()), "Must have minter role to mint");
            _mint(to, amount);
        }
    */
}