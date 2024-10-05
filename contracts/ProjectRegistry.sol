// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProjectRegistry {
    struct Project {
        string projectType;
        string description;
        bytes32 uniqueHash;
        address owner;
        uint256 timestamp;
        uint256 voteCount;
    }

    mapping(bytes32 => Project) public projects;

    event ProjectCreated(bytes32 indexed uniqueHash, string projectType, address indexed owner, uint256 timestamp);

    function createProject(string memory _projectType, string memory _description) public {
        // Generate the unique hash using the project type, sender address, and current timestamp
        bytes32 _uniqueHash = keccak256(abi.encodePacked(msg.sender, _projectType, block.timestamp));
        
        projects[_uniqueHash] = Project({
            projectType: _projectType,
            description: _description,
            uniqueHash: _uniqueHash,
            owner: msg.sender,
            timestamp: block.timestamp,
            voteCount: 0
        });

        emit ProjectCreated(_uniqueHash, _projectType, msg.sender, block.timestamp);
    }

    function getProject(bytes32 _uniqueHash) public view returns (Project memory) {
        return projects[_uniqueHash];
    }

    function getProjectVoteCount(bytes32 _uniqueHash) public view returns (uint256) {
        return projects[_uniqueHash].voteCount;
    }

    function incrementVote(bytes32 _uniqueHash) public {
        require(projects[_uniqueHash].owner != address(0), "Project does not exist.");
        projects[_uniqueHash].voteCount++;
    }
}
