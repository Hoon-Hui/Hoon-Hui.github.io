const defaults = {
    maxSize: 14,
    minSize: 8,
    newOn: 150, // 새 꽃잎 생성 간격(ms)
    swayCount: 10,
    minFall: 5, // 최소 낙하 시간
    maxFall: 10 // 최대 낙하 시간
};

const $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();
const $petal = $('<span class="petal"></span>');

// 랜덤 숫자 생성 헬퍼
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// 꽃잎 생성
function createPetal() {
    const petal = $petal.clone();

    const size = rand(defaults.minSize, defaults.maxSize).toFixed(2);
    const startLeft = rand(0, wrapW).toFixed(2);
    const fallTime = rand(defaults.minFall, defaults.maxFall).toFixed(2);
    const swayIndex = Math.floor(rand(0, defaults.swayCount));
    const swayDuration = rand(0.8, 1.8).toFixed(2);

    petal.css({
        width: size + 'px',
        height: size + 'px',
        left: startLeft + 'px',
        top: -size + 'px',
        position: 'absolute',
        animation: `fall ${fallTime}s linear forwards, sway${swayIndex} ${swayDuration}s infinite alternate`,
        willChange: 'transform, opacity'
    }).appendTo($wrap);

    // 낙하 완료 후 제거
    setTimeout(() => petal.remove(), fallTime * 1000);
}

// 주기적으로 꽃잎 생성
setInterval(createPetal, defaults.newOn);

// 창 크기 변경시 wrap 크기 업데이트
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});
