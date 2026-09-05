import {
  Download,
  CopyIcon,
  Sparkles,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { CreateExtensionServiceWorkerMLCEngine } from "@mlc-ai/web-llm";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

function Letter() {
  const [webLLMLoader, setWebLLMLoader] = useState(0.01);
  const [coverLetter, setCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [webLLMInitError, setWebLLMInitError] = useState("");
  const engine = useRef(null);

  async function webLLMInit() {
    try {
      const initProgressCallback = (progress) => {
        setWebLLMLoader(Math.min(Math.max(progress.progress, 0.01), 1));
      };

      engine.current = await CreateExtensionServiceWorkerMLCEngine(
        "Qwen3-0.6B-q0f32-MLC",
        {
          initProgressCallback: initProgressCallback,
        },
      );
    } catch (error) {
      setWebLLMInitError(error);
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
          content: `
            Write a professional job application cover letter.

            STRICT RULES:
            1. Output ONLY the cover letter. No analysis, explanation, headings, labels, bullet points, markdown, placeholders, or notes.
            2. Write exactly 10 to 20 sentences.
            3. Write exactly 1 or 2 paragraphs.
            4. Start with a simple greeting using ONLY the company name from the job posting, such as "Dear [Company Name] Hiring Team,".
            5. End with a short professional closing such as "Thank you for considering my application." followed by "Sincerely," and the candidate's name exactly as it appears in the RESUME.
            6. Do NOT include an address, phone number, email address, LinkedIn, GitHub, date, recipient address, job location, or resume sections.
            7. Use ONLY qualifications, skills, education, projects, and work experience explicitly stated in the resume.
            8. Do NOT invent, infer, assume, exaggerate, or substitute technologies, responsibilities, seniority, or experience.
            9. Only mention a job requirement when the resume explicitly provides matching experience or knowledge.
            10. If a job requirement has no matching evidence in the resume, DO NOT mention it.
            11. Do not claim familiarity with a technology merely because it is similar to a technology in the resume.
            12. Do not repeat the job posting. Explain briefly why the candidate's documented experience is relevant to the position.
            13. Keep the writing natural, concise, and professional.
            14. Use the candidate's name exactly as written in the RESUME. Never use "[Your Name]" or any other placeholder. Never invent, modify, abbreviate, or substitute the candidate's name.
            
            Output the cover letter and nothing else.
          `,
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
      console.error("letter generation failed", error);
      setIsGenerating(false);
      setIsThinking(false);
      setCoverLetter("");
    }
  }

  useEffect(() => {
    webLLMInit();
  }, []);

  const progressPercent = Math.round(webLLMLoader * 100);

  return (
    <section
      className={clsx("flex flex-col gap-2 min-h-150", {
        "items-center justify-center gap-4 px-4": webLLMLoader < 1,
      })}
    >
      {webLLMInitError != "" ? (
        <span className="text-sm font-light text-accent">
          {webLLMInitError}
        </span>
      ) : webLLMLoader < 1 ? (
        <>
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
        </>
      ) : (
        <>
          <div className="flex items-center px-4">
            <img
              src="/assets/role_match_mascot_2.png"
              alt="role_match_mascot_1"
              className="size-16"
            />
            <div className="flex flex-col">
              <h3 className="font-bold text-lg font-fraunces">
                Your Cover Letter
              </h3>
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
        </>
      )}
    </section>
  );
}

export default Letter;
