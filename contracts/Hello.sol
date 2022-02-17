//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Hello{
  uint256 total = 0;

  event HelloReduceResult(address onw, uint256 result);

  constructor(uint256 _total){
    total = _total;
    console.log("create Hello total", _total);
  }

  function getHelloTotal() public view returns(uint256){
    return total;
  }

  function reduce() public {
    total -=1;
    emit HelloReduceResult(msg.sender, total);
  }

}