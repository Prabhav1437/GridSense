window.renderDashboard = function (latestRace, standings, currentSeason) {
    const eras = [
        { label: '2020s', year: 2024 },
        { label: '2010s', year: 2015 },
        { label: '2000s', year: 2005 },
        { label: '90s', year: 1995 },
        { label: '70s', year: 1975 },
        { label: 'Era 1', year: 1955 }
    ];

    const eraButtons = eras.map(e => `
        <button onclick="window.updateSeason(${e.year})" 
            class="px-8 py-4 rounded-2xl font-black font-outfit text-sm transition-all border-2 
            ${Math.floor(parseInt(currentSeason) / 10) === Math.floor(e.year / 10)
            ? 'bg-red-500 border-red-500 text-white shadow-2xl shadow-red-500/40 translate-y-[-2px]'
            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white hover:bg-white/10'}">
            ${e.label}
        </button>
    `).join('');

    return `
        <div class="fade-in max-w-7xl mx-auto">
            <header class="mb-12">
                <h2 class="text-5xl font-outfit text-white font-black tracking-tight mb-2 uppercase italic">Race Dashboard</h2>
                <p class="text-white/60 font-semibold text-lg uppercase tracking-wider">Latest: ${latestRace ? latestRace.raceName : 'Season Data Loading...'}</p>
            </header>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">
                <div class="glass-card">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-outfit text-2xl font-black text-white italic">PODIUM</h3>
                    </div>
                    <div class="flex flex-col gap-5">
                        ${latestRace ? latestRace.Results.slice(0, 3).map((res, i) => `
                            <div class="flex items-center gap-6 p-6 bg-white/5 rounded-2xl transition-all hover:bg-white/10 group">
                                <span class="text-3xl font-black font-outfit w-12 text-center text-red-500">P${i + 1}</span>
                                <div>
                                    <strong class="text-xl font-bold tracking-tight text-white">${res.Driver.givenName} ${res.Driver.familyName}</strong>
                                    <p class="text-[10px] text-white/40 font-bold uppercase tracking-widest">${res.Constructor.name}</p>
                                </div>
                            </div>
                        `).join('') : '<p class="text-white/40 italic">Data pending...</p>'}
                    </div>
                </div>

                <div class="glass-card">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-outfit text-2xl font-black text-white italic">STANDINGS</h3>
                    </div>
                    <div class="flex flex-col gap-3 border-2 border-white/10 rounded-2xl p-2">
                        ${standings.length ? standings.slice(0, 5).map(res => `
                            <div class="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/20 transition-all bg-white/5">
                                <div class="pos-badge bg-white/10 text-white border-none group-hover:bg-red-500 group-hover:text-white transition-all">${res.position}</div>
                                <div class="grow">
                                    <strong class="block text-white font-bold">${res.Driver.familyName}</strong>
                                    <span class="text-[9px] font-bold text-white/40 uppercase tracking-widest">${res.Constructors[0]?.name}</span>
                                </div>
                                <div class="text-right">
                                    <span class="text-red-500 font-black text-lg">${res.points}</span>
                                    <span class="text-[8px] text-white/40 font-bold tracking-tighter">PTS</span>
                                </div>
                            </div>
                        `).join('') : '<p class="text-white/40 p-4">Standings pending.</p>'}
                    </div>
                </div>
            </div>

            <div class="glass-card mb-12">
                <div class="mb-10"><h3 class="font-outfit text-2xl font-black text-white italic uppercase underline decoration-red-500 decoration-4 transition-all">Historical Explorer</h3></div>
                <div class="flex flex-wrap gap-3">${eraButtons}</div>
            </div>
        </div>
    `;
};
