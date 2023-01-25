// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface ERC1400Interface {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address spender, address recipient, uint256 amount) external returns (bool);
    function isControllable() external view returns (bool);
    function authorizeOperator(address operator) external;
    function revokeOperator(address operator) external;
    function isOperator(address operator, address tokenHolder) external view returns (bool);
    function restrictToken() external;
    function allowToken() external;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed spender, address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 oldAmount, uint256 amount);
    event AuthorizedOperator(address indexed operator, address indexed tokenHolder);
    event RevokedOperator(address indexed operator, address indexed tokenHolder);
    event RestrictToken();
    event AllowToken();
}

abstract contract OwnerHelper {
  	address private _owner;

  	event OwnershipTransferred(address indexed preOwner, address indexed nextOwner);

  	modifier onlyOwner {
		require(msg.sender == _owner, "OwnerHelper: caller is not owner");
		_;
  	}

  	constructor() {
		_owner = msg.sender;
  	}

  	function owner() public view virtual returns (address) {
		return _owner;
  	}

  	function transferOwnership(address newOwner) onlyOwner public {
		require(newOwner != _owner);
		require(newOwner != address(0x0));
		_owner = newOwner;
		emit OwnershipTransferred(_owner, newOwner);
  	}
}

contract SecurityToken is ERC1400Interface, OwnerHelper {
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) public _allowances;
    mapping(address => mapping(address => bool)) internal _authorizedOperator; //
    mapping(address => bool) internal _isController; //

    uint256 public _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    uint private E18 = 1000000000000000000;
    bool internal _isControllable; // operator가 해당 토큰을 컨트롤할 수 있는지 여부
    address internal _controller; // 토큰 컨트롤할 수 있는 operator(거래소)
    bool internal _isRestricted; // 토큰 거래 제한 여부

    /*
    * operator(거래소)만 조작할 수 하기 위한 modifier
    */
    modifier onlyOperator {
        require(msg.sender == _controller, "onlyOperator: caller is not the operator");
        _;
    }

    /*
    * 토큰애 대한 거래제한여부에 따른 modifier
    */
    modifier notRestricted {
        require(_isRestricted == false, "Restriction: the token is restricted by the operator");
        _;
    }

    constructor(string memory getName, string memory getSymbol, address initialController) {
        _name = getName;
        _symbol = getSymbol;
        _decimals = 18; // 이부분 기능 이해 필요
        _totalSupply = 100000000 * E18; // 공급량 설정에 관련된 내용 필요
        _balances[msg.sender] = _totalSupply; // constructor에서 정할 수 있게 해야하나??

        _setController(initialController); // 거래소 주소를 controller 기본값으로 설정
        _authorizedOperator[initialController][msg.sender]; // 거래소 주소를 기업의 operator 기본값으로 설정
        _isControllable = true; // operator/controller가 토큰을 컨트롤 할 수 있도록 기본값 설정
        _isRestricted = false; // 거래 가능 상태로 초기값 설정

    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint amount) public virtual override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint amount) external virtual override returns (bool) {
        uint256 currentAllowance = _allowances[msg.sender][spender];
        require(_balances[msg.sender] >= amount,"ERC20: The amount to be transferred exceeds the amount of tokens held by the owner.");
        _approve(msg.sender, spender, currentAllowance, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        emit Transfer(msg.sender, sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance, currentAllowance - amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual notRestricted {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[sender] = senderBalance - amount;
        _balances[recipient] += amount;
    }

    function _approve(address owner, address spender, uint256 currentAmount, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, currentAmount, amount);
    }

    /**
    * @dev Know if the token can be controlled by operators.
    * If a token returns 'false' for 'isControllable()'' then it MUST always return 'false' in the future.
    * @return bool 'true' if the token can still be controlled by operators, 'false' if it can't anymore.
    */
    function isControllable() external override view returns (bool) {
        return _isControllable;
    }

    /**
    * @dev Set a third party operator address as an operator of 'msg.sender' to transfer
    * and redeem tokens on its behalf.
    * @param operator Address to set as an operator for 'msg.sender'.
    */
    function authorizeOperator(address operator) external override {
        require(operator != msg.sender);
        _authorizedOperator[operator][msg.sender] = true;
        emit AuthorizedOperator(operator, msg.sender);
    }

    /**
    * @dev Remove the right of the operator address to be an operator for 'msg.sender'
    * and to transfer and redeem tokens on its behalf.
    * @param operator Address to rescind as an operator for 'msg.sender'.
    */
    function revokeOperator(address operator) external override {
        require(operator != msg.sender);
        _authorizedOperator[operator][msg.sender] = false;
        emit RevokedOperator(operator, msg.sender);
    }

    /**
    * @dev Indicate whether the operator address is an operator of the tokenHolder address.
    * @param operator Address which may be an operator of tokenHolder.
    * @param tokenHolder Address of a token holder which may have the operator address as an operator.
    * @return 'true' if operator is an operator of 'tokenHolder' and 'false' otherwise.
    */
    function isOperator(address operator, address tokenHolder) external override view returns (bool) {
        return _isOperator(operator, tokenHolder);
    }

    /**
    * @dev Get the list of controllers as defined by the token contract.
    * @return List of addresses of all the controllers.
    */
    function controller() external view returns (address) {
        return _controller;
    }

    /*
    * @dev Set list of token controllers.
    * @param operators Controller addresses.
    */
    function setController(address operator) external onlyOwner {
        _setController(operator);
    }

    /*
    * @dev Indicate whether the operator address is an operator of the tokenHolder address.
    * @param operator Address which may be an operator of 'tokenHolder'.
    * @param tokenHolder Address of a token holder which may have the 'operator' address as an operator.
    * @return 'true' if 'operator' is an operator of 'tokenHolder' and 'false' otherwise.
    */
    function _isOperator(address operator, address tokenHolder) internal view returns (bool) {
        return (operator == tokenHolder
          || _authorizedOperator[operator][tokenHolder]
          || (_isControllable && _isController[operator])
        );
    }

    /*
    * @dev Set list of token controllers.
    * @param operators Controller addresses.
    */
    function _setController(address operator) internal {
        _isController[_controller] = false;
        _isController[operator] = true;
        _controller = operator;
    }

    /*
    * 토큰의 거래를 제한하는 함수이다.
    * operator로 인정된 거래소만 해당 함수를 호출할 수 있다.
    */
    function restrictToken() external override onlyOperator {
        _restrictToken();
    }

    /*
    * 토큰의 거래를 재허용하는 함수이다.
    * operator로 인정된 거래소만 해당 함수를 호출할 수 있다.
    */
    function allowToken() external override onlyOperator {
        _allowToken();
    }

    function _restrictToken() internal {
        require(_isOperator(_controller, msg.sender));
        _isRestricted = true;
        emit RestrictToken();
    }

    function _allowToken() internal {
        require(_isOperator(_controller, msg.sender));
        _isRestricted = false;
        emit AllowToken();
    }

    // 토큰이 제한되었는지 확인하는 함수
    function isRestricted() external view returns(bool) {
        return _isRestricted;
    }
}