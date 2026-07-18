const version = "V1.0.3";

// --- 1. LOCAL STORAGE LOAD LOGIC ---
// Check if a save exists. If it does, use it. Otherwise, use starting values.
const savedData = JSON.parse(localStorage.getItem('userGameSave'));

let clicks = savedData ? savedData.clicks : 4;
let cps = savedData ? savedData.cps : 0;
let cpc = savedData ? savedData.cpc : 1;
let cpc1cost = savedData ? savedData.cpc1cost : 100;
let cps1cost = savedData ? savedData.cps1cost : 50;

function onecpc() {
    if(clicks >= cpc1cost) {
        clicks -= cpc1cost;
        cpc += 1;
        cpc1cost *= 1.15;
        cpc1cost = Math.round(cpc1cost);
        saveToLocalStorage(); // Save locally when buying upgrades
        updateUI();
    }
}

function onecps() {
    if(clicks >= cps1cost) {
        clicks -= cps1cost;
        cps += 1;
        cps1cost *= 1.15;
        cps1cost = Math.round(cps1cost);
        saveToLocalStorage(); // Save locally when buying upgrades
        updateUI();
    }
}

// Helper function to auto-save progress locally
function saveToLocalStorage() {
    const localSave = { clicks, cpc, cps, cpc1cost, cps1cost };
    localStorage.setItem('userGameSave', JSON.stringify(localSave));
}

// Fixed the updateIO typo to updateUI
function mrLoop() {
    setTimeout(() => {
        mrLoop();
        updateUI(); 
    }, 1000 / 30);
}

function doClick() {
    clicks += cpc;
    console.log(clicks);
    saveToLocalStorage(); // Save locally when clicking
    updateUI();
}

function updateUI() {
    document.getElementById("counter").innerText = clicks + " Clicks";
    document.getElementById("cpc1counter").innerText = "+1 CPC - Cost: " + cpc1cost;
    document.getElementById("cps1counter").innerText = "+1 CPS - Cost: " + cps1cost;
    document.getElementById("ver").innerText = version;
    const upgradeBtn2 = document.getElementById("cps1counter");
    
    if (clicks >= cps1cost) {
        upgradeBtn2.classList.add("affordable");
    } else {
        upgradeBtn2.classList.remove("affordable");
    }
}

// --- EXPORT PROGRESS ---
document.getElementById('exportBtn').addEventListener('click', () => {
    const saveData = {
        clicks: clicks,
        cpc: cpc,
        cps: cps,
        cpc1cost: cpc1cost,
        cps1cost: cps1cost,
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(saveData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    
    downloadAnchor.href = url;
    downloadAnchor.download = `bluezClicker_${Date.now()}.json`;
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
});

// --- IMPORT PROGRESS ---
const fileInput = document.getElementById('fileInput');

document.getElementById('importBtn').addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Fixed missing index [0] from your code
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Check that the file actually contains clicker data
            if (importedData.clicks !== undefined && importedData.cpc !== undefined) {
                
                // Save to localStorage so it is ready when the page reloads
                localStorage.setItem('userGameSave', JSON.stringify(importedData));
                
                alert('Save imported successfully! Reloading page...');
                location.reload(); 
            } else {
                alert('Invalid save file format.');
            }
        } catch (error) {
            alert('Error reading save file. Ensure it is a valid JSON file.');
        }
    };

    reader.readAsText(file);
    fileInput.value = '';
});

// Start the game loop and render initial storage values
mrLoop();
updateUI();
