# GridSense

## Overview

GridSense is a dashboard that analyzes Formula 1 race data and provides insights into driver performance across a season.

Instead of just displaying race results, the project focuses on **understanding patterns** such as per race performance analysis and across seasons performance of constructors and drivers.

---

## API Used

This project uses the **Jolpica F1 API** (Ergast-compatible):

Base URL:

```
https://api.jolpi.ca/ergast/f1/
```

Example:

```
/2025/1/results.json
```

The API provides:

* Race results
* Driver details
* Grid positions
* Constructor information

---

## Features(to be implemented)

*  Search drivers or seasons
*  View race-by-race results
*  Performance trend analysis
*  Position gain/loss (grid → finish)

---

## How It Works

1. Fetch race data using the Fetch API
2. Extract relevant fields (position, grid, driver, etc.)
3. Process data using JavaScript
4. Generate insights using rule-based logic

---

## Core Concepts Used

* "fetch" for fetching data through API
* "async" functions and promises
* Array Higher-Order Functions
---

## How to Run

1. Clone the repository

```
git clone https://github.com/Prabhav1437/gridsense.git
```

2. Open the project folder

3. Run `index.html` in your browser

---

## Folder Structure

- `src/` - Source code
  - `api/` - API setup code