# RoleMatch

RoleMatch is a Chrome extension that helps job seekers turn a resume and a job posting into a customized cover letter.

The extension keeps your resume and posting text on the local browser storage, lets you grab job text from a page, and then uses a local LLM via `@mlc-ai/web-llm` to generate a cover letter based only on the information in your resume.

## What this app does

- Lets you paste or store your resume / brag list
- Lets you paste or select job-posting text from the current page
- Generates a cover letter draft using a local language model
- Keeps data in Chrome local storage instead of uploading it to a server
- Gives a simple extension popup experience with three steps: Resume, Posting, Letter

## Tech stack

- React + Vite
- Chrome Extension Manifest V3
- `@mlc-ai/web-llm` for on-device model inference
- Chrome `storage` API for local persistence

## Local development

### Prerequisites

- Node.js 18+ or newer
- pnpm
- Google Chrome or Chromium-based browser

### Install dependencies

```bash
pnpm install
```

### Start a local dev build

```bash
pnpm dev
```

This runs the Vite dev server for the front-end. For a browser extension workflow, the most important build is the extension bundle that gets loaded into Chrome.

### Build the extension bundle

```bash
pnpm build
```

The project is configured to output the extension files into the `build/` directory.

> Note: the current build script uses `vite build --watch`, so it will continue watching for file changes after the initial build.

If you want a one-time production build without watch mode, you can run:

```bash
pnpm exec vite build
```

## Run the app locally in Chrome

1. In Chrome, open `chrome://extensions`
2. Enable Developer mode
3. Click Load unpacked
4. Select the `build/` folder from this project
5. Open the extension popup and use it normally

## Project flow

1. Enter your resume or brag list
2. Paste the job posting text or use the page text picker
3. Generate the cover letter
4. Review and edit the generated letter

## Notes

- The app stores the resume and job text in Chrome local storage
- No user account is required
- The generated cover letter is produced locally in-browser using the model runtime configured in the project

## Useful commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## License

This project is currently unlicensed unless otherwise specified in the repository.