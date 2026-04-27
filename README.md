# FocusAir 2.0

FocusAir 2.0 is a React productivity app that turns a focus session into a virtual flight. Pick your route, airline, travel class, and seat, then "fly" through boarding, takeoff, cruise, descent, and landing while your timer tracks progress.

## Features

- Flight-style focus timer with animated sky phases
- Route selection from major Indian and international airports
- Airline, class, and seat selection with an A380-inspired seat map
- Boarding pass view before starting a session
- XP rewards, food/service boosts, break tracking, and flight completion logs
- Live origin/destination local time cards
- Flight attendant messages that react to session progress

## Tech Stack

- React
- Vite
- JavaScript
- Browser APIs for timers, local time formatting, and interactive UI state
- CSS-in-JS inline styling

## Getting Started

### Prerequisites

Install Node.js and npm before running the project.

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will start the development server on `127.0.0.1`. Open the local URL shown in the terminal.

## API and Data

FocusAir 2.0 uses built-in app data for airports, airlines, seat maps, flight phases, food rewards, and XP values. The UI also uses browser/runtime APIs for timing, local time display, and stateful interactions.

If you connect this project to a backend API, document the API base URL, required environment variables, authentication, and endpoint list here.

## Project Structure

```text
.
|-- FocusAir2.jsx       # Main React application
|-- src/
|   `-- main.jsx        # React entry point
|-- index.html          # Vite HTML shell
|-- dev-server.mjs      # Local server helper
|-- package.json        # Scripts and dependencies
`-- dist/               # Built output
```

## Usage

1. Enter a passenger name.
2. Choose departure and arrival airports.
3. Select an airline and cabin class.
4. Pick an available seat.
5. Review the boarding pass and begin the flight.
6. Stay focused until landing to earn XP and save the session to the flight log.

## License

No license has been added yet.
