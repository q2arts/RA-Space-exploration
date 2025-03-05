let stressLevel = 30;
let simulationInterval;
const maxStress = 100;
const minStress = 0;

function updateStressDisplay() {
    document.getElementById('stress-progress').style.width = stressLevel + '%';
    document.getElementById('stress-value').textContent = Math.round(stressLevel) + '%';
    document.getElementById('heart-rate').textContent = Math.floor(80 + (stressLevel * 0.4));
    document.getElementById('oxygen').textContent = Math.max(85, 100 - Math.floor(stressLevel * 0.15));
}

function startScenario() {
    if (!simulationInterval) {
        simulationInterval = setInterval(() => {
            if (stressLevel < maxStress) {
                stressLevel += Math.random() * 1.5;
                updateStressDisplay();
            }
        }, 2000);
    }
}

function resetScenario() {
    clearInterval(simulationInterval);
    simulationInterval = null;
    stressLevel = 30;
    updateStressDisplay();
}

function applyBreathing() {
    if (stressLevel > 20) {
        stressLevel = Math.max(minStress, stressLevel - 20);
        updateStressDisplay();
    }
}

function findSolution() {
    if (stressLevel > 10) {
        stressLevel = Math.max(minStress, stressLevel - 10);
        updateStressDisplay();
    }
}

// Initialize
updateStressDisplay();