import { useState } from "react";
import Resume from "./routes/resume";
import Posting from "./routes/posting";
import Letter from "./routes/letter";
import clsx from "clsx";

function App() {
  const [page, setPage] = useState(1);

  const pages = {
    1: Resume,
    2: Posting,
    3: Letter,
  };

  const Page = pages[page] ?? Resume;

  return (
    <main className="min-h-full w-full min-w-112.5 bg-canvas flex flex-col">
      <header className="flex items-center px-4 py-2 border-b border-light">
        <img
          src="/assets/role_match_mascot_1.png"
          alt="role_match_mascot_1"
          className="size-16"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-lg font-fraunces">RoleMatch</h3>
          <span className="text-xs font-extralight text-ink">
            Cover Letter Generator
          </span>
        </div>
      </header>
      <nav className="flex gap-2 justify-between items-center px-4 border-b border-light">
        <div
          className={clsx(
            "flex gap-2 items-center cursor-pointer px-2 py-3 border-b-2 hover:bg-orange-200",
            {
              "border-accent": page === 1,
              "border-transparent": page !== 1,
            },
          )}
          onClick={() => setPage(1)}
        >
          <div className="bg-ink rounded-full size-5 flex justify-center items-center">
            <span className="text-white text-sm">1</span>
          </div>
          <span className="text-xs font-semibold">Resume</span>
        </div>
        <div
          className={clsx(
            "flex gap-2 items-center cursor-pointer px-2 py-3 border-b-2 hover:bg-orange-200",
            {
              "border-accent": page === 2,
              "border-transparent": page !== 2,
            },
          )}
          onClick={() => setPage(2)}
        >
          <div className="bg-ink rounded-full size-5 flex justify-center items-center">
            <span className="text-white text-sm">2</span>
          </div>
          <span className="text-xs font-semibold">Posting</span>
        </div>
        <div
          className={clsx(
            "flex gap-2 items-center cursor-pointer px-2 py-3 border-b-2 hover:bg-orange-200",
            {
              "border-accent": page === 3,
              "border-transparent": page !== 3,
            },
          )}
          onClick={() => setPage(3)}
        >
          <div className="bg-ink rounded-full size-5 flex justify-center items-center">
            <span className="text-white text-sm">3</span>
          </div>
          <span className="text-xs font-semibold">Letter</span>
        </div>
      </nav>
      <Page />
    </main>
  );
}

export default App;
