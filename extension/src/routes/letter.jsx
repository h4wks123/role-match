import { Download, CopyIcon, Sparkles, FileText } from "lucide-react";

function Letter() {
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
          onClick={() => {}}
          className="w-full bg-accent rounded-md flex justify-center items-center gap-1 px-4 py-2 cursor-pointer hover:bg-accent/85"
        >
          <Sparkles className="text-paper" />
          <span className="text-sm text-paper">Generate Cover Letter</span>
        </button>
        <textarea
          placeholder="Your customized cover letter is displayed here..."
          className="min-h-70 w-full rounded-md bg-paper border border-light resize-none p-2"
        />
        <span>100 chars</span>
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
