// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 250 // 생성 간격
};

const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

const $petal = $('<span class="petal"></span>');

// 랜덤 회전/위치 생성
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 35;
    const rotateZ = Math.random() * 120 - 60;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
};

// 여러 흔들림 프리셋
const randomSwayAnims = [...Array(10)].map(getRandomRotate);

// 흔들림 적용
const applySwayAnim = (element) => {
    const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
    element.css('transform', randomSway);
    setTimeout(() => applySwayAnim(element), 500); // 0.5초 간격
};

// X축 회전 1회
const spinXOnce = (element) => {
    const duration = 0.5 + Math.random() * 1; // 0.5~1.5초
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
        const delay = 500 + Math.random() * 1000; // 0.5~1.5초
        setTimeout(loop, delay);
    };
    setTimeout(loop, 500 + Math.random() * 500);
};

// 꽃잎 생성
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

    // 낙하 완료 후 제거
    setTimeout(() => petal.remove(), fallTime * 1000);

    // 위치 업데이트
    let left = startLeft;
    const updatePos = () => {
        left += horizontalOffset;
        petal.css('left', left);
        requestAnimationFrame(updatePos);
    };
    updatePos();

    applySwayAnim(petal);
    startXSpinLoop(petal);

    // 다음 꽃잎 생성
    setTimeout(petalGen, defaults.newOn);
};

// 창 크기 변경시 업데이트
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 시작
$(window).on('load', () => {
    petalGen();
});
