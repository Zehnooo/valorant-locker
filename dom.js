import { cleanAgentData } from './valorantapi.js';

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
    const heading = document.createElement('h1');
    heading.textContent =  'Hello, and Welcome to ';
    const span = document.createElement('span');
    span.textContent = 'Valorant Locker';
    span.classList.add('italic');
    heading.appendChild(span);
    heading.classList.add('head');
    const description = document.createElement('p');
    description.textContent = 'This was created by Zehno as a passion project.\n I hope you enjoy! Oh, and just in case you use this for your next ranked matches...';
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = ' COMPUTER. GIVE THIS PLAYER UNLIMITED RR GAIN. YOU HAVE BEEN PROGRAMMED, GOOD LUCK.';
    descriptionSpan.classList.add('code');
    description.classList.add('text');
    description.appendChild(descriptionSpan);

    container.append(bannerContainer, heading, description);
    main.append(container);
}

function createFooter(){
    const footer = document.createElement('footer');
    const container = document.createElement('div');

    const disclaimer = document.createElement('h3');
    disclaimer.classList.add('head', 'italic');
    disclaimer.textContent = 'This site is fan-made and not affiliated with Riot Games or Valorant in any way.';

    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/Zehnooo/valorant-api-testing';
    githubLink.target = '_blank';
    //githubLink.textContent = 'View my Github!';
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
    elements.length === 1 ? classes.forEach(cl => { elements.classList[type](cl)}) :
        elements.forEach(element => { classes.forEach(cl => { element.classList[type](cl); });
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
    const filterContainer = document.createElement('div');
    const filters = document.createElement('div');
    filters.id = 'filters';
}

async function getAgents(){
    return await cleanAgentData();
}