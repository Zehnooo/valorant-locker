

export function filterAgents(agents){
    const initiators = agents.filter(agent => agent.role.displayName === 'Initiator');
    const sentinels = agents.filter(agent => agent.role.displayName === 'Sentinel');
    const duelists = agents.filter(agent => agent.role.displayName === 'Duelist');
    const controllers = agents.filter(agent => agent.role.displayName === 'Controller');
    console.log('filtered',{initiators, sentinels, duelists, controllers});
    return {initiators, sentinels, duelists, controllers};
}