//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

uint256 constant portals = 100;

contract Owned{
  address owner;
  constructor(){
    owner = payable(msg.sender);
  }
  modifier onlyOwner{
    require(msg.sender == owner, "Not Owner");
    _;
  }
}

contract Vvoid is Owned{
  uint256 portal = 200;

  function mintByOwner() external onlyOwner{
    portal -= 1;
  }
}

contract Spaces{
  string constant TEXT = "abc";
  bytes32 constant MY_HASH = keccak256("abc");
  uint immutable deci;
  uint immutable maxB;
  address immutable owner = msg.sender;

  constructor(uint _deci,address _ref){
    deci = _deci;
    maxB = _ref.balance;
  }

  function  isBalanceTooHigh(address _other) public view returns (bool){
    return _other.balance > maxB;
  }
}