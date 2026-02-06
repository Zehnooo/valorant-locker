(() => {
    window.onload = () => {
        const main = document.querySelector('main');
        createDefaultPage(main);
        createFooter(main);
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
    bannerContainer.append(banner);

    const container = document.createElement('div');
    container.id = 'default';
    const heading = document.createElement('h1');
    heading.textContent =  'Hello, and Welcome to ';
    const span = document.createElement('span');
    span.textContent = 'Valorant Locker';
    span.classList.add('italic');
    heading.appendChild(span);
    heading.classList.add('head');
    const description = document.createElement('p');
    description.textContent = 'This was created by Zehno as a passion project.\n I hope you enjoy, and if you use this for ranked...';
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = ' COMPUTER. GIVE THIS PLAYER UNLIMITED RR GAIN. YOU HAVE BEEN PROGRAMMED.';
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

    const imgContainer = document.createElement('figure');
    imgContainer.id = 'github-fig';

    const githubImg = document.createElement('img');
    githubImg.src = './assets/images/github.svg';
    githubImg.classList.add('action');

    imgContainer.append(githubImg);
    githubLink.appendChild(imgContainer);
    container.append(disclaimer, githubLink);
    footer.append(container);
    document.body.appendChild(footer);
}

/*
const options = document.createElement('div');
    const paypalContainer = document.createElement('div');
    paypalContainer.id = 'paypal-container-RFMSYLX9NT296';
    const paypalScript = document.createElement('script');
    paypalScript.textContent = 'paypal.HostedButtons({\n    hostedButtonId: "RFMSYLX9NT296",\n  }).render("#paypal-container-RFMSYLX9NT296")'
    paypalContainer.append(paypalScript);


    const gitContainer = document.createElement('div');

    const githubImg = document.createElement('img');
    githubImg.src = './assets/images/github.svg';
    gitContainer.append(githubImg, githubLink)

    options.append(paypalContainer, gitContainer);
 */