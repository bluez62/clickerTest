const version = "V1.0.0";
let clicks = 4;
let cps = 0;
let cpc = 1;
let cpc1cost = 50;

function onecps() {
  if(clicks >= cpc1cost) {
    clicks -= cpc1cost;
    cpc += 1;
    cpc1cost *= 1.15;
    cpc1cost = Math.round(cpc1cost);
    updateUI();
  }
}

function mrLoop() {
setTimeout(() => {
  mrLoop();
  updateIO();
}, 1000 / 30);
}

function doClick() {
  clicks += cpc
  console.log(clicks)
  updateUI();
}

function updateUI() {
  // 1. Update the visible text on screen
  document.getElementById("counter").innerText = clicks + " Clicks";
  document.getElementById("cpc1counter").innerText = "+1 CPS - Cost: " + cpc1cost;
  const upgradeBtn = document.getElementById("cpc1counter");
  if (clicks >= cpc1cost) {
    upgradeBtn.classList.add("affordable");
  } else {
    upgradeBtn.classList.remove("affordable");
  }
}

document.getElementById('exportBtn').addEventListener('click', () => {
    // 1. Gather your website state (e.g., from localStorage or a game object)
    const saveData = {
        clicks: clicks,
        cpc: cpc,
        cps: cps,
        cpc1cost: cpc1cost,
        timestamp: new Date().toISOString()
    };

    // 2. Convert data to a JSON string and create a Blob
    const dataStr = JSON.stringify(saveData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    // 3. Create a temporary download link and click it programmatically
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    
    downloadAnchor.href = url;
    downloadAnchor.download = `bluezClicker${Date.now()}.json`; // Filename
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    
    // 4. Clean up the DOM and memory
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
});

const fileInput = document.getElementById('fileInput');

// Trigger the hidden file selector when clicking the "Import" button
document.getElementById('importBtn').addEventListener('click', () => {
    fileInput.click();
});

// Listen for when a file is selected
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    // Define what happens when the file finishes loading
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate your imported data structure here
            if (importedData.clicks !== undefined && importedData.cps !== undefined) {
                // Apply data to your app (example: saving back to localStorage)
                localStorage.setItem('userGameSave', JSON.stringify(importedData));
                
                alert('Save imported successfully! Reloading page...');
                location.reload(); // Reload to apply changes if necessary
            } else {
                alert('Invalid save file format.');
            }
        } catch (error) {
            alert('Error reading save file. Ensure it is a valid JSON file.');
        }
    };

    // Read the file as plain text
    reader.readAsText(file);
    
    // Reset file input value so the same file can be uploaded again if needed
    fileInput.value = '';
});


mrLoop();
