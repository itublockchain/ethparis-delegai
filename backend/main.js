const cron = require('node-cron');
const axios = require('axios');
const { ethers } = require('ethers');

const RPC_URL = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'; // Replace with your Infura project ID or your Ethereum node URL
const CONTRACT_ADDRESS = '0xYOUR_CONTRACT_ADDRESS'; // Replace with your smart contract address
const CONTRACT_ABI = require('./ContractABI.json'); // Replace with your contract's ABI

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// Function to vote for a proposal (Replace this with your voting logic)
async function voteForProposal(proposalId) {
  try {
    // Your voting logic here
    // Example: Voting by calling the 'vote' function in the smart contract
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    const result = await contractWithSigner.vote(proposalId);
    await result.wait();
    console.log(`Voted for proposal with ID: ${proposalId}. Transaction hash: ${result.hash}`);
  } catch (error) {
    console.error(`Error voting for proposal with ID: ${proposalId}`, error);
  }
}

// Function to check the remaining time for proposals and vote if under 12 hours
async function checkAndVoteForProposals() {
  try {
    const response = await axios.get('https://your-proposals-api.com/api/proposals');
    const proposals = response.data;

    // Time threshold (12 hours in seconds)
    const thresholdTime = 12 * 60 * 60;

    // Current time
    const currentTime = Math.floor(Date.now() / 1000);

    proposals.forEach((proposal) => {
      const proposalEndTime = proposal.endTime; // Assuming the API provides the proposal end time in seconds
      const remainingTime = proposalEndTime - currentTime;

      // Vote if remaining time is under 12 hours
      if (remainingTime <= thresholdTime) {
        voteForProposal(proposal.id);
      }
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
  }
}

// Schedule the task to run every hour (adjust as per your requirements)
cron.schedule('0 * * * *', () => {
  console.log('Checking and voting for proposals...');
  checkAndVoteForProposals();
});

// Start the server
console.log('Proposal voting scheduler started.');
