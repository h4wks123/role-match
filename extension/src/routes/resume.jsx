import { useEffect, useState } from "react";

function Resume() {
  const [text, setText] = useState("");

  useEffect(() => {
    chrome.storage.local.get("resume_text").then((result) => {
      setText(result.resume_text ?? "");
    });

    function handleStorageChange(changes, areaName) {
      if (areaName !== "local" || !changes.resume_text) return;
      setText(changes.resume_text.newValue ?? "");
    }

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  return (
    <section className="flex flex-col justify-between min-h-150">
      <div className="flex flex-col gap-2">
        <div className="flex items-center px-4 py-2">
          <img
            src="/assets/role_match_mascot_2.png"
            alt="role_match_mascot_1"
            className="size-16"
          />
          <div className="flex flex-col">
            <h3 className="font-bold text-lg font-fraunces">
              Let's Start With You
            </h3>
            <span className="text-sm font-light text-ink">
              Your resume stays on this device. It's only used as context when
              writing.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4 w-full">
          <div className="flex justify-between">
            <span>RESUME / BRAG LIST</span>
            <span>{text.length} chars</span>
          </div>
          <textarea
            maxLength={7500}
            placeholder="Paste your resume / brag list here..."
            className="min-h-95 w-full rounded-md bg-paper border border-light resize-none p-2"
            value={text}
            onChange={(event) => {
              const nextText = event.target.value;
              setText(nextText);
              chrome.storage.local.set({ resume_text: nextText });
            }}
          />
        </div>
        <p className="px-4 pb-2 text-sm font-light text-ink">
          No account needed. Nothing is uploaded to a server, clear it any time
          from the extension menu.
        </p>
      </div>
      <div className="border-light border-t py-2 px-4 w-full flex justify-end items-center">
        <button className="px-4 py-2 flex justify-center items-center bg-accent cursor-pointer rounded-md">
          <span className="text-white text-sm">Next: Job Posting</span>
        </button>
      </div>
    </section>
  );
}

export default Resume;
