// ================================
// 기본 값 설정
// ================================
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300
};

// ================================
// 벚꽃 영역
// ================================
var $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// ================================
// 벚꽃 잎
// ================================
const $petal = $('<span class="petal"></span>');

// ================================
// 상태 / 메모리 관리용 WeakMap
// ================================
const petalState = new WeakMap();
const swayTimers = new WeakMap();
const spinTimers = new WeakMap();
const rafIds = new WeakMap();

// ================================
// IntersectionObserver
// ================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            const el = entry.target;

            // 상태 제거
            petalState.delete(el);

            // 타이머 제거
            clearTimeout(swayTimers.get(el));
            clearTimeout(spinTimers.get(el));

            // RAF 제거
            cancelAnimationFrame(rafIds.get(el));

            swayTimers.delete(el);
            spinTimers.delete(el);
            rafIds.delete(el);

            observer.unobserve(el);
            el.remove();
        }
    });
}, {
    root: $wrap[0],
    threshold: 0
});

const isAlive = (el) => {
    return petalState.get(el[0]) === true;
};

// ================================
// 랜덤 회전
// ================================
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;

    return `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
    `;
};

const randomSwayAnims = [...Array(10)].map(getRandomRotate);

// ================================
// 흔들림 애니메이션
// ================================
const applySwayAnim = (element) => {
    if (!isAlive(element)) return;

    const randomSway =
        randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];

    element.css('transform', randomSway);

    const timerId = setTimeout(() => {
        applySwayAnim(element);
    }, 1000);

    swayTimers.set(element[0], timerId);
};

// ================================
// X축 회전
// ================================
const spinXOnce = (element) => {
    element.css({
        transition: 'transform 1s linear',
        transform: 'rotateX(360deg)'
    });

    setTimeout(() => {
        element.css('transform', 'rotateX(0deg)');
    }, 1000);
};

const startXSpinLoop = (element) => {
    const loop = () => {
        if (!isAlive(element)) return;

        spinXOnce(element);

        const timerId = setTimeout(loop, 1000 + Math.random() * 500);
        spinTimers.set(element[0], timerId);
    };

    const startId = setTimeout(loop, 1000);
    spinTimers.set(element[0], startId);
};

// ================================
// 좌우 이동 (RAF)
// ================================
const updatePos = (petal, offset) => {
    if (!isAlive(petal)) return;

    petal.css('left', `+=${offset}`);

    const rafId = requestAnimationFrame(() => updatePos(petal, offset));
    rafIds.set(petal[0], rafId);
};

// ================================
// 벚꽃 생성
// ================================
const petalGen = () => {
    setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

    const petal = $petal.clone();
    const size =
        Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) +
        defaults.minSize;

    const startPosLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5;
    const horizontalOffset = Math.random() * 2 - 1;

    petal.css({
        width: size,
        height: size,
        left: startPosLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear`
    }).appendTo($wrap);

    petalState.set(petal[0], true);
    observer.observe(petal[0]);

    updatePos(petal, horizontalOffset);
    applySwayAnim(petal);
    startXSpinLoop(petal);
};

// ================================
// 리사이즈 대응
// ================================
$(window).on('resize', () => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// ================================
// 시작
// ================================
$(window).on('load', () => {
    requestAnimationFrame(petalGen);
});
