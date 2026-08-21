chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "text-picked") return;

  chrome.storage.local
    .set({ text: message.text })
    .catch((error) => console.error("Could not store picked text", error));
});
