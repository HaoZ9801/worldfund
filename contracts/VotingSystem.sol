// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/ProjectRegistry.sol";

contract VotingSystem {
    struct Vote {
        bytes32 hashNullifier;  // The user's unique hash nullifier
        bytes32 projectHash;    // The project the user voted for
        uint256 timestamp;      // Timestamp of the vote
    }

    ProjectRegistry projectRegistry;

    constructor(address _projectRegistry) {
        projectRegistry = ProjectRegistry(_projectRegistry);
    }

    // Store votes as an array
    Vote[] public votes;

    // Event emitted whenever a vote is cast
    event VoteCasted(bytes32 indexed hashNullifier, bytes32 projectHash, uint256 timestamp);

    // Function to cast a vote (after verification)
    function castVote(bytes32 _hashNullifier, bytes32 _projectHash) public {
        // Add the vote to the votes array
        votes.push(Vote({
            hashNullifier: _hashNullifier,
            projectHash: _projectHash,
            timestamp: block.timestamp
        }));

        // Emit an event for the new vote
        emit VoteCasted(_hashNullifier, _projectHash, block.timestamp);

        projectRegistry.incrementVote(_projectHash);
    }

    // Function to retrieve all votes
    function getAllVotes() public view returns (Vote[] memory) {
        return votes;
    }

    // Optionally, function to retrieve votes by hash nullifier
    function getVotesByHash(bytes32 _hashNullifier) public view returns (Vote[] memory) {
        uint256 totalVotes = votes.length;
        uint256 resultCount = 0;
        
        // Count the number of votes matching the hashNullifier
        for (uint256 i = 0; i < totalVotes; i++) {
            if (votes[i].hashNullifier == _hashNullifier) {
                resultCount++;
            }
        }

        // Create a temporary array to hold results
        Vote[] memory result = new Vote[](resultCount);
        uint256 resultIndex = 0;

        // Populate the result array
        for (uint256 i = 0; i < totalVotes; i++) {
            if (votes[i].hashNullifier == _hashNullifier) {
                result[resultIndex] = votes[i];
                resultIndex++;
            }
        }

        return result;
    }
}
