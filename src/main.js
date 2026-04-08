const contentArea = document.getElementById('content-area');
const navItems = document.querySelectorAll('.nav-item');
const globalSearch = document.getElementById('global-search');
const driverModal = document.getElementById('driver-modal');
const modalBody = document.getElementById('modal-body');
const seasonSelect = document.getElementById('season-select');

let currentView = 'dashboard';
let currentSeason = new Date().getFullYear().toString();
let allDrivers = [];

function initSeasonSelect() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year} SEASON`;
        if (year === parseInt(currentSeason)) option.selected = true;
        seasonSelect.appendChild(option);
    }
}

if (seasonSelect) {
    seasonSelect.onchange = (e) => {
        window.updateSeason(e.target.value);
    };
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        navItems.forEach(btn => btn.classList.remove('active'));
        item.classList.add('active');
        currentView = view;
        window.showView(view);
    });
});

if (globalSearch) {
    globalSearch.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        if (currentView !== 'drivers' || !allDrivers.length) return;
        const filtered = allDrivers.filter(d => {
            const name = `${d.Driver.givenName} ${d.Driver.familyName}`.toLowerCase();
            const team = d.Constructors[0].name.toLowerCase();
            return name.includes(query) || team.includes(query);
        });
        contentArea.innerHTML = window.renderDrivers(filtered, currentSeason);
    };
}

window.showView = async function (view) {
    contentArea.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full gap-8 text-white/40">
            <div class="w-16 h-16 border-4 border-white/5 border-t-red-500 rounded-full animate-spin"></div>
            <p class="font-black tracking-[0.3em] uppercase italic text-sm">Synchronizing Track Data...</p>
        </div>
    `;

    try {
        if (view === 'dashboard') {
            let latestRace = await window.F1_API.getLatestRaceResults(currentSeason);
            let standings = await window.F1_API.getDriverStandings(currentSeason);

            if (!latestRace && currentSeason === new Date().getFullYear().toString()) {
                console.warn(`${currentSeason} has no race data yet. Falling back to previous season.`);
                const previousSeason = (parseInt(currentSeason) - 1).toString();
                latestRace = await window.F1_API.getLatestRaceResults(previousSeason);
                standings = await window.F1_API.getDriverStandings(previousSeason);
            }

            contentArea.innerHTML = window.renderDashboard(latestRace, standings, currentSeason);
        } else if (view === 'standings') {
            const drivers = await window.F1_API.getDriverStandings(currentSeason);
            contentArea.innerHTML = window.renderStandings(drivers, currentSeason);
        } else if (view === 'drivers') {
            allDrivers = await window.F1_API.getDriverStandings(currentSeason);
            contentArea.innerHTML = window.renderDrivers(allDrivers, currentSeason);
        } else if (view === 'schedule') {
            const races = await window.F1_API.getSeasonSchedule(currentSeason);
            contentArea.innerHTML = window.renderSchedule(races, currentSeason);
        } else if (view === 'constructors') {
            const constructors = await window.F1_API.getConstructorStandings(currentSeason);
            contentArea.innerHTML = window.renderConstructors(constructors, currentSeason);
        }
    } catch (e) {
        console.error(e);
        contentArea.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-10">
                <span class="text-8xl filter drop-shadow-[0_0_50px_rgba(225,6,0,0.3)] animate-pulse">🏁</span>
                <p class="text-white/40 font-black italic uppercase tracking-widest text-lg">PIT STOP ERROR: DATA TRANSMISSION FAILED</p>
                <div class="flex gap-4">
                    <button onclick="window.showView('${view}')" class="bg-red-500 text-white py-5 px-10 rounded-2xl font-black text-xs tracking-[0.2em] shadow-2xl shadow-red-500/40 hover:scale-105 active:scale-95 transition-all uppercase">Re-Engage Engine</button>
                    <button onclick="window.updateSeason('2025')" class="bg-white/10 text-white/60 py-5 px-10 rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-white/20 transition-all uppercase">Try 2025</button>
                </div>
            </div>
        `;
    }
};

window.openDriverModal = async function (id) {
    if (driverModal) driverModal.classList.remove('hidden');
    if (modalBody) modalBody.innerHTML = '<div class="flex flex-col items-center justify-center py-24 gap-8"><div class="w-12 h-12 border-4 border-white/5 border-t-red-500 rounded-full animate-spin"></div><p class="text-white/40 font-black text-[10px] tracking-[0.3em] italic uppercase">Syncing Pilot Telemetry...</p></div>';

    const bio = await window.F1_API.getDriverBio(id);
    const results = await window.F1_API.getDriverResults(id, currentSeason);
    if (modalBody) modalBody.innerHTML = window.renderDriverModalContent(bio, results, currentSeason);
};

window.updateSeason = function (year) {
    currentSeason = year.toString();
    if (seasonSelect) seasonSelect.value = year;
    window.showView(currentView);
};

window.navItems = navItems;

const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (driverModal) driverModal.classList.add('hidden');
    });
}

if (driverModal) {
    driverModal.addEventListener('click', (e) => {
        if (e.target === driverModal) driverModal.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSeasonSelect();
    window.showView('dashboard');
});
