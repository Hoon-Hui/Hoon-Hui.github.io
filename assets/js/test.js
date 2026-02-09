// 기본 값
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 50  // 더 빠르게 생성
};

const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// 벚꽃 잎 템플릿
const $petal = $('<span class="petal"></span>');

// 랜덤 회전 값
const randomSwayAnims = [...Array(10)].map(() => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px)`;
});

// 벚꽃 잎 상태 저장
const petals = [];

// 벚꽃 잎 생성
const petalGen = () => {
    const petal = $petal.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startLeft = Math.random() * wrapW;
    const fallSpeed = 0.5 + Math.random(); // px/frame
    const swayIndex = Math.floor(Math.random() * randomSwayAnims.length);

    petal.css({
        width: size,
        height: size,
        position: 'absolute',
        top: -size + 'px',
        left: startLeft + 'px',
        willChange: 'transform',
        transform: randomSwayAnims[swayIndex] + ` translate3d(0,0,0)`
    }).appendTo($wrap);

    petals.push({
        $el: petal,
        x: startLeft,
        y: -size,
        swayIndex,
        speedY: fallSpeed,
        speedX: Math.random() * 0.5 - 0.25,
        nextSpin: Date.now() + 1000 + Math.random() * 500
    });
};

// 전역 애니메이션 루프
const animatePetals = () => {
    const now = Date.now();
    petals.forEach((p, i) => {
        // 위치 업데이트
        p.y += p.speedY;
        p.x += p.speedX;

        // 흔들림 랜덤 변경
        if (Math.random() < 0.01) p.swayIndex = Math.floor(Math.random() * randomSwayAnims.length);

        // X축 회전
        if (now > p.nextSpin) {
            p.$el.css({ transition: 'transform 1s linear', transform: `rotateX(360deg)` });
            setTimeout(() => {
                p.$el.css({ transition: 'none', transform: randomSwayAnims[p.swayIndex] + ` translate3d(${p.x}px,${p.y}px,0)` });
            }, 1000);
            p.nextSpin = now + 1000 + Math.random() * 500;
        }

        // transform 적용 (GPU 가속)
        p.$el.css('transform', randomSwayAnims[p.swayIndex] + ` translate3d(${p.x}px,${p.y}px,0)`);

        // 화면 밖이면 제거
        if (p.y > wrapH + 50) {
            p.$el.remove();
            petals.splice(i, 1);
        }
    });

    requestAnimationFrame(animatePetals);
};

// 반복 벚꽃 생성
const loopPetalGen = () => {
    petalGen();
    setTimeout(loopPetalGen, defaults.newOn);
};

// 창 크기 변경
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 시작
$(window).on('load', () => {
    requestAnimationFrame(animatePetals);
    loopPetalGen();
});
