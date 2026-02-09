const defaults = {
    maxSize: 14,
    minSize: 8,
    newOn: 120, // 생성 간격
    swayCount: 10,
    minFall: 5,
    maxFall: 12
};

const $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();
let $petal = $('<span class="petal"></span>');

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createPetal() {
    const petal = $petal.clone();

    const size = rand(defaults.minSize, defaults.maxSize).toFixed(2);
    const left = rand(0, wrapW).toFixed(2);
    const fallTime = rand(defaults.minFall, defaults.maxFall).toFixed(2);
    const swayIndex = Math.floor(rand(0, defaults.swayCount));
    const swayDuration = rand(2, 6).toFixed(2); // 흔들림 속도

    petal.css({
        width: size + 'px',
        height: size + 'px',
        left: left + 'px',
        top: -size + 'px',
        position: 'absolute',
        animation: `fall ${fallTime}s linear forwards, sway${swayIndex} ${swayDuration}s infinite alternate`,
        willChange: 'transform, opacity'
    }).appendTo($wrap);

    setTimeout(() => petal.remove(), fallTime * 1000);
}

// 주기적으로 꽃잎 생성
setInterval(createPetal, defaults.newOn);

// 창 크기 업데이트
$(window).resize(() => { wrapW = $wrap.width(); });
