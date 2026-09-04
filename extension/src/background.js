import { ExtensionServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// Hookup an engine to a service worker handler
let handler;

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "web_llm_service_worker");
  if (handler === undefined) {
    handler = new ExtensionServiceWorkerMLCEngineHandler(port);
  } else {
    handler.setPort(port);
  }
  port.onMessage.addListener(handler.onmessage.bind(handler));
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "text-picked") {
    chrome.storage.local
      .set({ posting_text: message.text })
      .catch((error) => console.error("Could not store picked text", error));
  }
});
