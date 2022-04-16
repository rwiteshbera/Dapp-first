// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract SimpleStorage {
    string public data;

    constructor() {
        data = "mydata";
    }

    function setData(string memory _data) public {
        data = _data;
    }
}