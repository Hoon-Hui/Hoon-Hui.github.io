const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 250
};

const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

const $petal = $('<span class="petal"></span>');

const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 35;
    const rotateZ = Math.random() * 120 - 60;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
};

const randomSwayAnims = [...Array(10)].map(getRandomRotate);

const applySwayAnim = (element) => {
    const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
    element.css('transform', randomSway);
    setTimeout(() => applySwayAnim(element), 500);
};

// X축 회전 1회 (더 빠르게)
const spinXOnce = (element) => {
    const duration = 0.2 + Math.random() * 0.5; // 0.2~0.7초 → 빠른 회전
    element.css({
        transition: `transform ${duration}s linear`,
        transform: 'rotateX(360deg)'
    });
    setTimeout(() => element.css('transform', 'rotateX(0deg)'), duration * 1000);
};

// X축 회전 루프 (더 짧은 간격)
const startXSpinLoop = (element) => {
    const loop = () => {
        spinXOnce(element);
        const delay = 200 + Math.random() * 500; // 0.2~0.7초 간격
        setTimeout(loop, delay);
    };
    setTimeout(loop, 100 + Math.random() * 200);
};

const petalGen = () => {
    const petal = $petal.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5;
    const horizontalOffset = Math.random() * 2 - 1;

    petal.css({
        width: size,
        height: size,
        left: startLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear forwards`,
        willChange: 'transform, opacity'
    }).appendTo($wrap);

    setTimeout(() => petal.remove(), fallTime * 1000);

    let left = startLeft;
    const updatePos = () => {
        left += horizontalOffset;
        petal.css('left', left);
        requestAnimationFrame(updatePos);
    };
    updatePos();

    applySwayAnim(petal);
    startXSpinLoop(petal);

    setTimeout(petalGen, defaults.newOn);
};

$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

$(window).on('load', () => {
    petalGen();
});
