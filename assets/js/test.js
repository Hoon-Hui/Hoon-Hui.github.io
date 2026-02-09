// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300
};

const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// 벚꽃 잎 생성 기본 요소
const $petal = $('<span class="petal"></span>');

// 미리 정의된 흔들림 애니메이션 클래스 10개
const swayClasses = Array.from({length: 10}, (_, i) => `sway${i}`);
for (let i = 0; i < 10; i++) {
    const rotateX = 360;
    const rotateY = Math.random() * 70 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;

    const style = `
        @keyframes sway${i} {
            0% { transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, ${translateZ}px);}
            50% { transform: rotateX(${rotateX}deg) rotateY(${rotateY + 5}deg) rotateZ(${rotateZ + 5}deg) translate3d(${translateX + 2}px, ${translateY + 2}px, ${translateZ}px);}
            100% { transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, ${translateZ}px);}
        }
    `;
    $('head').append(`<style>${style}</style>`);
}

// 벚꽃 잎 생성
const petalGen = () => {
    const petal = $petal.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5;

    // 랜덤 흔들림 클래스 선택
    const swayClass = swayClasses[Math.floor(Math.random() * swayClasses.length)];

    petal.css({
        width: size,
        height: size,
        left: startLeft,
        top: -size,
        position: 'absolute',
        animation: `fall ${fallTime}s linear forwards`,
    }).addClass(swayClass)
      .appendTo($wrap);

    // 일정 시간 후 제거
    setTimeout(() => petal.remove(), fallTime * 1000);

    setTimeout(petalGen, defaults.newOn);
};

// 창 크기 업데이트
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 애니메이션 시작
$(window).on('load', () => {
    petalGen();
});
