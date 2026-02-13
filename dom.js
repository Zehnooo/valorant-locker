import { getAgents, getWeapons } from './valorantapi.js';
import { calculateOffset, filterAgents, getRandomAgent, disableAgent, getAvailableAgents } from './tools.js';

(() => {
    window.onload = () => {
        const main = document.querySelector('main');
        main.append(createDefaultPage());
        document.body.append(createFooter());
        updateNavLinks();
        document.body.classList.add('loaded');

    }
})();

function createDefaultPage(){
    const bannerContainer = document.createElement('div');
    bannerContainer.id = 'banner'
    const banner = document.createElement('video');
    banner.src = './assets/images/home-banner.mp4';
    banner.autoplay = true;
    banner.muted = true;
    banner.loop = true;
    banner.playsInline = true;
    banner.setAttribute("playsinline", "");
    banner.setAttribute("webkit-playsinline", "");
    bannerContainer.append(banner);

    const container = document.createElement('div');
    container.id = 'home';

    const greeting = document.createElement('div');
    const heading = document.createElement('h1');
    heading.textContent =  'Hello, and Welcome to ';
    const span = document.createElement('span');
    span.textContent = 'Valorant Locker';
    span.classList.add('italic');
    heading.appendChild(span);
    heading.classList.add('head2');
    const description = document.createElement('p');
    description.textContent = 'This was created by Zehno as a passion project.\n I hope you enjoy! Oh, and just in case you use this for your next ranked matches...';
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = ' COMPUTER. GIVE THIS PLAYER UNLIMITED RR GAIN. YOU HAVE BEEN PROGRAMMED, GOOD LUCK.';
    descriptionSpan.classList.add('code');
    description.classList.add('text');
    description.appendChild(descriptionSpan);
    greeting.append(heading, description);
    container.append(greeting, bannerContainer);
    return container;
}

function createFooter(){
    const footer = document.createElement('footer');
    const container = document.createElement('div');

    const disclaimer = document.createElement('h3');
    updateClasses([disclaimer], ['text', 'italic'], 'add');
    disclaimer.textContent = 'This site is fan-made and not affiliated with Riot Games or Valorant in any way.';

    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/Zehnooo/valorant-api-testing';
    githubLink.target = '_blank';
    githubLink.classList.add('text');
    githubLink.classList.add('action');

    const imgContainer = document.createElement('figure');
    imgContainer.id = 'github-fig';

    const githubImg = document.createElement('img');
    githubImg.src = './assets/images/github.svg';


    imgContainer.append(githubImg);
    githubLink.appendChild(imgContainer);
    container.append(disclaimer, githubLink);
    footer.append(container);
    return footer;
}

function updateNavLinks(){
    const navLinks = getElements('.nav-link', 'all');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            updateClasses(navLinks, ['active'], 'remove');
            updateMain(link.textContent);
            link.classList.add('active');
        });
    });
}

function updateClasses(elements = [], classes, type){
        if (elements.length === 0) return console.warn(
            'No elements provided for function updateClasses.'
        );
        elements.forEach(el => { classes.forEach(cl => { el.classList[type](cl); });
    });
}

function getElements(selector, selectType){
    switch(selectType){
        case 'all':
            return document.querySelectorAll(selector);
        case 'single':
            return document.querySelector(selector);
    }
}

function clearMain(){
    const main = document.querySelector('main');
    main.innerHTML = "";
    return main;
}

function updateMain(page, agent = null){
    page = String(page).replace(" ", "").toLowerCase();
    const main = clearMain();

        switch(page){
            case 'home':
                const homePage = createDefaultPage(main);
                main.append(homePage);
                break;
            case 'agentselect':
                buildAgentSelect(main);
                break;
            case 'showagent':
                const agentPage = showAgentInfo(agent);
                main.append(agentPage);
                break;
            case 'skins':

                main.append(buildSkinPage());
                break;
            default:
                showPageError(main);
                break;
        }

}

