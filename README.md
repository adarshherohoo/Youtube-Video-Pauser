# Youtube Video Pauser

A Chrome extension that automatically pauses YouTube videos when you switch applications or tabs, ensuring you never miss a moment.

## Features

- Automatically pauses YouTube videos when switching to a different application.
- Resumes playing the video when you return to the YouTube tab.
- Pauses YouTube videos when switching between Chrome tabs.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle in the top right corner.
4. Click on "Load unpacked" and select the directory where you downloaded/cloned this repository.

## Usage

1. Once the extension is installed, click the extension icon in the Chrome toolbar to enable it.
2. Play any YouTube video.
3. Switch to a different application or a different Chrome tab.
4. The YouTube video will automatically pause.
5. Switch back to the YouTube tab or Chrome window to resume playing the video.

## How It Works

- The extension listens for window focus changes and tab activation events.
- When the Chrome window loses focus or you switch to a different tab, the extension pauses the YouTube video.
- When you return to the Chrome window or the YouTube tab, the extension resumes the video playback.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
