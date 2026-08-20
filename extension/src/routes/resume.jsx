import { useState } from "react";

function Resume() {
  const [resume, setResume] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="flex flex-col justify-between min-h-125">
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
          <div className="bg-white border-2 border-dashed border-light rounded-lg flex flex-col gap-4 justify-center items-center p-18">
            <label htmlFor="resume-upload" className="text-sm">
              Drop your resume here
            </label>
            <input
              id="resume-upload"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              multiple={false}
              onChange={(event) => setResume(event.target.files?.[0] ?? null)}
            />
          </div>
          {resume && (
            <span className="text-sm">Selected file: {resume.name}</span>
          )}
        </form>
        <p className="px-4 text-sm font-light text-ink">
          No account needed. Nothing is uploaded to a server, clear it any time
          from the extension menu.
        </p>
      </div>
      <div className="border-light border-t py-2 px-4 w-full flex justify-end items-center">
        <button className="px-4 py-2 flex justify-center items-center bg-accent cursor-pointer rounded-md">
          <span className="text-white">Next: Job Posting</span>
        </button>
      </div>
    </section>
  );
}

export default Resume;
