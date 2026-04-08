window.renderStandings = function (drivers, currentSeason) {
    const topPoints = drivers[0] ? parseInt(drivers[0].points) : 1;
    let rows = '';

    for (let d of drivers) {
        const percent = (parseInt(d.points) / topPoints) * 100;
        rows += `
            <tr class="group hover:bg-white/5 transition-all border-b border-white/5 last:border-none">
                <td class="p-6 w-20 text-center"><div class="pos-badge bg-white/10 text-white border-none group-hover:bg-red-500 transition-all mx-auto">${d.position}</div></td>
                <td class="p-6 font-bold text-white uppercase italic font-outfit text-sm">${d.Driver.givenName} ${d.Driver.familyName}</td>
                <td class="p-6 grow">
                    <div class="flex items-center gap-6 w-full max-w-sm">
                        <div class="h-1.5 bg-white/10 flex-1 rounded-full overflow-hidden">
                            <div class="h-full bg-red-500 transition-all duration-1000 shadow-[0_0_10px_rgba(225,6,0,0.5)]" style="width:${percent}%"></div>
                        </div>
                        <span class="font-black text-red-500 min-w-[3rem] text-right font-outfit">${d.points}</span>
                    </div>
                </td>
                <td class="p-6 text-right font-bold text-white/40 text-xs tracking-tighter italic uppercase underline decoration-red-500/20">${d.wins} VICTORY/IES</td>
            </tr>
        `;
    }

    return `
        <div class="fade-in max-w-5xl mx-auto">
            <header class="mb-12">
                <h2 class="text-5xl font-outfit font-black mb-2 uppercase tracking-tighter italic text-white">World Championship</h2>
                <p class="text-white/60 font-bold uppercase text-xs tracking-[0.2em] underline decoration-red-500/20">${currentSeason} Performance Rankings</p>
            </header>
            <div class="glass-card !p-0">
                <div class="overflow-hidden rounded-[40px]">
                    <table class="w-full text-left">
                        <thead class="bg-white/5 text-[10px] font-black uppercase text-white/40 tracking-[0.2em] border-b border-white/5">
                            <tr><th class="p-6">Pos</th><th class="p-6">Driver</th><th class="p-6">Standings Bar</th><th class="p-6 text-right">Wins</th></tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
};
