// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AiDao {
    struct Proposal {
        uint256 id;
        uint256 upvotes;
        uint256 downvotes;
        string description;
        address proposer;
        address executor;
        bool executed;
        bool passed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public votingPower;
    mapping(address => address) public votingDelegate;

    uint256 public proposalCount;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(uint256 proposalId, address voter, bool inSupport);
    event ProposalExecuted(uint256 proposalId);

    modifier hasVotingPower() {
        require(votingPower[msg.sender] > 0, "You have no voting power.");
        _;
    }

    constructor() {
        // Initialize DAO with a single proposal to keep proposal IDs non-zero
        createProposal("Initial Proposal", address(0), 0);
    }

    function createProposal(
        string memory description,
        address beneficiary,
        uint256 amount
    ) public {
        uint256 proposalId = proposalCount++;

        proposals[proposalId] = Proposal({
            id: proposalId,
            upvotes: 0,
            downvotes: 0,
            description: description,
            proposer: msg.sender,
            executor: address(0),
            executed: false,
            passed: false
        });

        emit ProposalCreated(proposalId, description);

        if (beneficiary != address(0) && amount > 0) {
            executeProposal(proposalId, beneficiary, amount);
        }
    }

    function vote(uint256 proposalId, bool inSupport) public hasVotingPower {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal has been executed.");
        require(!proposal.passed, "Proposal has already passed.");

        // If the sender has delegated their vote, follow the delegation chain
        address voter = msg.sender;
        while (votingDelegate[voter] != address(0)) {
            voter = votingDelegate[voter];
            require(voter != msg.sender, "Circular delegation is not allowed.");
        }

        if (inSupport) {
            proposal.upvotes += votingPower[msg.sender];
        } else {
            proposal.downvotes += votingPower[msg.sender];
        }

        emit Voted(proposalId, msg.sender, inSupport);
    }

    function delegateVotingPower(address delegatee) public hasVotingPower {
        require(delegatee != msg.sender, "You cannot delegate to yourself.");
        votingDelegate[msg.sender] = delegatee;
    }

    function executeProposal(
        uint256 proposalId,
        address beneficiary,
        uint256 amount
    ) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal has been executed.");
        require(!proposal.passed, "Proposal has already passed.");
        require(
            proposal.upvotes > proposal.downvotes,
            "Proposal did not pass."
        );

        // Simple implementation: Just transfer the amount to the beneficiary
        (bool success, ) = beneficiary.call{value: amount}("");
        require(success, "Payment failed");

        proposal.executed = true;
        proposal.executor = msg.sender;
        proposal.passed = true;

        emit ProposalExecuted(proposalId);
    }

    // Function to add voting power to an address
    function addVotingPower(address voter, uint256 power) external {
        votingPower[voter] += power;
    }

    // Function to remove voting power from an address
    function removeVotingPower(address voter, uint256 power) external {
        require(
            votingPower[voter] >= power,
            "Not enough voting power to remove."
        );
        votingPower[voter] -= power;
    }

    // View function to get all proposal IDs
    function getAllProposalIds() public view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            ids[i] = proposals[i].id;
        }
        return ids;
    }

    // View function to get proposal details by ID
    function getProposal(
        uint256 proposalId
    )
        public
        view
        returns (
            uint256 id,
            uint256 upvotes,
            uint256 downvotes,
            string memory description,
            address proposer,
            address executor,
            bool executed,
            bool passed
        )
    {
        Proposal memory proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.upvotes,
            proposal.downvotes,
            proposal.description,
            proposal.proposer,
            proposal.executor,
            proposal.executed,
            proposal.passed
        );
    }

    function getVotingPower(address voter) public view returns (uint256) {
        return votingPower[voter];
    }

    function isStakeholder(address addr) public view returns (bool) {
        return votingPower[addr] > 0;
    }

    function getVotingDelegate(address addr) public view returns (address) {
        return votingDelegate[addr];
    }
}