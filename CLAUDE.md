# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A browser-based Quantum Tic-Tac-Toe game where the user plays against a Deep Q-Network (DQN) AI. The AI was trained in Python (TensorFlow 1.x, in `QTTT_DoubleDQN.ipynb`), then converted to a TensorFlow.js model and served as static assets; inference runs entirely in the browser. Deployed to GitHub Pages at https://eggplanck.github.io/QTTT/.

Stack: Vite 7 + React 19 (class components), TensorFlow.js 4.x, MUI v7 (`@mui/material`), Vitest. Vite 7 requires Node 20.19+ / 22.12+.

## Commands

- `npm start` (or `npm run dev`) — Vite dev server on port 3000 (set in `vite.config.js`)
- `npm run build` — production build to `dist/` (`base` is `/QTTT/` for GitHub Pages; dev serves at `/`)
- `npm test` — single Vitest run (jsdom); the test mocks `@tensorflow/tfjs` so it never hits the network
- `npm run deploy` — build and publish `dist/` to GitHub Pages via gh-pages

## Architecture

The entire game lives in `src/App.jsx` — a single React class component (`App`) plus `Block` and `InitDisplay` components (entry point `src/main.jsx`, HTML at root `index.html`). There is no separate game-engine module; the quantum tic-tac-toe rules are implemented as methods on `App`.

### Game state (kept as instance fields on `App`, mirrored into React state for rendering)

- `blocks[9]` — per-cell state; `stones` is an array of quantum marks (e.g. `'〇3 '`) until the cell collapses, then it becomes a string (e.g. `'〇3'`). **`typeof stones === 'string'` is the idiom used everywhere to test whether a cell is collapsed.**
- `stonePos[9]` — which turn numbers have a quantum stone in each cell
- `haveStones` — indexed by `turn - 1`; the pair of cells chosen on each turn
- `decidedPos[9]` / `stonePosForWinLose[3][3]` — collapsed (classical) values, used for the NN input and win detection respectively
- `turnType` — `'normal'` (place a stone in two cells) vs `'entanglement'` (a cyclic entanglement occurred and the mover must choose how to collapse it)
- Turn parity determines the mark: odd turns are 〇, even turns are ✖. `userMark` (0 = 〇, 1 = ✖) is chosen on the start screen.

### Key logic

- `checkEntanglement` / `checkBlock` — mutually recursive cycle detection over the entanglement graph
- `decideBlock` / `decideBlock1` / `decideBlock2` — recursively collapse a cycle once the player picks which mark resolves the shared cell
- `checkWinLose` — checks all lines on `stonePosForWinLose`; if both players complete a line, the one whose line was completed with the *lower* max turn number wins (per QTTT rules). Returns 0 (〇 wins), 1 (✖ wins), or -1 (no winner/draw)
- `ESRL(App)` — the AI move function. Encodes the board into a 162-dim tensor (per cell: 9 one-hot slots for a collapsed turn + 9 for quantum stones), runs `ESRLmodel.predict`, and maps the argmax over 45 actions (36 cell-pairs + 9 collapse choices) to a move, falling back to random when the choice is illegal. `weightRandom` adds softmax-style exploration on turns 1–2 for variety.

### Model assets

The trained model is loaded at startup from the hardcoded GitHub Pages URL `https://eggplanck.github.io/QTTT/DDQN4/model.json` (in `loadmodel()` at the top of `src/App.jsx`) — **not** from a relative path, so local dev still fetches the deployed model (internet required at page load). `public/` contains several converted models (`DDQN3`, `DDQN4`, `ESRLmodel`, `imitate`); DDQN4 is the one in use.

### Training code (not part of the web build)

- `QTTT_DoubleDQN.ipynb` — Double DQN training in TensorFlow 1.x/Keras. Contains a Python port of the same `App` game logic, board-symmetry converters (`board_converter` etc., 8 symmetries) for data augmentation, and export to TensorFlow.js format.
- `virtual_montecarro.py` — Python game environment plus a Monte Carlo tree search opponent, used during training/evaluation.

If the JS game logic in `src/App.jsx` is changed, the Python `App` class in the notebook and `virtual_montecarro.py` are parallel implementations of the same rules and encoding — keep them consistent, since the NN input encoding (162 features, 45 actions) must match between training and inference.
