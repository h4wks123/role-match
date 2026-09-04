import {
  Download,
  CopyIcon,
  Sparkles,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { CreateExtensionServiceWorkerMLCEngine } from "@mlc-ai/web-llm";
import { useEffect, useRef, useState } from "react";

function Letter() {
  const [webLLMLoader, setWebLLMLoader] = useState(0.01);
  const [coverLetter, setCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const engine = useRef(null);

  async function webLLMInit() {
    try {
      const initProgressCallback = (progress) => {
        setWebLLMLoader(Math.min(Math.max(progress.progress, 0.01), 1));
      };

      engine.current = await CreateExtensionServiceWorkerMLCEngine(
        "Qwen3-0.6B-q4f16_1-MLC",
        {
          initProgressCallback: initProgressCallback,
        },
      );
    } catch (error) {
      console.error("Model initialization failed:", error);
    }
  }

  async function createCoverLetter() {
    setCoverLetter("Generating cover letter...");
    setIsGenerating(true);
    setIsThinking(false);

    try {
      const { resume_text, posting_text } = await chrome.storage.local.get([
        "resume_text",
        "posting_text",
      ]);

      const messages = [
        {
          role: "system",
          content:
            "Generate only a professional cover letter tailored to the provided job posting, using relevant information from the resume. Do not invent qualifications or experience. Do not include analysis, commentary, labels, or anything outside the cover letter.",
        },
        {
          role: "user",
          content: `Resume:\n${resume_text}\n\nJob posting:\n${posting_text}`,
        },
      ];

      if (!engine.current) {
        setIsGenerating(false);
        setCoverLetter("");
        return;
      }

      const completion = await engine.current.chat.completions.create({
        messages,
        stream: true,
      });

      let curMessage = "";
      let rawResponse = "";
      let thinkingStarted = false;
      let thinkingFinished = false;
      let chunkCount = 0;

      for await (const chunk of completion) {
        chunkCount += 1;
        const curDelta = chunk.choices?.[0]?.delta?.content;

        if (curDelta) {
          rawResponse += curDelta;

          if (!thinkingFinished) {
            const thinkStart = rawResponse.indexOf("<think>");

            if (!thinkingStarted && thinkStart !== -1) {
              thinkingStarted = true;
              setIsThinking(true);
              setCoverLetter("");
            }

            if (thinkingStarted) {
              const thinkingStart = thinkStart + "<think>".length;
              const thinkEnd = rawResponse.indexOf("</think>", thinkingStart);

              if (thinkEnd === -1) {
                const currentThinking = rawResponse.slice(thinkingStart);
                setCoverLetter(currentThinking);
              } else {
                thinkingFinished = true;
                setIsThinking(false);
                curMessage = rawResponse.slice(thinkEnd + "</think>".length);
                setCoverLetter(curMessage);
              }
            }
          } else {
            curMessage = rawResponse.slice(
              rawResponse.indexOf("</think>") + "</think>".length,
            );
            setCoverLetter(curMessage);
          }
        }
      }

      if (!thinkingStarted) {
        setCoverLetter(rawResponse);
      }

      setIsGenerating(false);
      setIsThinking(false);
    } catch (error) {
      console.error("[letter] generation failed", error);
      setIsGenerating(false);
      setIsThinking(false);
      setCoverLetter("");
    }
  }

  useEffect(() => {
    webLLMInit();
  }, []);

  if (webLLMLoader < 1) {
    const progressPercent = Math.round(webLLMLoader * 100);

    return (
      <section className="flex min-h-150 flex-col items-center justify-center gap-4 px-4">
        <span className="text-sm font-light text-ink">
          Loading language model... {progressPercent}%
        </span>
        <div
          className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-light"
          role="progressbar"
          aria-label="Loading language model"
          aria-valuemin="1"
          aria-valuemax="100"
          aria-valuenow={progressPercent}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2 min-h-150">
      <div className="flex items-center px-4">
        <img
          src="/assets/role_match_mascot_2.png"
          alt="role_match_mascot_1"
          className="size-16"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-lg font-fraunces">Your Cover Letter</h3>
          <span className="text-sm font-light text-ink">
            Edit anything below, it saves as you type.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <button
          onClick={() => createCoverLetter()}
          disabled={isGenerating}
          className="w-full bg-accent rounded-md flex justify-center items-center gap-1 px-4 py-2 cursor-pointer hover:bg-accent/85 disabled:cursor-wait disabled:opacity-70"
        >
          {isGenerating ? (
            <LoaderCircle className="animate-spin text-paper" />
          ) : (
            <Sparkles className="text-paper" />
          )}
          <span className="text-sm text-paper">
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </span>
        </button>
        <textarea
          placeholder="Your customized cover letter is displayed here..."
          className="min-h-70 w-full rounded-md bg-paper border border-light resize-none p-2"
          value={coverLetter}
          aria-busy={isGenerating}
          onChange={(event) => {
            if (!isGenerating && !isThinking) {
              setCoverLetter(event.target.value);
            }
          }}
        />
        <span>{coverLetter.length} chars</span>
      </div>
      <div className="border-light border-t py-2 px-4 w-full flex flex-col justify-center items-center gap-4">
        <button
          onClick={() => {}}
          className="w-full border-dark border bg-canvas rounded-md flex justify-center items-center gap-1 px-4 py-2 cursor-pointer hover:bg-light"
        >
          <CopyIcon className="text-ink" />
          <span className="text-sm text-ink">Copy Letter</span>
        </button>
        <div className="w-full flex justify-between gap-4">
          <button
            onClick={() => {}}
            className="flex-auto bg-accent rounded-md flex justify-center items-center gap-1 px-4 py-2 cursor-pointer hover:bg-accent/85"
          >
            <Download className="text-paper" />
            <span className="text-sm text-paper">PDF</span>
          </button>
          <button
            onClick={() => {}}
            className="flex-auto border-dark border bg-canvas rounded-md flex justify-center items-center gap-1 px-4 py-2 cursor-pointer hover:bg-light"
          >
            <FileText className="text-ink" />
            <span className="text-sm text-ink">Word</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Letter;
