const version = "V1.1.6";

const savedData = JSON.parse(localStorage.getItem('userGameSave')) || {};

let clicks = savedData.clicks ?? 4;
let cps = savedData.cps ?? 0;
let cpc = savedData.cpc ?? 1;
let cpc1cost = savedData.cpc1cost ?? 100;
let cps1cost = savedData.cps1cost ?? 50;
let criticalHitsPurchased = savedData.criticalHitsPurchased ?? false;


function onecpc() {
    if(clicks >= cpc1cost) {
        clicks -= cpc1cost;
        cpc += 1;
        cpc1cost *= 1.15;
        cpc1cost = Math.round(cpc1cost);
        saveToLocalStorage();
        updateUI();
    }
}

function onecps() {
    if(clicks >= cps1cost) {
        clicks -= cps1cost;
        cps += 1;
        cps1cost *= 1.15;
        cps1cost = Math.round(cps1cost);
        saveToLocalStorage();
        updateUI();
    }
}

function criticalHits() {
    if(clicks >= 500 && !criticalHitsPurchased) {
        clicks -= 500;
        criticalHitsPurchased = true;
        saveToLocalStorage();
        updateUI();
    }
}

function saveToLocalStorage() {
  const localSave = { 
    clicks, 
    cpc, 
    cps, 
    cpc1cost, 
    cps1cost,
    criticalHitsPurchased
  };
  localStorage.setItem('userGameSave', JSON.stringify(localSave));
}

function wipeData() {
    const modal = document.getElementById('confirmModal');
    modal.classList.add('active');
}

function executeWipe() {
    localStorage.removeItem('userGameSave');
    clicks = 0;
    cpc = 1;
    cps = 0;
    cpc1cost = 100;
    cps1cost = 50;
    criticalHitsPurchased = false;
    updateUI();
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('active');
}

function mrLoop() {
    setTimeout(() => {
        clicks += cps;
        mrLoop();
        updateUI(); 
    }, 1000);
}

function doClick(e) {
    if (criticalHitsPurchased && Math.random() < 0.1) { 
        const critAmount = cpc * 10;
        clicks += critAmount; 
        
        const counterEl = document.getElementById("counter");
        counterEl.classList.add("critical-hit");
        setTimeout(() => counterEl.classList.remove("critical-hit"), 300);

        if (e) createFloatingText(e, `+${critAmount} CRIT!`);

    } else { 
        clicks += cpc; 
    }

    console.log(clicks);
    saveToLocalStorage();
    updateUI();
}

function createFloatingText(e, text) {
  const floatingText = document.createElement("div");
  floatingText.className = "floating-crit";
  floatingText.innerText = text;

  floatingText.style.left = `${e.clientX}px`;
  floatingText.style.top = `${e.clientY}px`;

  document.body.appendChild(floatingText);

  setTimeout(() => {
    floatingText.remove();
  }, 800);
}

function updateUI() {
    document.getElementById("counter").innerText = clicks + " Clicks";
    document.getElementById("cpc1counter").innerText = "+1 CPC - Cost: " + cpc1cost;
    document.getElementById("cps1counter").innerText = "+1 CPS - Cost: " + cps1cost;
    document.getElementById("ver").innerText = version;
    const upgradeBtn = document.getElementById("cpc1counter");
    const upgradeBtn2 = document.getElementById("cps1counter");
    const upgradeBtn3 = document.getElementById("cHcounter");
    if (clicks >= cpc1cost) {
        upgradeBtn.classList.add("affordable");
    } else {
        upgradeBtn.classList.remove("affordable");
    }

    if (clicks >= cps1cost) {
        upgradeBtn2.classList.add("affordable");
    } else {
        upgradeBtn2.classList.remove("affordable");
    }

    if (clicks >= 500 && !criticalHitsPurchased) {
        upgradeBtn3.classList.add("affordable");
    } else {
        upgradeBtn3.classList.remove("affordable");
    }
}

document.getElementById('exportBtn').addEventListener('click', () => {
    const saveData = {
    clicks: clicks,
    cpc: cpc,
    cps: cps,
    cpc1cost: cpc1cost,
    cps1cost: cps1cost,
    criticalHitsPurchased: criticalHitsPurchased,
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

const fileInput = document.getElementById('fileInput');

document.getElementById('importBtn').addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (importedData.clicks !== undefined && importedData.cpc !== undefined) {
                
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

document.getElementById("clickBtn").addEventListener("click", doClick);
document.getElementById('confirmWipeBtn').addEventListener('click', executeWipe);
document.getElementById('cancelWipeBtn').addEventListener('click', closeModal);

mrLoop();
updateUI();
