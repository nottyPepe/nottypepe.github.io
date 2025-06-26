let stopwatchInterval;
let seconds = 0,
  minutes = 0,
  hours = 0;

function updateStopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  document.getElementById(
    "stopwatch"
  ).innerText = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("stopwatch").innerText = "00:00:00";
}
