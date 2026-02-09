/*
// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300
};

// 벚꽃 영역 크기를 저장할 변수
var $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// 벚꽃 잎 생성
const $petal = $('<span class="petal"></span>');

// 랜덤 회전 값을 생성하는 함수
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

// 무작위 흔들림 애니메이션 배열 생성
const randomSwayAnims = [...Array(10)].map(getRandomRotate);

// 특정 요소에 흔들림 애니메이션 적용
const applySwayAnim = (element) => {
    const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
    element.css('transform', randomSway);
    setTimeout(() => {
        applySwayAnim(element);
    }, 1000);
};

// 벚꽃 잎 생성 함수
const petalGen = () => {
    setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

    const petal = $petal.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startPosLeft = Math.random() * wrapW;
    //const fallTime = (wrapH * 0.1 + Math.random() * 5) / defaults.speed;
    
    const fallTime = 5 + Math.random() * 5;
    const horizontalOffset = Math.random() * 2 - 1;

    // 애니메이션 끝나면 제거
    petal.on('animationend', () => {
        petal.remove();
    }).css({
        width: size,
        height: size,
        left: startPosLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear`
    }).appendTo($wrap);

    // 위치 업데이트 함수
    const updatePos = () => {
        petal.css('left', `+=${horizontalOffset}`);
        requestAnimationFrame(updatePos);
    };

    updatePos();
    applySwayAnim(petal);
    startXSpinLoop(petal);
};

// 창 크기가 변경될 때 영역 크기 업데이트
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 로딩 완료 후 벚꽃 잎 생성 시작
$(window).on('load', () => {
    requestAnimationFrame(petalGen);
});

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
        spinXOnce(element);
        const delay = 1000 + Math.random() * 500;
        setTimeout(loop, delay);
    };

    setTimeout(loop, 1000);
};
*/
// ==========================
// 설정
// ==========================
const defaults = {
    minSize: 9,
    maxSize: 12,
    newOn: 280,
    minFall: 6,
    maxFall: 10
};

const $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();

// ==========================
// 유틸
// ==========================
const rand = (min, max) => Math.random() * (max - min) + min;

// ==========================
// 꽃잎 생성
// ==========================
const createPetal = () => {
    const size = rand(defaults.minSize, defaults.maxSize);
    const startX = rand(0, wrapW);
    const fallTime = rand(defaults.minFall, defaults.maxFall);

    let x = 0;
    let rotX = rand(0, 360);
    let rotY = rand(-30, 30);
    let rotZ = rand(-180, 180);

    const driftSpeed = rand(0.3, 0.8);
    const swayRange = rand(30, 80);
    const spinSpeed = rand(-2, 2);

    const $petal = $('<span class="petal"></span>').css({
        width: size,
        height: size,
        left: startX,
        top: '-5%',
        animation: `fall ${fallTime}s linear forwards`,
        transform: `
            translate3d(0,0,0)
            rotateX(${rotX}deg)
            rotateY(${rotY}deg)
            rotateZ(${rotZ}deg)
        `
    });

    $wrap.append($petal);

    // ==========================
    // 흩날림 루프 (이 꽃잎 전용)
    // ==========================
    let t = Math.random() * Math.PI * 2;
    let alive = true;

    const sway = () => {
        if (!alive) return;

        t += driftSpeed;
        x = Math.sin(t) * swayRange;

        rotX += spinSpeed * 0.3;
        rotY += spinSpeed * 0.5;
        rotZ += spinSpeed;

        $petal.css(
            'transform',
            `
            translate3d(${x}px, 0, ${Math.sin(t) * 50}px)
            rotateX(${rotX}deg)
            rotateY(${rotY}deg)
            rotateZ(${rotZ}deg)
            `
        );

        setTimeout(sway, 60 + Math.random() * 40);
    };

    sway();

    // 종료 정리
    $petal.on('animationend', () => {
        alive = false;
        $petal.remove();
    });
};

// ==========================
// 생성 루프
// ==========================
let timer = null;

const startPetals = () => {
    if (timer) return;
    timer = setInterval(createPetal, defaults.newOn);
};

// ==========================
// 리사이즈
// ==========================
$(window).on('resize', () => {
    wrapW = $wrap.width();
});

// ==========================
// 시작
// ==========================
$(window).on('load', startPetals);
const stopPetals = () => {
    clearInterval(petalTimer);
    petalTimer = null;
};

// ==========================
// 리사이즈 대응
// ==========================
$(window).on('resize', () => {
    wrapW = $wrap.width();
});

// ==========================
// 시작
// ==========================
$(window).on('load', startPetals);
