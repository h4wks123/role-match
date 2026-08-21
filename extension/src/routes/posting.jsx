import { ArrowLeft, ClipboardPaste } from "lucide-react";
import { textPickerEvents } from "../scripts/utils";
import { useEffect, useState } from "react";

function Posting() {
  const [text, setText] = useState("");

  async function textPicker() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab || !Number.isInteger(tab.id)) return;

    await textPickerEvents(tab.id);
  }

  useEffect(() => {
    chrome.storage.local.get("text").then((result) => {
      setText(result.text ?? "");
    });

    function handleStorageChange(changes, areaName) {
      if (areaName !== "local" || !changes.text) return;
      setText(changes.text.newValue ?? "");
    }

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  return (
    <section className="flex flex-col justify-between min-h-150">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center px-4 py-2 ">
          <h3 className="font-bold text-lg font-fraunces">
            Grab the Job Posting
          </h3>
          <span className="text-sm font-light text-ink">
            Pull it straight off the page you're on, or paste it in yourself.
          </span>
        </div>
        <div className="flex flex-col gap-2 px-4 w-full">
          <button
            onClick={() => textPicker()}
            className="w-full bg-accent rounded-md flex justify-center items-center gap-1 px-4 py-2 cursor-pointer hover:bg-accent/85"
          >
            <ClipboardPaste className="text-paper" />
            <span className="text-sm text-paper">Pick text from page</span>
          </button>
          <div className="flex justify-between">
            <span>POSTING TEXT</span>
            <span>{text.length} chars</span>
          </div>
          <textarea
            maxLength={1000}
            placeholder="Paste the job description here..."
            className="min-h-95 w-full rounded-md bg-paper border border-light resize-none p-2"
            value={text}
            onChange={(event) => {
              const nextText = event.target.value;
              setText(nextText);
              chrome.storage.local.set({ text: nextText });
            }}
          />
        </div>
      </div>
      <div className="border-light border-t py-2 px-4 w-full flex justify-between items-center">
        <button className="flex gap-1 items-center cursor-pointer">
          <ArrowLeft className="size-5 text-dark" />
          <span className="text-sm text-dark">Back</span>
        </button>
        <button className="px-4 py-2 flex justify-center items-center bg-accent cursor-pointer rounded-md">
          <span className="text-paper text-sm">Write Cover Letter</span>
        </button>
      </div>
    </section>
  );
}

export default Posting;
