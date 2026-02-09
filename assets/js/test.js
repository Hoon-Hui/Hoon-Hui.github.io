const defaults = {
    maxSize: 12,
    minSize: 9,
    newOn: 200, // 꽃잎 생성 간격
    speed: 1 // 기본 속도 조절
};

const $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();
let wrapH = $wrap.height();
const $petal = $('<span class="petal"></span>');

const rand = (min, max) => Math.random() * (max - min) + min;

// 꽃잎 리스트
const petals = [];

// 꽃잎 생성
const petalGen = () => {
    const petal = $petal.clone();
    const size = Math.floor(rand(defaults.minSize, defaults.maxSize));
    const startLeft = rand(0, wrapW);
    const fallTime = rand(5, 10);
    
    // 랜덤 초기 속성
    const t = {
        x: startLeft,
        y: -size,
        size: size,
        horizontalOffset: rand(-0.5, 0.5),
        rotateX: 0,
        rotateY: rand(-30, 30),
        rotateZ: rand(-60, 60),
        spinSpeed: rand(0.8, 1.5)
    };

    petal.css({
        width: size,
        height: size,
        left: t.x,
        top: t.y,
        position: 'absolute',
        willChange: 'transform, opacity'
    }).appendTo($wrap);

    petals.push({ el: petal, state: t, startTime: performance.now(), fallTime });

    // 다음 꽃잎 생성
    setTimeout(petalGen, defaults.newOn);
};

// 메인 애니메이션 루프
const animatePetals = (time) => {
    for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        const t = p.state;
        const elapsed = (time - p.startTime) / 1000; // 초 단위

        // 낙하
        t.y += defaults.speed;
        t.x += t.horizontalOffset;
        
        // X축 회전
        t.rotateX = (t.rotateX + (360 / (p.fallTime / t.spinSpeed))) % 360;

        // 좌우 흔들림 (rotateY/Z 랜덤으로 살짝 변경)
        const swayY = t.rotateY + Math.sin(elapsed * 2) * 5;
        const swayZ = t.rotateZ + Math.sin(elapsed * 1.5) * 5;

        // transform 적용
        p.el.css('transform', `translate3d(${t.x}px, ${t.y}px, 0) rotateX(${t.rotateX}deg) rotateY(${swayY}deg) rotateZ(${swayZ}deg)`);

        // 화면 아래로 나가면 제거
        if (t.y > wrapH) {
            p.el.remove();
            petals.splice(i, 1);
        }
    }

    requestAnimationFrame(animatePetals);
};

// 창 크기 변경
$(window).resize(() => {
    wrapW = $wrap.width();
    wrapH = $wrap.height();
});

// 시작
$(window).on('load', () => {
    petalGen();
    requestAnimationFrame(animatePetals);
});
