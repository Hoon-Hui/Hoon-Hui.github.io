// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 15,
    minSize: 10,
    newOn: 400
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
    const rotateY = Math.random() * 60 - 30;
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
    const fallTime = (wrapH * 0.1 + Math.random() * 5) / defaults.speed;
    /* const fallTime = 5 + Math.random() * 5; */
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
