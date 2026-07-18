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
    updateDisplay();
  }
}

function mrLoop() {
setTimeout(() => {
  mrLoop();
}, 1000 / 30);
}

function doClick() {
  clicks += cpc
  console.log(clicks)
  updateDisplay();
}

function updateUI() {
  // 1. Update the visible text on screen
  document.getElementById("counter").innerText = clicks + " Clicks";
  document.getElementById("cpc1counter").innerText = "+1 CPS - Cost: " + upgradeCost;
  const upgradeBtn = document.getElementById("cpc1counter");
  if (clicks >= upgradeCost) {
    upgradeBtn.classList.add("affordable");
  } else {
    upgradeBtn.classList.remove("affordable");
  }
mrLoop();