function showPageError(main) {
    main.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <h1 class="head">404</h1>
            <p class="text">Well… this is awkward.</p>
            <p class="text">Unable to load the requested page. Please contact the site administrator if the issue persists.</p>
        </div>
    `;
}

function buildAgentSelect(main){
    getAgentData().then(data => {
        const agentSelect = document.createElement('div');
        agentSelect.id = 'agent-select';
        const wheel = buildAgentWheel(data);
        const btn = buildSpinButton(data);
        const filters = buildFilters(data);
        agentSelect.append(wheel, btn, filters);
        main.append(agentSelect);
    });
}

async function getAgentData(){
    return await getAgents();
}

function buildFilters(data){
    const agentsByRole = filterAgents(data);
    const filterContainer = document.createElement('div');

    Object.keys(agentsByRole).forEach(role => {
        const roleAgents = agentsByRole[role];

        const roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        roleContainer.id = role.toLowerCase();

        const heading = document.createElement('h2');
        heading.textContent = role.toUpperCase();
        heading.classList.add('head2', 'action');

        heading.addEventListener('click', () => {
            disableAgentGroup(roleAgents, heading.textContent.toLowerCase());

        });

        const agentContainer = document.createElement('div');
        agentContainer.id = `${role.toLowerCase()}-icons`
        roleAgents.forEach(agent => {
            agentContainer.append(buildAgentCard(agent, 'small', true));
        });

        roleContainer.append(heading);
        roleContainer.append(agentContainer);
        filterContainer.append(roleContainer);
    });
    filterContainer.id = 'filters';
    return filterContainer;
}

function buildAgentCard(agent, size, clickable = false){
    const imgContainer = document.createElement('figure');
    imgContainer.id = agent.name;
    imgContainer.classList.add(`card-${size}`);
    const img = document.createElement('img');
    img.src = agent.icon;
    imgContainer.append(img);

    if (clickable) {
        imgContainer.classList.add('action');
        imgContainer.addEventListener('click', (e) => {
            e.preventDefault();
            imgContainer.classList.toggle('disable-agent');
            disableAgent(agent);
        });
    }
    return imgContainer;
}

function buildAgentWheel(agents){
    const availableAgents = getAvailableAgents(agents);

    let track = document.querySelector('.inner-track');
    track !== null ? track.innerHTML = '' : track = document.createElement('div');


    const container = document.createElement('div');
    container.id = 'wheel';

    track.classList.add('track');
    const innerTrack = document.createElement('div');
    innerTrack.classList.add('inner-track');

    for (let i = 0; i < availableAgents.length; i++){
        innerTrack.append(buildAgentCard(availableAgents[i], 'large'));
    }

    const trackItems = Array.from(innerTrack.children);
    for (let i = 0; i < 2; i++){
        trackItems.forEach(item => innerTrack.append(item.cloneNode(true)));
    }

    track.append(innerTrack);
    container.append(track);
    return container;
}

function buildSpinButton(agents){
    const container = document.createElement('div');
    container.id = 'buttons'
    const spinBtn = document.createElement('button');
    spinBtn.textContent = 'Spin';
    spinBtn.type = 'button';
    spinBtn.id = 'spin';
    spinBtn.classList.add('action', 'btn', 'hover');
    spinBtn.addEventListener('click', () => spinWheel(agents));
    container.append(spinBtn);
    return container;
}

function spinWheel(agents){
    const availableAgents = getAvailableAgents(agents);

    const btn = document.querySelector('#spin');
    btn.disabled = true;
    btn.textContent = 'Spinning...';
    btn.classList.add('disable-cursor', 'disable-button');

    const innerTrack = document.querySelector('.inner-track');

    const winningAgent = getRandomAgent(availableAgents);

    const index = agents.findIndex(agent => agent.name === winningAgent.name);
    const offset = calculateOffset(innerTrack, index, agents.length);
    document.documentElement.style.setProperty('--spinpx', `${offset}px`);

    innerTrack.classList.remove('spin');
    void innerTrack.offsetWidth;

    innerTrack.classList.add('spin');
    innerTrack.addEventListener('animationend', () => {
        innerTrack.classList.remove('spin');
        btn.disabled = false;
        btn.classList.remove('disable-cursor', 'disable-button');
        updateMain('showagent', winningAgent);
        });
}

function showAgentInfo(agent){
    const container = document.createElement('div');
    container.id = 'agent-page';
    const header = buildAgentHeader(agent);
    const abilities = buildAgentAbilities(agent);

    container.append(header, abilities);
    return container;
}

function buildAgentHeader(agent){
    const headContainer = document.createElement('div');
    headContainer.id = 'agent-head';

    const infoContainer = document.createElement('div');
    infoContainer.id = 'main-info';
    const heading = document.createElement('div');
    heading.classList.add('head2');

    const name = document.createElement('h2');
    name.textContent = agent.name;

    const roleImg = document.createElement('img');
    const roleImgContainer = document.createElement('figure');
    roleImg.src = agent.role.displayIcon;
    roleImgContainer.append(roleImg);


    const descrip = document.createElement('p');
    descrip.textContent = agent.descrip;
    descrip.classList.add('text');

    const imgContainer = document.createElement('figure');
    const portrait = document.createElement('img');
    portrait.src = agent.portrait;
    imgContainer.id = 'portrait';

    heading.append(name, roleImgContainer);
    infoContainer.append(heading, descrip);
    imgContainer.append(portrait);
    headContainer.append(imgContainer, infoContainer);

    return headContainer;
}

function buildAgentAbilities(agent){
    const abilityContainer = document.createElement('div');
    abilityContainer.id = 'abilities';
    agent.abilities.forEach(ability => {

        const abilityCard = document.createElement('div');

        const name = document.createElement('h2');
        name.textContent = ability.displayName;

        const slot = document.createElement('h2');
        slot.textContent = ability.slot;

        const description = document.createElement('p');
        description.textContent = ability.description;

        const imgContainer = document.createElement('figure');
        const icon = document.createElement('img');
        icon.src = ability.displayIcon || './assets/images/placeholder_white.svg';
        imgContainer.append(icon);

        updateClasses([name], ['head2', 'ability-name'], 'add');
        updateClasses([description], ['text', 'ability-descrip'], 'add');
        updateClasses([slot], ['head2', 'ability-slot'], 'add');
        updateClasses([imgContainer], ['ability-icon'], 'add');

        abilityCard.append(imgContainer, name, slot, description);
        abilityContainer.append(abilityCard);
    });
    return abilityContainer;
}

function disableAgentGroup(agents, group){
const container = document.querySelector(`#${group}-icons`);
const icons = container.querySelectorAll('figure');
icons.forEach(icon => {
    icon.classList.toggle('disable-agent');
});
agents.forEach(agent => {
    disableAgent(agent);
});
}

function buildSkinPage(){
    const container = document.createElement('div');
    container.id = 'Skins';
    getWeapons().then( data => {
        data.forEach(skin => {
                const skinContainer = document.createElement('div');
                skinContainer.classList.add('skin');

                const imgContainer = document.createElement('figure');


                const img = document.createElement('img');
                img.src = skin.icon;

                const name = document.createElement('h2');
                name.textContent = skin.name;
                name.classList.add('head2');

                imgContainer.append(img);
                skinContainer.append(name, imgContainer);
                container.append(skinContainer)
        });
    });
    return container;
}