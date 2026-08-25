chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "text-picked") {
    chrome.storage.local
      .set({ posting_text: message.text })
      .catch((error) => console.error("Could not store picked text", error));
  }
});
