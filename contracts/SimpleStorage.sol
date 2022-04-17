// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract SimpleStorage {
    struct Message {
        address sender;
        string message;
    }

    event setDataEvent(address indexed from, string msg);

    Message[] messages;

    constructor() {
        console.log("I am smart");
    }

    function setData(string memory _data) public {
        messages.push(Message(msg.sender, _data));
        emit setDataEvent(msg.sender, _data);
    }

    function getData() public view returns(Message[] memory) {
        return messages;
    }
}