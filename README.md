# GridSense

GridSense is a Formula 1 analytics dashboard that analyzes race data to provide insights into driver and constructor performance across various seasons.

## Features

- **Dashboard Overview**: Summary of latest race results and current season standings.
- **Standings**: Detailed driver and constructor rankings for any selected season.
- **Race Schedule**: Full calendars from 1950 to the present with track details.
- **Global Search**: Filtering system for locating specific drivers and teams.
- **Driver Profiles**: Contextual driver biographies and individual race telemetry.

## API Integration

GridSense utilizes the **Jolpica F1 API** (Ergast-compatible) to retrieve real-time and historical data.

- **Base URL**: `https://api.jolpi.ca/ergast/f1/`
- **Data Points**: Race results, driver biographies, grid positions, and constructor standings.

## Technical Implementation

### Core Concepts
- **Asynchronous Operations**: Uses `async/await` and the Fetch API for non-blocking data synchronization.
- **Data Processing**: Leverages array higher-order functions to transform raw telemetry into actionable insights.
- **Modular Architecture**: Separate modules for API communication, view rendering, and state management.

### How It Works
1. Fetches race data from the Jolpica API endpoints.
2. Extracts critical fields such as finishing position, grid start, and team data.
3. Processes and aggregates data using internal logic modules.
4. Renders dynamic components into the dashboard interface.

## Folder Structure

- `src/` - Application source code
  - `api/` - API wrappers and fetch utilities
  - `ui/` - Rendering logic for dashboard, standings, and modals
- `public/` - Static assets and video backgrounds
- `index.html` - Main application entry point
- `index.css` - Global styles and design system

## Setup

1. Clone the repository.
2. Open `index.html` in a modern web browser.
3. Use the sidebar navigation and season selector to explore telemetry.