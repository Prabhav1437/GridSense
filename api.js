const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}.json`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        if (!data || !data.MRData) throw new Error('Malformed API Response');
        
        return data.MRData;
    } catch (error) {
        console.error('F1 API Error:', error);
        throw error;
    }
};

async function getDriverStandings(season) {
    const data = await fetchData(`/${season}/driverStandings`);
    return data.StandingsTable.StandingsLists[0].DriverStandings;
}

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", async () => {
    const input = document.getElementById("search-input");
    const season = input.value.trim();
    if (!season) {
        console.error("Please enter a season");
        return;
    }

    const container = document.getElementById("show-table");
    container.innerHTML = "<p style='color:rgba(255,255,255,0.4);font-size:14px'>Loading…</p>";

    try {
        const data = await getDriverStandings(season);

        // Build a single table
        const table = document.createElement("table");

        // Header
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Points</th>
            </tr>`;
        table.appendChild(thead);

        // Body
        const tbody = document.createElement("tbody");
        data.forEach(x => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${x.position}</td>
                <td>${x.Driver.givenName} ${x.Driver.familyName}</td>
                <td>${x.Constructors[0].name}</td>
                <td>${x.points}</td>`;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        container.innerHTML = "";
        container.appendChild(table);
    } catch (err) {
        container.innerHTML = "<p style='color:#e10600;font-size:14px'>Failed to load standings. Check the year and try again.</p>";
    }
});