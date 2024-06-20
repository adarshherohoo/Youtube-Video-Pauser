let lastActiveTabId = null;

// Function to pause video in the specified tab
function pauseVideoInTab(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      const video = document.querySelector("video");
      if (video && !video.paused) {
        video.pause();
      }
    }
  });
}

// Function to play video in the specified tab
function playVideoInTab(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      const video = document.querySelector("video");
      if (video && video.paused) {
        video.play();
      }
    }
  });
}

// Listen for tab activation changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  // Pause video in the last active YouTube tab
  if (lastActiveTabId && lastActiveTabId !== activeInfo.tabId) {
    pauseVideoInTab(lastActiveTabId);
  }

  // Play video in the newly activated tab if it's a YouTube tab
  chrome.tabs.get(activeInfo.tabId, (activeTab) => {
    if (activeTab.url && activeTab.url.includes("youtube.com")) {
      playVideoInTab(activeTab.id);
      lastActiveTabId = activeTab.id;
    }
  });
});

// Listen for tab updates (e.g., URL change)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
    // Play video when the tab finishes loading if it's active
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
      if (activeTabs.length > 0 && activeTabs[0].id === tabId) {
        playVideoInTab(tabId);
        lastActiveTabId = tabId;
      }
    });
  }
});

// Window focus change listener
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // Window lost focus
    if (lastActiveTabId) {
      pauseVideoInTab(lastActiveTabId);
    }
  } else {
    // Window regained focus
    chrome.windows.get(windowId, { populate: true }, (currentWindow) => {
      if (currentWindow && currentWindow.tabs) {
        currentWindow.tabs.forEach((tab) => {
          if (tab.active && tab.url && tab.url.includes("youtube.com")) {
            playVideoInTab(tab.id);
            lastActiveTabId = tab.id;
          }
        });
      }
    });
  }
});
