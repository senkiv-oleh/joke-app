# Joke App

A simple React + TypeScript app that displays random jokes and lets users refresh or delete them. Built with Material UI for modern styling.

## Demo

[Demo Link](https://senkiv-oleh.github.io/joke-app/)

## Tech Stack

- React 19
- TypeScript
- Material UI (MUI)
- React Scripts
- Create React App

## Installation

Make sure you have **Node.js** and **npm** installed.

```bash
git clone https://github.com/senkiv-oleh/joke-app.git
cd joke-app
npm install
```

## Start the App

```bash
npm start
```

The app will run locally at: [http://localhost:3000](http://localhost:3000)

## Features

- Fetches random jokes from an API
- Delete jokes from the list
- Refresh a joke
- Responsive and clean UI with MUI components

## Folder Structure

```
src/
├── components/
│   ├── Controls.tsx
│   ├── JokeCard.tsx
│   └── JokeList.tsx
├── constants/
|   ├── constants.ts
│   └── urls.ts
|── hooks/
│   └── useJokes.ts
|── services/
│   └── jokeService.ts
├── types/
|   ├── controls.ts
│   └── joke.ts
├── utils/
│   ├── helpers.ts
│   └── storage.ts
├── App.tsx
├── index.tsx
└── reportWebVitals.ts
```

## Scripts

- `npm start` — run the dev server
- `npm run build` — build for production
- `npm test` — run tests

## Author

Oleh Senkiv
[GitHub](https://github.com/senkiv-oleh) |
[LinkedIn](https://www.linkedin.com/in/oleh-senkiv-5a78b3177/) |

## License

MIT License © 2025 Oleh Senkiv
