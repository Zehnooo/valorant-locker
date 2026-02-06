async function fetchData(apiLink) {
    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function cleanAgentData(){
    const agentData = await fetchData('https://valorant-api.com/v1/agents');

    const agents = [];
    agentData.data.forEach(agent => {
        const { displayName, description, displayIcon, fullPortrait, isPlayableCharacter, role, abilities,  } = agent;
        const cleanAgent = { name: displayName, descrip: description, icon: displayIcon, portrait: fullPortrait, playable: isPlayableCharacter, role, abilities, };
        agents.push(cleanAgent);
    });
    return agents;
}
