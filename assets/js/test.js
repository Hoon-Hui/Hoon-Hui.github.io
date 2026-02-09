const $wrap = $('.cherry_blossom');
let wrapW = window.innerWidth;

const config = {
    minSize: 10,
    maxSize: 16,
    minFall: 7,
    maxFall: 13,
    minSway: 2,
    maxSway: 4,
    minSpin: 4,
    maxSpin: 8,
    spawn: 180
};

const rand = (min, max) => Math.random() * (max - min) + min;

const createPetal = () => {
    const size = rand(config.minSize, config.maxSize);
    const startX = rand(-100, wrapW);
    const endX = startX + rand(-200, 200);

    const fallTime = rand(config.minFall, config.maxFall);
    const swayTime = rand(config.minSway, config.maxSway);
    const spinTime = rand(config.minSpin, config.maxSpin);

    const petal = document.createElement('span');
    petal.className = 'petal';

    petal.style.setProperty('--size', `${size}px`);
    petal.style.setProperty('--start-x', `${startX}px`);
    petal.style.setProperty('--end-x', `${endX}px`);
    petal.style.setProperty('--fall-time', `${fallTime}s`);
    petal.style.setProperty('--sway-time', `${swayTime}s`);
    petal.style.setProperty('--spin-time', `${spinTime}s`);

    $wrap.append(petal);

    petal.addEventListener('animationend', () => {
        petal.remove();
    });
};

let timer = null;

const start = () => {
    if (timer) return;
    timer = setInterval(createPetal, config.spawn);
};

$(window).on('resize', () => {
    wrapW = window.innerWidth;
});

$(window).on('load', start);
