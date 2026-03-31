window.F1_API = {
    async getLatestRaceResults(season) {
        const data = await window.fetchData(`/${season}/last/results`);
        return data.RaceTable.Races[0];
    },

    async getDriverStandings(season) {
        const data = await window.fetchData(`/${season}/driverstandings`);
        return data.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    },

    async getConstructorStandings(season) {
        const data = await window.fetchData(`/${season}/constructorstandings`);
        return data.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
    },

    async getSeasonSchedule(season) {
        const data = await window.fetchData(`/${season}`);
        return data.RaceTable.Races;
    },

    async getDriverBio(id) {
        const data = await window.fetchData(`/drivers/${id}`);
        return data.DriverTable.Drivers[0];
    },

    async getDriverResults(id, season) {
        const data = await window.fetchData(`/${season}/drivers/${id}/results`);
        return data.RaceTable.Races;
    }
};
