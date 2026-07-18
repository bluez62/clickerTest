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

function exportSave() {
  // 1. Get your save data from localStorage or state
  const saveData = localStorage.getItem('myWebsiteSave');
  
  if (!saveData) {
    alert("No save data found to export!");
    return;
  }

  // 2. Create a Blob (Binary Large Object) containing the data
  const blob = new Blob([saveData], { type: 'application/json' });
  
  // 3. Create a temporary download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myWebsite_save.json'; // The file name the user will save
  
  // 4. Trigger the download and clean up
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importSave(event) {
  const file = event.target.files[0];
  
  if (!file) return;

  const reader = new FileReader();
  
  // When the reader finishes reading the file
  reader.onload = function(e) {
    try {
      const fileContent = e.target.result;
      
      // Optional: verify that the JSON is valid before saving
      JSON.parse(fileContent); 

      // Save to localStorage
      localStorage.setItem('myWebsiteSave', fileContent);
      
      alert("Save imported successfully! Refresh to apply changes.");
    } catch (error) {
      alert("Error parsing file. Please ensure it is a valid save file.");
    }
  };
  
  // Read the file as text
  reader.readAsText(file);
}

mrLoop();
