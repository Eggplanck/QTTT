---
name: run-qttt
description: Build, run, and drive the QTTT Quantum Tic-Tac-Toe web app. Use when asked to start QTTT, run the dev server, build it, run its tests, take a screenshot of the game, or play/interact with the running app.
---

QTTT is a Vite + React 19 app that plays Quantum Tic-Tac-Toe against an
in-browser TensorFlow.js DQN model. Start the dev
server on port 3000, then drive it headlessly with
`.claude/skills/run-qttt/driver.mjs` (Playwright) — `smoke` mode plays a
full turn against the AI and screenshots it; `repl` mode takes commands on
stdin. All paths below are relative to the repo root.

## Prerequisites

No `node` on PATH and no passwordless sudo on this machine. Node 20 is a
user-space tarball install:

```bash
[ -x ~/.local/opt/node-v20.19.4-linux-x64/bin/node ] || (
  mkdir -p ~/.local/opt && cd ~/.local/opt &&
  curl -fsSLO https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-x64.tar.xz &&
  tar -xf node-v20.19.4-linux-x64.tar.xz )
export PATH=~/.local/opt/node-v20.19.4-linux-x64/bin:$PATH
```

Playwright's Chromium needs ~16 system libraries that can't be apt-installed
without a password. The setup script extracts the .debs into
`~/.local/opt/chromium-libs` instead (the driver wires up `LD_LIBRARY_PATH`
itself):

```bash
bash .claude/skills/run-qttt/setup-chromium-libs.sh   # idempotent, prints ALL LIBS RESOLVED
```

## Setup

```bash
npm ci                                        # app deps
cd .claude/skills/run-qttt
npm install                                   # playwright for the driver
npx playwright install chromium               # ~115MB headless shell
cd ../../..
```

## Run (agent path)

Start the dev server in the background, then run the driver:

```bash
export PATH=~/.local/opt/node-v20.19.4-linux-x64/bin:$PATH
nohup npm start > /tmp/qttt-dev.log 2>&1 &
timeout 60 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done' && echo SERVING
```

```bash
node .claude/skills/run-qttt/driver.mjs smoke
```

`smoke` navigates to the app, waits for the DQN model to load, starts a game
as 〇, places a quantum stone pair, verifies the AI answered with ✖2, and
exits 0 printing `SMOKE OK`. Screenshots land in
`.claude/skills/run-qttt/screenshots/` (numbered, e.g. `01-start-screen.png`).

For ad-hoc interaction, `repl` mode reads commands from stdin (pipe a
heredoc, or run under tmux for iterative debugging):

```bash
node .claude/skills/run-qttt/driver.mjs repl <<'EOF'
click button:has-text("〇")
text .turndisplay
ss my-shot
errors
quit
EOF
```

| command | what it does |
|---|---|
| `nav <url>` | navigate (defaults to the dev server) |
| `click <selector>` | click first match (Playwright selectors; cells are `td.Block`) |
| `text <selector>` | print innerText of first match |
| `ss [name]` | screenshot into the skill's `screenshots/` dir |
| `eval <js>` | evaluate JS in the page |
| `errors` | print collected page/console errors |
| `quit` | close browser, exit |

Stop the dev server with:

```bash
pkill -f '[n]ode_modules/.bin/vite'
```

(The real server process is `node .../node_modules/.bin/vite` — the
`npm start` PID is just a wrapper, and killing it leaves the server running.
The `[n]` bracket keeps `pkill -f` from matching — and killing — your own
shell's command line.)

Set `QTTT_URL` to point the driver at a non-default URL (e.g. an
`npm run preview` of the production bundle — note preview serves under
`/QTTT/`, the GitHub Pages base path).

## Build

```bash
export PATH=~/.local/opt/node-v20.19.4-linux-x64/bin:$PATH
npm run build   # vite build → dist/ (built with base /QTTT/ for GitHub Pages)
```

## Test

```bash
npm test   # vitest run, 1 test, ~1s; tfjs is mocked so no network needed
```

## Gotchas

- **Browser viewport must be ≥1024px wide.** Below that, `src/App.css`'s
  mobile breakpoint gives the Place button `position: fixed; top: 120vmin` —
  off-screen in a headless viewport and unreachable by scrolling, so clicks
  time out with "element is outside of the viewport". The driver uses
  1280×960.
- **The app needs internet at page load.** `loadmodel()` in `src/App.jsx`
  fetches the model from the hardcoded deployed URL
  `https://eggplanck.github.io/QTTT/DDQN4/model.json` — not a relative path —
  so even local dev hits GitHub Pages. The "Loading..." screen can sit for
  ~10s; the driver waits up to 60s for "Select Mark and Start".
- **〇/✖ render as tofu boxes in screenshots** — headless Chromium has no
  CJK/symbol fonts here (installing fonts needs root). The DOM text is
  correct; assert on `text`/innerText, not on pixels.
- **AI moves are synchronous** — after clicking Place there's no spinner;
  the ✖ stones just appear. `wait-for`-ing the text `✖2` is the reliable
  signal that the model inference ran.

## Troubleshooting

- **`error while loading shared libraries: libnspr4.so`** (or libnss3, libgbm
  etc.) when the driver launches Chromium: the user-space libs are missing —
  run `bash .claude/skills/run-qttt/setup-chromium-libs.sh`.
- **`apt-get download` 404s** (`libnss3`, `libgbm1`): the local apt index is
  stale and `apt-get update` needs root. The setup script falls back to
  scraping the newest .deb from the Ubuntu pool directory.
- **Port 3000 already in use / stale server**: a previous server survived —
  `pkill -f '[n]ode_modules/.bin/vite'` and relaunch. Killing the
  `npm start` process is not enough; the node child keeps serving.
- **`node: command not found`**: nothing manages Node here — re-export the
  tarball PATH (see Prerequisites).
