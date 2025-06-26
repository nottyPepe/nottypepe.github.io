let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  document.getElementById("stopwatch").textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    document.getElementById("stopwatch").classList.add("running");

    // Add visual feedback
    createRipple(event);
  }
}

function stopStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("stopwatch").classList.remove("running");

    // Add visual feedback
    createRipple(event);
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  document.getElementById("stopwatch").classList.remove("running");

  // Add visual feedback
  createRipple(event);

  // Add reset animation
  const stopwatch = document.getElementById("stopwatch");
  stopwatch.style.animation = "none";
  setTimeout(() => {
    stopwatch.style.animation = "";
  }, 10);
}

function createRipple(event) {
  if (!event) return;

  const button = event.target;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Initialize the display
updateDisplay();

// Add keyboard shortcuts
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      if (isRunning) {
        stopStopwatch();
      } else {
        startStopwatch();
      }
      break;
    case "KeyR":
      event.preventDefault();
      resetStopwatch();
      break;
  }
});
