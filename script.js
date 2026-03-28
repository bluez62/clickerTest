const version = "V1.0.0";
let clicks = 0;
let cps = 0;
let cpc = 1;

function onecps() {
  if(clicks >= 50) {
    clicks -= 50;
    cps += 1;
  }
}

function mrLoop() {
  document.getElementById("counter").innerText = clicks;
setTimeout(() {
  mrLoop();
}, 1000 / 30);
}
