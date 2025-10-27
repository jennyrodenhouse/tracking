// Eye tracking state
let isGazing = {};
let gazeTimers = {};
let isTracking = false;
const GAZE_DURATION = 2000; // 2 seconds in milliseconds

// Initialize WebGazer
window.addEventListener('load', function() {
    initEyeTracking();
});

function initEyeTracking() {
    const calibrationStatus = document.getElementById('calibration-status');
    const calibrateBtn = document.getElementById('calibrate-btn');

    calibrationStatus.textContent = 'Initializing eye tracking...';

    webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null || !isTracking) {
            return;
        }

        const x = data.x;
        const y = data.y;

        // Check all color squares
        const squares = document.querySelectorAll('.color-square');
        squares.forEach(square => {
            const rect = square.getBoundingClientRect();
            const squareId = square.dataset.color;

            // Check if gaze is within the square
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                handleGazeEnter(square, squareId);
            } else {
                handleGazeExit(square, squareId);
            }
        });
    }).begin();

    // Configure WebGazer
    webgazer.showVideoPreview(true)
        .showPredictionPoints(true)
        .applyKalmanFilter(true);

    // Wait for initialization
    setTimeout(() => {
        isTracking = true;
        calibrationStatus.textContent = 'Eye tracking active! Look at squares to select.';
        calibrateBtn.style.display = 'inline-block';
    }, 1000);

    // Calibrate button
    calibrateBtn.addEventListener('click', () => {
        alert('Click on the video preview corners and center to calibrate. Look at each point as you click.');
    });
}

function handleGazeEnter(square, squareId) {
    // If already gazing at this square, do nothing
    if (isGazing[squareId]) {
        return;
    }

    // Mark as gazing
    isGazing[squareId] = true;
    square.classList.add('gazing');

    // Start timer for selection
    gazeTimers[squareId] = setTimeout(() => {
        selectColor(square.dataset.color);
    }, GAZE_DURATION);
}

function handleGazeExit(square, squareId) {
    // If not gazing, do nothing
    if (!isGazing[squareId]) {
        return;
    }

    // Clear gazing state
    isGazing[squareId] = false;
    square.classList.remove('gazing');

    // Clear timer
    if (gazeTimers[squareId]) {
        clearTimeout(gazeTimers[squareId]);
        delete gazeTimers[squareId];
    }
}

function selectColor(color) {
    // Clear all timers
    Object.values(gazeTimers).forEach(timer => clearTimeout(timer));
    gazeTimers = {};
    isGazing = {};

    // Navigate to color page
    const mainPage = document.getElementById('main-page');
    const colorPage = document.getElementById('color-page');

    mainPage.classList.remove('active');
    colorPage.classList.add('active');
    colorPage.style.backgroundColor = color;

    // Pause eye tracking
    isTracking = false;
}

// Back button functionality
document.getElementById('back-btn').addEventListener('click', () => {
    const mainPage = document.getElementById('main-page');
    const colorPage = document.getElementById('color-page');

    colorPage.classList.remove('active');
    mainPage.classList.add('active');

    // Resume eye tracking
    isTracking = true;

    // Reset all squares
    const squares = document.querySelectorAll('.color-square');
    squares.forEach(square => {
        square.classList.remove('gazing');
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (webgazer.isReady()) {
        webgazer.end();
    }
});
