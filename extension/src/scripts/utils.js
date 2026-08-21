export async function textPickerEvents(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      let prevHighlightedText = null;

      function handleHover(event) {
        if (prevHighlightedText) {
          prevHighlightedText.style.outline = "";
        }

        const highlightedText = event.target;
        prevHighlightedText = highlightedText;
        highlightedText.style.outline = "1px solid #e7e9ea";
      }

      function handleClick(event) {
        const element = event.target;
        const text = (element.innerText || element.textContent || "").trim();
        console.log(text);
      }

      document.addEventListener("mouseover", handleHover, true);
      document.addEventListener("click", handleClick, true);
    },
  });
}
