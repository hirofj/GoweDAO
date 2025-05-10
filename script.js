console.log("GoweDAO MVP Script Loaded!");

// --- State Variables (Simulated) ---
let userBalance = 1000.00;
let stakedAmount = 0.00;
let rewardsEarned = 0.00;
let rewardInterval = null; // To store the interval timer
const REWARD_RATE_PER_SECOND = 0.01; // Example: 0.01 GOWE per second

// English dummy template data
const dummyTemplates = [
    { id: 'tpl001', name: 'Basic Sales Agreement', description: 'Standard contract for the sale of goods.' },
    { id: 'tpl002', name: 'Non-Disclosure Agreement (NDA)', description: 'Contract regarding the sharing of confidential information.' },
    { id: 'tpl003', name: 'Service Agreement', description: 'Contract for outsourcing specific services.' }
];

// --- Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    displayTemplates();
    updateStakingDisplay(); // Initialize staking display

    // Add event listeners for staking buttons
    const stakeButton = document.getElementById('stake-button');
    const unstakeButton = document.getElementById('unstake-button');

    if (stakeButton) {
        stakeButton.addEventListener('click', handleStake);
    }
    if (unstakeButton) {
        unstakeButton.addEventListener('click', handleUnstake);
    }
});

// --- Template Display Functions (No change from previous version) ---
function displayTemplates() {
    const templateListDiv = document.getElementById('template-list');
    if (!templateListDiv) return;
    templateListDiv.innerHTML = '';
    dummyTemplates.forEach(template => {
        const div = document.createElement('div');
        div.classList.add('template-item');
        div.textContent = template.name;
        div.setAttribute('data-template-id', template.id);
        div.addEventListener('click', () => {
            console.log(`Template selected: ${template.id} - ${template.name}`);
            showContractDetails(template);
        });
        templateListDiv.appendChild(div);
    });
}

function showContractDetails(template) {
    // ... (This function remains the same as the previous English version) ...
    console.log("Show contract details for:", template);
    document.getElementById('template-selection').style.display = 'none';
    document.getElementById('contract-details').style.display = 'block';
    document.getElementById('dao-status').style.display = 'none';

    const detailsContent = document.getElementById('details-content');
    let dummyDetailsHTML = `<p><strong>Counterparty:</strong> Dummy Corp.</p><p><strong>Effective Date:</strong> May 6, 2025</p>`;
    if (template.id === 'tpl001') {
        dummyDetailsHTML += `<p><strong>Value:</strong> $10,000 USD</p>`;
    }
    dummyDetailsHTML += `<p><strong>Description:</strong> ${template.description}</p><hr><p><em>(Further specific contract clauses would be displayed here...)</em></p><ul><li>Clause 1: Definitions...</li><li>Clause 2: Purpose...</li><li>...</li></ul>`;
    detailsContent.innerHTML = `<h3>${template.name}</h3>${dummyDetailsHTML}`;

    const submitButton = document.getElementById('submit-dao-button');
    const newSubmitButton = submitButton.cloneNode(true);
    newSubmitButton.textContent = 'Deploy & Submit to DAO (Simulation)';
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);
    newSubmitButton.addEventListener('click', () => {
        console.log("Submitting to DAO (Simulation)...");
        showDaoStatus(template);
    });
}

function showDaoStatus(template) {
    // ... (This function remains the same as the previous English version) ...
     console.log("Show DAO status for:", template);
     document.getElementById('template-selection').style.display = 'none';
     document.getElementById('contract-details').style.display = 'none';
     document.getElementById('dao-status').style.display = 'block';
     const statusContent = document.getElementById('status-content');
     statusContent.innerHTML = `<p>Starting DAO approval process for <strong>${template.name}</strong>...</p><p>Status: Pending Approval</p>`;
     simulateDaoApproval(statusContent);
}

function simulateDaoApproval(statusDiv) {
    // ... (This function remains the same as the previous English version) ...
    statusDiv.innerHTML += `<p>DAO verification & voting started... (Simulation)</p>`;
    let percentage = 0;
    const interval = setInterval(() => {
        percentage += 10;
        const lines = statusDiv.innerHTML.split('<p>');
        lines[lines.length -1] = `Voting Progress: ${percentage}%</p>`;
        statusDiv.innerHTML = lines.join('<p>');
        if (percentage >= 100) {
            clearInterval(interval);
            const isApproved = Math.random() < 0.8;
            if(isApproved) {
                 statusDiv.innerHTML += `<p style="color: green; font-weight: bold;">Result: Approved by DAO!</p>`;
            } else {
                 statusDiv.innerHTML += `<p style="color: red; font-weight: bold;">Result: Rejected by DAO.</p>`;
            }
            setTimeout(() => {
                 document.getElementById('template-selection').style.display = 'block';
                 document.getElementById('contract-details').style.display = 'none';
                 document.getElementById('dao-status').style.display = 'none';
                 displayTemplates();
            }, 5000);
        }
    }, 300);
}


// --- Staking Simulation Functions ---

// Function to update the displayed staking info
function updateStakingDisplay() {
    const balanceEl = document.getElementById('gowe-balance');
    const stakedEl = document.getElementById('staked-amount');
    const rewardsEl = document.getElementById('rewards-earned');

    if (balanceEl) balanceEl.textContent = userBalance.toFixed(2);
    if (stakedEl) stakedEl.textContent = stakedAmount.toFixed(2);
    if (rewardsEl) rewardsEl.textContent = rewardsEarned.toFixed(4); // Rewards might be smaller
}

// Function to handle staking
function handleStake() {
    const amountInput = document.getElementById('stake-amount-input');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount to stake.");
        return;
    }
    if (amount > userBalance) {
        alert("Insufficient balance to stake that amount.");
        return;
    }

    userBalance -= amount;
    stakedAmount += amount;
    amountInput.value = ''; // Clear input field
    updateStakingDisplay();
    startRewardSimulation(); // Start earning rewards

    console.log(`Staked (Simulated): ${amount} $GOWE`);
}

// Function to handle unstaking (unstakes all for simplicity)
function handleUnstake() {
    if (stakedAmount <= 0) {
        alert("No GOWE currently staked.");
        return;
    }

    const amountToUnstake = stakedAmount; // Unstake everything
    userBalance += amountToUnstake;
    stakedAmount = 0;
    stopRewardSimulation(); // Stop earning rewards
    // Optional: Add rewards to balance upon unstaking
    // userBalance += rewardsEarned;
    // rewardsEarned = 0;
    updateStakingDisplay();

    console.log(`Unstaked All (Simulated): ${amountToUnstake} $GOWE`);
}

// Function to start the reward simulation interval
function startRewardSimulation() {
    // Start interval only if it's not already running and there's a staked amount
    if (!rewardInterval && stakedAmount > 0) {
        console.log("Starting reward simulation...");
        rewardInterval = setInterval(() => {
            rewardsEarned += REWARD_RATE_PER_SECOND; // Add reward per second
            updateStakingDisplay(); // Update display continuously
        }, 1000); // Update every second (1000ms)
    }
}

// Function to stop the reward simulation interval
function stopRewardSimulation() {
    if (rewardInterval) {
        console.log("Stopping reward simulation.");
        clearInterval(rewardInterval);
        rewardInterval = null; // Reset interval tracker
    }
}