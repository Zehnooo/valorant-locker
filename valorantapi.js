async function fetchData(apiLink) {
    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        data.data.forEach(agent => buildCard(agent));
        console.log(JSON.stringify(data, null, 1));
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

function buildCard(agent){
    const main = document.querySelector('main');

    const card = document.createElement('div');
    card.classList.add('agent-card');

    const heading = document.createElement('div');
    heading.classList.add('card-heading');
    const imgHolder = document.createElement('figure');
    const agentImg = document.createElement('img');
    agentImg.src = `${agent.displayIcon}`;

    const agentName = document.createElement('h2');
    agentName.textContent = `${agent.displayName}`;

    const agentAbilities = agent.abilities;

    const abilityHolder = document.createElement('div');
    abilityHolder.classList.add('agent-abilities')
    agentAbilities.forEach(ability => abilityHolder.append(buildAgentAbilities(ability)));

    imgHolder.append(agentImg);
    heading.append(imgHolder, agentName);
    card.append(heading, abilityHolder);
    main.append(card);
}

function buildAgentAbilities(ability){
    const div = document.createElement('div');
    div.classList.add('ability-slot');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `${ability.displayIcon}`;
    img.alt = `${ability.displayName} icon`
    figure.append(img);

    const h3 = document.createElement('h3');
    h3.textContent = ability.displayName;
    const p = document.createElement('p');
    p.textContent = ability.description;

    div.append(h3, p, figure);
    return div;
}



fetchData('https://valorant-api.com/v1/agents');