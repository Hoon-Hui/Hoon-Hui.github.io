const defaults = {
    maxSize: 12,
    minSize: 9,
    newOn: 200
};

const $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();
let wrapH = $wrap.height();

const $petal = $('<span class="petal"></span>');

const rand = (min, max) => Math.random() * (max - min) + min;

// 꽃잎 생성
const petalGen = () => {
    const petal = $petal.clone();
    const size = Math.floor(rand(defaults.minSize, defaults.maxSize));
    const startLeft = rand(0, wrapW);
    const fallTime = rand(5, 10);

    // CSS 변수로 회전/좌우 흔들림 랜덤화
    const xOffset = rand(-30, 30) + 'px';
    const yRot = rand(-30, 30) + 'deg';
    const zRot = rand(-60, 60) + 'deg';

    petal.css({
        width: size,
        height: size,
        left: startLeft,
        position: 'absolute',
        '--x-offset': xOffset,
        '--y-rot': yRot,
        '--z-rot': zRot,
        animation: `fall ${fallTime}s linear forwards`,
    }).appendTo($wrap);

    // 일정 시간 후 제거
    setTimeout(() => petal.remove(), fallTime * 1000);

    // 다음 꽃잎 생성
    setTimeout(petalGen, defaults.newOn);
};

// 창 크기 변경시
$(window).resize(() => {
    wrapW = $wrap.width();
    wrapH = $wrap.height();
});

// 시작
$(window).on('load', () => {
    petalGen();
});
