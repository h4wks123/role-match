import { useState } from "react";
import Resume from "./routes/resume";
import Posting from "./routes/posting";
import Letter from "./routes/letter";

function App() {
  const [page, setPage] = useState(1);

  return (
    <main className="min-h-full w-full min-w-112.5 bg-canvas flex flex-col">
      <header className="flex gap-4 px-4 py-2 border-b border-light">
        <div />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg">RoleMatch</h3>
          <span className="text-sm">No resume yet</span>
        </div>
      </header>
      <nav className="flex gap-2 justify-between items-center px-4 py-2 border-b border-light">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => setPage(1)}
        >
          <div className="bg-ink rounded-full size-6 p-2 flex justify-center items-center">
            <span className="text-white text-md">1</span>
          </div>
          <span className="text-sm">Resume</span>
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setPage(2)}
        >
          <div className="bg-ink rounded-full size-6 p-2 flex justify-center items-center">
            <span className="text-white text-md">2</span>
          </div>
          <span className="text-sm">Posting</span>
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setPage(3)}
        >
          <div className="bg-ink rounded-full size-6 p-2 flex justify-center items-center">
            <span className="text-white text-md">3</span>
          </div>
          <span className="text-sm">Letter</span>
        </div>
      </nav>
      {page == 1 ? (
        <Resume />
      ) : page == 2 ? (
        <Posting />
      ) : page == 3 ? (
        <Letter />
      ) : (
        <Resume />
      )}
    </main>
  );
}

export default App;
