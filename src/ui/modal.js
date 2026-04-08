window.renderDriverModalContent = function (bio, results, currentSeason) {
    return `
        <div class="fade-in">
            <div class="mb-10 text-white">
                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Driver Profile</div>
                <h2 class="text-6xl font-outfit font-black tracking-tighter uppercase mb-4">${bio.givenName} ${bio.familyName}</h2>
                <div class="flex flex-wrap gap-4">
                    <span class="bg-white/5 px-6 py-2 rounded-full text-xs font-bold text-white/60">Representing ${bio.nationality}</span>
                    <span class="bg-white/5 px-6 py-2 rounded-full text-xs font-bold text-white/60">Born ${bio.dateOfBirth}</span>
                </div>
            </div>
            
            <div class="bg-white/5 rounded-[28px] p-8 backdrop-blur-xl border border-white/10">
                <h3 class="font-black font-outfit text-xl mb-6 text-white uppercase italic">Seasonal Performance History (${currentSeason})</h3>
                <div class="flex flex-col gap-2">
                    ${results.length ? results.map(r => `
                        <div class="flex items-center justify-between p-5 bg-white/5 rounded-2xl shadow-sm hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group">
                            <div>
                                <span class="block text-white font-bold">${r.raceName}</span>
                                <span class="text-[10px] text-white/40 font-bold uppercase tracking-widest">${r.Circuit.circuitName}</span>
                            </div>
                            <div class="flex items-center gap-6">
                                <div class="text-right">
                                    <span class="block text-xs font-black text-white/20 uppercase tracking-widest">Finish</span>
                                    <span class="font-black text-red-500 text-xl">P${r.Results[0].position}</span>
                                </div>
                                <div class="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white group-hover:bg-red-500 transition-colors">
                                    +${r.Results[0].points} PTS
                                </div>
                            </div>
                        </div>
                    `).join('') : `<p class="text-white/40 italic text-center py-6">No race history found for this driver in ${currentSeason}.</p>`}
                </div>
            </div>
        </div>
    `;
};
