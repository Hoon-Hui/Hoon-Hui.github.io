// ================= 기본 값 설정 =================
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300,
    maxPetals: 25
};

// ================= 영역 설정 =================
var $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// ================= 벚꽃 잎 템플릿 =================
const $petal = $('<span class="petal"></span>');

// ================= 랜덤 회전 =================
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

// ================= 흔들림 애니메이션 =================
const randomSwayAnims = [...Array(10)].map(getRandomRotate);

const applySwayAnim = (element) => {
    if (!element.data('alive')) return;

    const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
    element.css('transform', randomSway);

    setTimeout(() => {
        applySwayAnim(element);
    }, 1000);
};

// ================= X축 회전 =================
const spinXOnce = (element) => {
    if (!element.data('alive')) return;

    element.css({
        transition: 'transform 1s linear',
        transform: 'rotateX(360deg)'
    });

    setTimeout(() => {
        if (!element.data('alive')) return;
        element.css('transform', 'rotateX(0deg)');
    }, 1000);
};

const startXSpinLoop = (element) => {
    const loop = () => {
        if (!element.data('alive')) return;

        spinXOnce(element);
        const delay = 1000 + Math.random() * 500;
        setTimeout(loop, delay);
    };

    setTimeout(loop, 1000);
};

// ================= 벚꽃 잎 생성 =================
const petalGen = () => {
    setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

    // 🔒 개수 제한 (모바일 최적)
    if ($wrap.children('.petal').length >= defaults.maxPetals) {
        return;
    }

    const petal = $petal.clone();
    petal.data('alive', true);

    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startPosLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5;
    const horizontalOffset = Math.random() * 2 - 1;

    petal.on('animationend', () => {
        petal.data('alive', false);
        petal.remove();
    }).css({
        width: size,
        height: size,
        left: startPosLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear`
    }).appendTo($wrap);

    const updatePos = () => {
        if (!petal.data('alive')) return;
        petal.css('left', `+=${horizontalOffset}`);
        requestAnimationFrame(updatePos);
    };

    updatePos();
    applySwayAnim(petal);
    startXSpinLoop(petal);
};

// ================= 리사이즈 대응 =================
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// ================= 시작 =================
$(window).on('load', () => {
    requestAnimationFrame(petalGen);
});
