const defaults = {
    maxSize: 12,
    minSize: 9,
    newOn: 200 // 꽃잎 생성 간격
};

const $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();
let wrapH = $wrap.height();
const $petal = $('<span class="petal"></span>');

const rand = (min, max) => Math.random() * (max - min) + min;

// 랜덤 회전/흔들림/바람 생성
const getRandomTransform = (windOffset) => {
    const rotateX = 360;
    const rotateY = rand(-35, 35);
    const rotateZ = rand(-60, 60);
    const translateX = rand(-5, 5) + windOffset; // 바람 영향 추가
    const translateY = rand(-10, 0);
    const translateZ = rand(0, 15);
    return { rotateX, rotateY, rotateZ, translateX, translateY, translateZ };
};

// 흔들림 적용
const applySwayAnim = (element, windOffset) => {
    const t = getRandomTransform(windOffset);
    element.css('transform', `rotateX(${t.rotateX}deg) rotateY(${t.rotateY}deg) rotateZ(${t.rotateZ}deg) translate3d(${t.translateX}px, ${t.translateY}px, ${t.translateZ}px)`);
    setTimeout(() => applySwayAnim(element, windOffset), 1000);
};

// X축 회전 1회
const spinXOnce = (element) => {
    element.css({
        transition: 'transform 1s linear',
        transform: 'rotateX(360deg)'
    });
    setTimeout(() => element.css('transform', 'rotateX(0deg)'), 1000);
};

// X축 회전 루프
const startXSpinLoop = (element) => {
    const loop = () => {
        spinXOnce(element);
        const delay = rand(1000, 1500);
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
    const horizontalOffset = rand(-0.5, 0.5); // 약간 좌우 이동
    const windOffset = rand(0.5, 2); // 바람 영향 (오른쪽으로 살짝 휘는 정도)

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

    // 좌우 이동 + 바람
    let left = startLeft;
    const updatePos = () => {
        left += horizontalOffset + windOffset * 0.1; // 바람이 살짝 꽃잎을 이동시킴
        petal.css('left', left);
        requestAnimationFrame(updatePos);
    };
    updatePos();

    applySwayAnim(petal, windOffset);
    startXSpinLoop(petal);

    // 다음 꽃잎 생성
    setTimeout(petalGen, defaults.newOn);
};

// 창 크기 변경 시
$(window).resize(() => {
    wrapW = $wrap.width();
    wrapH = $wrap.height();
});

// 시작
$(window).on('load', () => {
    petalGen();
});
