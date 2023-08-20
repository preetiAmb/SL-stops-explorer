# SL Stops Explorer

SL Stops Explorer is a web application that displays the names of every bus stop for each of the bus lines in the top 10 list.

## Language

- Backend: Node.js, Express, and TypeScript
- Frontend: React, React Hooks, TypeScript, and Material-UI
- Test: Jest

## API

The application utilizes the SL API for retrieving data:

- Lines API: `https://api.sl.se/api2/LineData.json?model=line&key=${API_KEY}`
- Stops API: `https://api.sl.se/api2/LineData.json?model=stop&key=${API_KEY}`

Replace `${API_KEY}` with your actual API key.

## Getting Started

To run the project, follow these steps:

1. Clone the repository.
2. Install dependencies for both the backend and frontend:
3. Start the backend and frontend by running npm run dev from the backend directory
