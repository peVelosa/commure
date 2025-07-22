# Commure

A simple Express.js server that provides chess player statistics using the Lichess API.

## Features

- List top chess players
- Get rating history for top players
- Download player ratings as CSV

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Start (after build)

```bash
npm start
```

## API Endpoints

- `GET /players` — List top 50 players
- `GET /players/top/history` — Get rating history for the top player
- `GET /players/csv` — Download ratings for top 50 players as CSV

## Demo

[https://commure.onrender.com/](https://commure.onrender.com/)

---

MIT License
