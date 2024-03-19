async function fetchSummonerData(summonerName, region) {
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual Riot Games API key
    const encodedSummonerName = encodeURIComponent(summonerName);
    const apiUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodedSummonerName}?api_key=${apiKey}`;

    try {
        // Sending a GET request
        const response = await fetch(apiUrl);

        // Check if the request was successful (status code 200)
        if (response.ok) {
            // Extracting data from the response
            const data = await response.json();
            displaySummonerData(data);
        } else {
            // Log an error message if the request was not successful
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        // Log an error message if an exception occurred during the request
        console.error('Error:', error);
        return null;
    }
}

function displaySummonerData(summonerData) {
    if (summonerData !== null) {
        const summonerDataContainer = document.getElementById('summonerDataContainer');
        summonerDataContainer.innerHTML = `
            <p>Summoner Name: ${summonerData.name}</p>
            <p>Summoner Level: ${summonerData.summonerLevel}</p>
            <p>Summoner ID: ${summonerData.id}</p>
            <p>Account ID: ${summonerData.accountId}</p>
            <p>Profile Icon ID: ${summonerData.profileIconId}</p>
        `;
    } else {
        console.log('Failed to fetch summoner data.');
    }
}

// Call the function to fetch summoner data when the page loads
const summonerName = 'exampleSummoner'; // Replace with the summoner name you want to fetch
const region = 'na1'; // Replace with the region you want to query
fetchSummonerData(summonerName, region);
