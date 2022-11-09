// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Greeting {
    string greeting = "what do you want to say?";

    event greetingChange(string _greet);

    function read() public view returns (string memory) {
        return greeting;
    }

    function write(string memory newGreeting) public {
        greeting = newGreeting;
        emit greetingChange((newGreeting));
    }
}
