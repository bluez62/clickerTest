const version = "V1.0.0";
let clicks = 4;
let cps = 0;
let cpc = 1;

function onecps() {
  if(clicks >= 50) {
    clicks -= 50;
    cps += 1;
    document.getElementById("counter").innerText = clicks + " Clicks"
  }
}

function mrLoop() {
setTimeout(() => {
  mrLoop();
}, 1000 / 30);
}

function doClick() {
  clicks += 1
  console.log(clicks)
  document.getElementById("counter").innerText = clicks + " Clicks"
}
mrLoop();
