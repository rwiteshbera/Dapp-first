// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract SimpleStorage {
    string public data;

    event setDataEvent(string message);

    constructor() payable {
        data = "_";
    }

    function setData(string memory _data) public {
        data = _data;
        emit setDataEvent(_data);
    }

    function getData() public view returns(string memory) {
        return data;
    }
}