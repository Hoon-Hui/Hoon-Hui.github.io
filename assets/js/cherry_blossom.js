// ================= 기본 값 설정 =================
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300,
    maxPetals: 25
};

// ================= 영역 설정 =================
const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// ================= 벚꽃 잎 템플릿 =================
const $petalTemplate = $('<span class="petal"></span>');

// ================= 랜덤 회전 =================
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;

    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) 
            translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

// ================= petal 배열 =================
const petals = [];

// ================= petal 생성 =================
const createPetal = () => {
    if (petals.length >= defaults.maxPetals) return;

    const $petal = $petalTemplate.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startX = Math.random() * wrapW;
    const horizontalOffset = Math.random() * 2 - 1;
    const fallTime = 5 + Math.random() * 5;

    const petal = {
        el: $petal.appendTo($wrap),
        x: 0, // transform용 이동값은 0부터 시작
        y: 0,
        dx: horizontalOffset,
        alive: true,
        swayTimer: 0,
        spinTimer: 0
    };

    $petal.css({
        width: size,
        height: size,
        position: 'absolute',
        left: startX + 'px', // ✅ 시작 위치를 left로 지정
        top: 0,
        animation: `fall ${fallTime}s linear`
    });

    // petal 제거
    $petal.on('animationend', () => {
        petal.alive = false;
        $petal.remove();
    });

    petals.push(petal);
};

// ================= petal 업데이트 =================
const updatePetals = () => {
    for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];

        if (!p.alive) {
            petals.splice(i, 1);
            continue;
        }

        // 가로 이동
        p.x += p.dx;

        let transformStr = `translate(${p.x}px, 0px)`;

        // 흔들림 효과
        if (!p.swayTimer || performance.now() - p.swayTimer > 1000) {
            transformStr += ' ' + getRandomRotate();
            p.swayTimer = performance.now();
        }

        // 회전 효과
        if (!p.spinTimer || performance.now() - p.spinTimer > 1000 + Math.random() * 500) {
            transformStr += ' rotateX(360deg)';
            p.spinTimer = performance.now();
        }

        p.el.css('transform', transformStr);
    }

    requestAnimationFrame(updatePetals);
};

// ================= petal 자동 생성 =================
const petalSpawner = () => {
    createPetal();
    setTimeout(petalSpawner, defaults.newOn);
};

// ================= 리사이즈 대응 =================
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// ================= 시작 =================
$(window).on('load', () => {
    petalSpawner();
    requestAnimationFrame(updatePetals);
});
