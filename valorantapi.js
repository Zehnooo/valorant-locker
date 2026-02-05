async function fetchData(apiLink) {
    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log(JSON.stringify(data, null, 1));
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

fetchData('https://valorant-api.com/v1/agents');