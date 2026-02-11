
export function filterAgents(agents){
    const initiators = agents.filter(agent => agent.role.displayName === 'Initiator');
    const sentinels = agents.filter(agent => agent.role.displayName === 'Sentinel');
    const duelists = agents.filter(agent => agent.role.displayName === 'Duelist');
    const controllers = agents.filter(agent => agent.role.displayName === 'Controller');
    return {duelists, initiators, controllers, sentinels};
}

export function getRandomAgent(agents){
    return agents[Math.floor(Math.random() * agents.length)];
}

export function target(index, width, count){
    console.log(index, width, count);
    const totalWidth = (width * count);
    const distanceToWinner = (index * width);
    const spinDistance = 2 * totalWidth;
    const center = (window.innerWidth / 2) - (width / 2);
    return -(spinDistance + distanceToWinner - center);
}

export function calculateOffset(track, index, count){
    const item = track.querySelector('figure');
    const itemWidth = item.getBoundingClientRect().width;
    const itemStyles = getComputedStyle(track);
    const gap = parseFloat(itemStyles.columnGap || itemStyles.gap || 0);
    const step = itemWidth + gap;
    return target(index, step, count);
}

export function disableAgent(agent){
    agent.isDisabled === true ? agent.isDisabled = false : agent.isDisabled = true;
    return agent.isDisabled;
}

export function getAvailableAgents(agents){
    return agents.filter(agent => {
        return !agent.isDisabled
    });
}

export function sortAbilities(abilites){
    const abilityOrder = ['Grenade', 'Ability1','Ability2','Ultimate','Passive'];

    const orderMap = abilityOrder.reduce((acc, slot, index) => {
        acc[slot] = index;
        return acc;
    }, {});

        return abilites.sort((a, b) => {
            return orderMap[a.slot] - orderMap[b.slot];
        });

}