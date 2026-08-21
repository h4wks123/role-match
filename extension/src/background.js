chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "text-picked") {
    console.log("Picked text:", message.text);
  }
});
