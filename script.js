const version = "V1.0.0";
let clicks = 4;
let cps = 0;
let cpc = 1;
let cpc1cost = 50;

function onecps() {
  if(clicks >= 50) {
    clicks -= 50;
    cpc += 1;
    document.getElementById("counter").innerText = clicks + " Clicks";
    cpc1cost *= 1.15;
    cpc1cost = Math.round(cpc1cost);
    document.getElementById("cpc1counter").innerText = "+1 CPC - Cost: " + cpc1cost;
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
  document.getElementById("counter").innerText = clicks + " Clicks"
}
mrLoop();
