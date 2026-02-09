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
// 설정값
// ==========================
const defaults = {
    maxSize: 12,
    minSize: 9,
    newOn: 300, // 꽃잎 생성 간격(ms)
    minFall: 5,
    maxFall: 10
};

// ==========================
// 기본 요소
// ==========================
const $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();

// ==========================
// 유틸
// ==========================
const rand = (min, max) => Math.random() * (max - min) + min;

// ==========================
// 랜덤 transform 생성
// ==========================
const randomTransform = () => {
    const rotateX = rand(0, 360);
    const rotateY = rand(-30, 30);
    const rotateZ = rand(-60, 60);
    const translateX = rand(-20, 20);
    const translateZ = rand(-50, 50);

    return `
        translate3d(${translateX}px, 0, ${translateZ}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
    `;
};

// ==========================
// 꽃잎 생성
// ==========================
const createPetal = () => {
    const size = rand(defaults.minSize, defaults.maxSize);
    const startLeft = rand(0, wrapW);
    const fallTime = rand(defaults.minFall, defaults.maxFall);

    const $petal = $('<span class="petal"></span>').css({
        width: size,
        height: size,
        left: startLeft,
        top: '-5%',
        animation: `fall ${fallTime}s linear forwards`,
        transform: randomTransform()
    });

    // 애니메이션 종료 시 정리
    $petal.on('animationend', () => {
        $petal.remove();
    });

    // 부드러운 흔들림 (CSS transition 활용)
    const sway = () => {
        if (!$petal[0].isConnected) return;
        $petal.css('transform', randomTransform());
        setTimeout(sway, 800 + Math.random() * 700);
    };

    sway();
    $wrap.append($petal);
};

// ==========================
// 꽃잎 생성 루프 (단일 타이머)
// ==========================
let petalTimer = null;

const startPetals = () => {
    if (petalTimer) return;
    petalTimer = setInterval(createPetal, defaults.newOn);
};

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
