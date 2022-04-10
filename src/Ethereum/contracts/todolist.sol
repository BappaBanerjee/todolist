//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

contract todo_list {
    struct Task {
        string task;
        bool isDone;
    }

    mapping(uint256 => Task) public taskToDo;
    uint256 public numberOfTask;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    modifier restricted() {
        require(manager == msg.sender);
        _;
    }

    function create(string memory task) public restricted {
        Task storage newTask = taskToDo[numberOfTask++];
        newTask.task = task;
        newTask.isDone = false;
    }

    function markComplete(uint256 index) public restricted {
        Task storage oldTask = taskToDo[index];
        oldTask.isDone = true;
    }

    function deleteTask(uint256 index) public restricted {
        delete taskToDo[index];
        numberOfTask--;
    }
}
