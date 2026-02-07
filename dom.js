import { cleanAgentData } from './valorantapi.js';
import {calculateOffset, filterAgents, getRandomAgent, target} from './tools.js';

(() => {
    window.onload = () => {
        const main = document.querySelector('main');
        createDefaultPage(main);
        createFooter(main);
        updateNavLinks();
        document.body.classList.add('loaded');
    }
})();

function createDefaultPage(main){
    console.log('Hello World');
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
    main.append(container);
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
    document.body.appendChild(footer);
}

function updateNavLinks(){
    const navLinks = getElements('.nav-link', 'all');
    let activePage = 'home';

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            updateClasses(navLinks, ['active'], 'remove');
            link.classList.add('active');
            updateMain(link.textContent, activePage);
            activePage = link.textContent.toLowerCase();
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
    const main = getElements('main', 'single');
    main.textContent = '';
}

function updateMain(page, activePage){

    const main = getElements('main', 'single');
    page = String(page).toLowerCase().replace(' ', '');
    if (page === activePage){
        console.log(`Page: ${page.toUpperCase()} is already active. Not switching page.`)
        return;
    }
        clearMain();
        switch(page){
            case 'home':
                createDefaultPage(main);
                break;
            case 'agentselect':
                buildAgentSelect(main);
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
    getAgents().then(data => {
        const agentSelect = document.createElement('div');
        agentSelect.id = 'agent-select';
        const wheel = buildAgentWheel(data);
        const filters = buildFilters(data);
        agentSelect.append(wheel, filters);
        main.append(agentSelect)
    });
}

async function getAgents(){
    return await cleanAgentData();
}

function buildFilters(data){
    const agents = filterAgents(data);
    const filterContainer = document.createElement('div');
    Object.keys(agents).forEach(role => {
        const roleAgents = agents[role];

        const roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        roleContainer.id = role.toLowerCase();

        const heading = document.createElement('h2');
        heading.textContent = role.toUpperCase();
        heading.classList.add('head2');

        const agentContainer = document.createElement('div');
        roleAgents.forEach(agent => {
            agentContainer.append(buildAgentCard(agent, 'small'));
        });

        roleContainer.append(heading);
        roleContainer.append(agentContainer);
        filterContainer.append(roleContainer);
    });
    filterContainer.id = 'filters';
    return filterContainer;
}

function buildAgentCard(agent, size){
    const card = document.createElement('div');
    card.classList.add(`card-${size}`);

    const imgContainer = document.createElement('figure');
    const img = document.createElement('img');
    img.src = agent.icon;
    imgContainer.append(img);

    card.append(imgContainer);
    return card;
}

function buildAgentWheel(agents){

    const container = document.createElement('div');
    container.id = 'wheel';
    const track = document.createElement('div');
    track.classList.add('track');
    const innerTrack = document.createElement('div');
    innerTrack.classList.add('inner-track');


    for (let i = 0; i < agents.length; i++){
        let imgContainer = document.createElement('figure');
        let agentImg = document.createElement('img');
            agentImg.src = agents[i].icon;
            agentImg.alt = `${agents[i].name}'s picture`;
            agentImg.id = agents[i].name.toLowerCase().replace('/','');

        imgContainer.append(agentImg);
        innerTrack.append(imgContainer);
    }

    const spinBtn = document.createElement('button');
    spinBtn.textContent = 'Spin';
    spinBtn.type = 'button';
    spinBtn.id = 'spin';
    updateClasses([spinBtn], ['action', 'btn'], 'add');
    spinBtn.addEventListener('click', () => spinWheel(agents));

    const trackItems = Array.from(innerTrack.children);
    for (let i = 0; i < 2; i++){
        trackItems.forEach(item => innerTrack.append(item.cloneNode(true)));
    }

    track.append(innerTrack );
    container.append(track, spinBtn);
    return container;
}


function spinWheel(agents){
    const innerTrack = document.querySelector('.inner-track');
    const winningAgent = getRandomAgent(agents);
    console.log(winningAgent);
    const count = agents.length;
    const index = agents.findIndex(agent => agent.name === winningAgent.name);
    const offset = calculateOffset(innerTrack, index, count);
    document.documentElement.style.setProperty('--spinpx', `${offset}px`);
    innerTrack.classList.add('spin');
}
