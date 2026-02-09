// 기본 값 설정
const defaults = {
    maxSize: 12,
    minSize: 9,
    newOn: 250
};

const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();
const $petal = $('<span class="petal"></span>');

// 랜덤 숫자 생성
const rand = (min, max) => Math.random() * (max - min) + min;

// 랜덤 회전/흔들림 생성
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = rand(-35, 35);
    const rotateZ = rand(-60, 60);
    const translateX = rand(-5, 5);
    const translateY = rand(-10, 0);
    const translateZ = rand(0, 15);
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
};

// 흔들림 적용
const applySwayAnim = (element) => {
    const randomSway = getRandomRotate();
    element.css('transform', randomSway);
    setTimeout(() => applySwayAnim(element), 1000); // 1초 간격
};

// X축 회전 1회 (느리지만 랜덤 속도)
const spinXOnce = (element) => {
    const duration = rand(0.8, 1.5); // 0.8~1.5초
    element.css({
        transition: `transform ${duration}s linear`,
        transform: 'rotateX(360deg)'
    });
    setTimeout(() => element.css('transform', 'rotateX(0deg)'), duration * 1000);
};

// X축 회전 루프
const startXSpinLoop = (element) => {
    const loop = () => {
        spinXOnce(element);
        const delay = rand(800, 1500); // 0.8~1.5초 간격
        setTimeout(loop, delay);
    };
    setTimeout(loop, rand(200, 800));
};

// 꽃잎 생성
const petalGen = () => {
    const petal = $petal.clone();
    const size = Math.floor(rand(defaults.minSize, defaults.maxSize));
    const startLeft = rand(0, wrapW);
    const fallTime = rand(5, 10);
    const horizontalOffset = rand(-1, 1);

    petal.css({
        width: size,
        height: size,
        left: startLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear forwards`,
        willChange: 'transform, opacity'
    }).appendTo($wrap);

    setTimeout(() => petal.remove(), fallTime * 1000);

    // 좌우 이동
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

// 창 크기 변경시
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 시작
$(window).on('load', () => {
    petalGen();
});
