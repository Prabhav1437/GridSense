window.renderSchedule = function (races, currentSeason) {
    return `
        <div class="fade-in max-w-4xl mx-auto">
            <header class="mb-12 text-center">
                <h2 class="text-5xl font-outfit font-black mb-2 uppercase tracking-tighter italic text-white">${currentSeason} Calendar</h2>
                <p class="text-white/60 font-bold uppercase text-[10px] tracking-widest underline decoration-red-500/20 underline-offset-8">Grand Prix Engagement Cycle</p>
                <p class="text-white/60 font-bold uppercase text-[10px] tracking-widest underline decoration-red-500/20 underline-offset-8">Click on the race to open in Wikipedia</p>
            </header>
            <div class="flex flex-col gap-4">
                ${races.map(r => `
                    <button class="cursor-pointer glass-card flex items-center justify-between border-l-8 border-l-red-500 p-10 group bg-white/5" onclick="wikiCircuit('${r.Circuit.circuitName}')">
                        <div class="transition-transform group-hover:translate-x-2">
                            <div class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Round ${r.round}</div>
                            <h3 class="text-2xl font-black font-outfit text-white group-hover:text-red-500 transition-colors italic uppercase tracking-tighter">${r.raceName}</h3>
                            <p class="text-white/40 font-bold uppercase text-[10.5px] tracking-widest">${r.Circuit.circuitName}</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-2xl font-black font-outfit text-white uppercase">${r.date}</span>
                            <span class="text-red-500 font-bold text-xs uppercase tracking-widest">${r.time ? r.time.replace('Z', '') : ''}</span>
                        </div>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
};

window.wikiCircuit = circuit =>{
    const fullcircuit = circuit.replace(/\s+/g, '_')
    window.open(`https://en.wikipedia.org/wiki/${fullcircuit}`, '_blank')
}

window.wikiConstructor = constructor =>{
    const fullconstructor = constructor.replace(/\s+/g, '_')+'_in_Formula_One'
    window.open(`https://en.wikipedia.org/wiki/${fullconstructor}`, '_blank')
}

window.renderConstructors = function (constructors, currentSeason) {
    return `
        <div class="fade-in max-w-6xl mx-auto">
            <header class="mb-12">
                <h2 class="text-5xl font-outfit font-black uppercase tracking-tighter italic italic text-white">Engine Masters</h2>
                <p class="text-white/60 font-bold uppercase text-[10px] tracking-widest underline decoration-red-500/20 underline-offset-8 cursor-default">Registered Performance Entities</p>
                <p class="text-white/60 font-bold uppercase text-[10px] tracking-widest underline decoration-red-500/20 underline-offset-8 cursor-default">Click on the constructor to open in Wikipedia</p>
                </header>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${constructors.map(c => `
                    <button class="glass-card group overflow-hidden bg-white/5 cursor-pointer" onclick="wikiConstructor('${c.Constructor.name}')">
                        <div class="flex items-center justify-between mb-8">
                            <div class="pos-badge bg-white/10 text-white border-none">${c.position}</div>
                            <span class="font-black text-red-500 text-2xl font-outfit tracking-tighter italic uppercase">${c.points} <small class="text-[10px] text-white/40">PTS</small></span>
                        </div>
                        <h3 class="font-black font-outfit text-3xl text-white mb-1 group-hover:text-red-500 transition-colors italic uppercase tracking-tighter">${c.Constructor.name}</h3>
                        <p class="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-6">${c.Constructor.nationality}</p>
                        <div class="flex gap-4">
                            <span class="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white/60 uppercase">${c.wins} WINS</span>
                        </div>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
};
