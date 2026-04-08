window.renderDrivers = function (drivers, currentSeason) {
    return `
        <div class="fade-in max-w-7xl mx-auto">
            <header class="mb-14">
                <h2 class="text-5xl font-outfit font-black uppercase italic tracking-tighter text-white">Grid (${currentSeason})</h2>
                <p class="text-white/60 font-bold uppercase text-[10px] tracking-widest underline decoration-red-500/20 underline-offset-8 cursor-default">Registered Performance Entities</p>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${drivers.length ? drivers.map(d => `
                    <div class="glass-card relative overflow-hidden group cursor-pointer" onclick="window.openDriverModal('${d.Driver.driverId}')">
                        <div class="absolute top-4 right-10 text-[7rem] font-black font-outfit text-red-500 opacity-30 group-hover:opacity-50 group-hover:-translate-y-2 transition-all duration-500 select-none">
                            #${d.Driver.permanentNumber || ''}
                        </div>
                        <div class="relative z-10">
                            <div class="w-16 h-1 bg-red-500 mb-6 group-hover:w-full transition-all duration-500"></div>
                            <h3 class="font-black font-outfit text-3xl text-white group-hover:text-red-500 transition-colors italic">${d.Driver.familyName.toUpperCase()}</h3>
                            <p class="text-white/40 font-bold uppercase text-[11px] tracking-[0.2em] mb-10">${d.Constructors[0].name}</p>
                            <div class="flex gap-3">
                                <span class="bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider italic">RANK P${d.position}</span>
                                <span class="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider font-outfit">${d.points} POINTS</span>
                            </div>
                        </div>
                    </div>
                `).join('') : `
                    <div class="col-span-full py-20 bg-white/5 border-2 border-dashed border-white/10 rounded-[32px] text-center">
                        <p class="text-white/40 font-bold italic uppercase tracking-tighter">NO RACERS DETECTED IN THIS GRID SCOPE.</p>
                    </div>
                `}
            </div>
        </div>
    `;
};
