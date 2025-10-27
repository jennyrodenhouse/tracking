# Eye Tracking Color Selector

An interactive website that uses eye tracking technology to select colors. Look at a colored square for 2 seconds to navigate to a page filled with that color.

## Features

- 10 vibrant color squares to choose from
- Real-time eye tracking using WebGazer.js
- Visual feedback with loading circle animation
- 2-second gaze timer for selection
- Full-page color display after selection
- Responsive design for different screen sizes

## How to Use

1. **Open the Website**: Open `index.html` in a modern web browser (Chrome, Firefox, or Edge recommended)

2. **Allow Camera Access**: The browser will request camera permission. Click "Allow" to enable eye tracking.

3. **Initial Calibration**:
   - The eye tracking will initialize automatically
   - For better accuracy, click the "Calibrate" button
   - Click on different points shown in the video preview while looking at them

4. **Select a Color**:
   - Look at any colored square for 2 seconds
   - A white loading circle will appear and animate while you're looking
   - After 2 seconds, you'll be taken to a page with that color as the background

5. **Return to Selection**: Click the "Back to Selection" button to choose another color

## Technical Details

### Files Structure
- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `app.js` - Eye tracking logic and interactions

### Technologies Used
- **WebGazer.js**: Real-time eye tracking library from Brown University
- Vanilla JavaScript for interaction logic
- CSS3 animations for visual feedback

### Eye Tracking
- Uses webcam to track eye gaze position
- Detects when user looks at a square for 2 consecutive seconds
- Provides visual feedback with loading animation
- Kalman filter applied for smoother tracking

## Browser Requirements

- Modern browser with WebRTC support
- Webcam access required
- JavaScript enabled

## Tips for Best Results

- Ensure good lighting on your face
- Position yourself about 1-2 feet from the screen
- Keep your head relatively still while gazing
- Calibrate for improved accuracy
- Use the video preview to see if your face is properly detected

## Color Palette

The 10 colors included:
1. Coral Red (#FF6B6B)
2. Turquoise (#4ECDC4)
3. Sky Blue (#45B7D1)
4. Light Coral (#FFA07A)
5. Mint Green (#98D8C8)
6. Soft Yellow (#F7DC6F)
7. Lavender (#BB8FCE)
8. Powder Blue (#85C1E2)
9. Peach (#F8B88B)
10. Forest Green (#52B788)

## Privacy

All eye tracking is performed locally in your browser. No data is sent to external servers.
