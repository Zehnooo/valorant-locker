import { sortAbilities } from './tools.js'

async function fetchData(apiLink) {
    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function getAgents(){
    const agentData = await fetchData('https://valorant-api.com/v1/agents');

    const agents = [];
    agentData.data.forEach(agent => {
        const { displayName, description, displayIcon, fullPortrait, isPlayableCharacter, role, abilities,  } = agent;
        let cleanAgent = { name: displayName.replace('/', ''), descrip: description, icon: displayIcon, portrait: fullPortrait, playable: isPlayableCharacter, role, abilities, isDisabled: false };

        cleanAgent.abilities = sortAbilities(cleanAgent.abilities);
        agents.push(cleanAgent);
    });
    return agents;
}

export async function getWeapons(){
    let allWeapons = [];
    await fetchData('https://valorant-api.com/v1/weapons').then(weapons => {
        weapons.data.forEach( weapon => {
            if (weapon.displayName === 'Random Favorite Skin') {return}
            allWeapons.push({icon: weapon.displayIcon, name: weapon.displayName, skins: []});
        });
    });
    return await getSkins(allWeapons);
}

async function getSkins(weapons){
    return await fetchData('https://valorant-api.com/v1/weapons/skins').then(data => {
        data.data.forEach(skin => {

            const { uuid, displayName, displayIcon, chromas, levels } = skin;
            const cleanSkin = { id: uuid, name: displayName, icon: displayIcon, variants: chromas, levels, isFavorited: false, isOwned: false, isWanted: false };

            const s = cleanSkin.name;
            if (s !== 'Random Favorite Skin') {
                let weapon = weapons.find(w => s.includes(w.name));
                if (!weapon) {
                    weapon = weapons.find(w => w.name === 'Melee');
                }
                weapon.skins.push(cleanSkin);
            }
        });
        return weapons;
    });

}