(() => {
    window.onload = () => {
        document.body.classList.add('loaded');
        const main = document.querySelector('main');
        createDefaultPage(main);
    }
})();

function createDefaultPage(main){
    console.log('Hello World');
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    heading.textContent =  'Hello, and Welcome to ';
    const span = document.createElement('span');
    span.textContent = 'Valorant Locker';
    heading.appendChild(span);
    heading.classList.add('head');
    const description = document.createElement('p');
    description.textContent = 'This was created by Zehno as a passion project.\n I hope you enjoy, and if you use this for ranked - I hope you gain unlimited RR!';

    container.append(heading, description);
    main.append(container);
}

/*
const options = document.createElement('div');
    const paypalContainer = document.createElement('div');
    paypalContainer.id = 'paypal-container-RFMSYLX9NT296';
    const paypalScript = document.createElement('script');
    paypalScript.textContent = 'paypal.HostedButtons({\n    hostedButtonId: "RFMSYLX9NT296",\n  }).render("#paypal-container-RFMSYLX9NT296")'
    paypalContainer.append(paypalScript);


    const gitContainer = document.createElement('div');
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/Zehnooo/valorant-api-testing';
    githubLink.target = '_blank';
    githubLink.textContent = 'This Repo';
    const githubImg = document.createElement('img');
    githubImg.src = './assets/images/github.svg';
    gitContainer.append(githubImg, githubLink)

    options.append(paypalContainer, gitContainer);
 */