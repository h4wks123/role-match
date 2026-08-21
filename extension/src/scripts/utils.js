export async function textPickerEvents(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      if (window.__roleMatchPickerCleanup) {
        window.__roleMatchPickerCleanup();
      }

      let prevHighlightedText = null;
      let previousOutline = "";

      window.__roleMatchPickerCleanup = cleanup;
      document.addEventListener("mouseover", handleHover, true);
      document.addEventListener("click", handleClick, true);

      function handleHover(event) {
        if (prevHighlightedText) {
          prevHighlightedText.style.outline = previousOutline;
        }

        const highlightedText = event.target;
        if (!(highlightedText instanceof Element)) return;

        prevHighlightedText = highlightedText;
        previousOutline = highlightedText.style.outline;
        highlightedText.style.outline = "1px solid #e7e9ea";
      }

      function handleClick(event) {
        const element = event.target;
        if (!(element instanceof Element)) return;

        const text = (element.innerText || element.textContent || "").trim();

        cleanup();
        chrome.runtime.sendMessage({
          type: "text-picked",
          text,
        });
      }

      function cleanup() {
        if (prevHighlightedText) {
          prevHighlightedText.style.outline = previousOutline;
        }
        document.removeEventListener("mouseover", handleHover, true);
        document.removeEventListener("click", handleClick, true);
        delete window.__roleMatchPickerCleanup;
      }
    },
  });
}
