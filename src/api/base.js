const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

window.fetchData = async function(endpoint) {
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
