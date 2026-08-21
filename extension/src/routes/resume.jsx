import { useState } from "react";
import { CloudUpload, FileText } from "lucide-react";

function Resume() {
  const [resume, setResume] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-4">
          <div className="bg-white border-2 border-dashed border-light rounded-lg flex flex-col gap-2 justify-center items-center p-18">
            <div className="flex justify-center items-center p-3 bg-canvas rounded-full text-dark">
              <CloudUpload />
            </div>
            <article className="flex flex-col gap-1 justify-center items-center">
              <h6 className="font-bold text-sm text-ink">
                Drop your resume here
              </h6>
              <span className="text-xs text-dark">
                PDF, DOCX or TXT · up to 5 MB
              </span>
            </article>
            <div className="rounded-lg border-dark border bg-canvas hover:bg-light">
              <label
                htmlFor="resume-upload"
                className="px-4 py-2 inline-block cursor-pointer font-bold text-md text-ink"
              >
                Choose a File
              </label>
              <input
                id="resume-upload"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                multiple={false}
                className="hidden"
                onChange={(event) => setResume(event.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          {resume && (
            <div className="p-4 flex items-center gap-2 bg-white border-light border rounded-lg">
              <div className="bg-red-300 p-2 rounded-lg">
                <FileText className="text-red-500" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <h6 className="text-sm font-bold text-ink">
                  {resume.name.length > 30
                    ? `${resume.name.slice(0, 30)}...`
                    : resume.name}
                </h6>
                {(resume.size / (1024 * 1024)).toFixed(2)} MB ·{" "}
                {resume.type || "Unknown file type"}
              </div>
            </div>
          )}
        </form>
        <p className="px-4 text-sm font-light text-ink">
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
