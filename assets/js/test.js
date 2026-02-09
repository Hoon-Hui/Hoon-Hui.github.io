// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300
};

// 1. 벚꽃잎 전용 CSS 추가 (기존 .cherry_blossom 영역은 건드리지 않음)
const styles = `
<style>
    /* 벚꽃잎 래퍼: 위치 잡기용 */
    .petal-container {
        position: absolute; /* 부모 요소 기준 배치 */
        top: -20px;
        z-index: 9999; /* 다른 요소보다 위에 표시 */
        pointer-events: none; /* 벚꽃이 클릭을 방해하지 않도록 설정 (중요) */
        will-change: transform; /* 성능 최적화 */
    }
    
    /* 벚꽃잎 본체: 회전 및 모양 */
    .petal-inner {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #ffc0cb; /* 벚꽃색 */
        border-radius: 50% 0 50% 0;
        will-change: transform;
    }
    
    /* 떨어지는 애니메이션 (GPU 가속) */
    @keyframes fall-drift {
        to { transform: translate3d(var(--end-x), var(--end-y), 0); }
    }
    
    /* 3D 회전 애니메이션 */
    @keyframes tumble {
        0% { transform: rotate3d(1, 1, 1, 0deg); }
        100% { transform: rotate3d(1, 1, 0, 360deg); }
    }
</style>
`;
$('head').append(styles);

// 벚꽃 영역 변수
var $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();
let wrapH = $wrap.height();

// 2. 부모 요소에 position이 없으면 relative를 줘서 벚꽃이 영역 안에 갇히게 함
// (기존 화면이 깨지지 않는 선에서 최소한의 안전장치)
if ($wrap.css('position') === 'static') {
    $wrap.css('position', 'relative');
}
// 벚꽃이 영역 밖으로 나가서 스크롤바가 생기지 않도록 처리
if ($wrap.css('overflow') !== 'hidden') {
    $wrap.css('overflow', 'hidden');
}

// 벚꽃 잎 템플릿 (미리 만들어두어 성능 향상)
const $petalTemplate = $('<div class="petal-container"><span class="petal-inner"></span></div>');

const petalGen = () => {
    // 다음 생성 예약
    setTimeout(() => requestAnimationFrame(petalGen), defaults.newOn);

    const $el = $petalTemplate.clone();
    const $inner = $el.find('.petal-inner');
    
    // 랜덤 값 계산
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5;
    
    // 떨어지는 거리 (영역 높이 + 여유분)
    const endY = wrapH + 50; 
    // 좌우 흔들림 거리
    const endX = (Math.random() * 2 - 1) * 200; 
    
    const spinTime = 2 + Math.random() * 3; 

    // CSS 변수로 위치 및 애니메이션 정보 전달
    $el.css({
        width: size,
        height: size,
        left: startLeft,
        '--end-x': `${endX}px`,
        '--end-y': `${endY}px`,
        animation: `fall-drift ${fallTime}s linear forwards`
    });

    $inner.css({
        animation: `tumble ${spinTime}s linear infinite`
    });

    // 애니메이션 종료 후 요소를 DOM에서 제거 (메모리 관리)
    $el.on('animationend', (e) => {
        if (e.originalEvent.animationName.includes('fall-drift')) {
            $el.remove();
        }
    }).appendTo($wrap);
};

// 창 크기 변경 대응
$(window).resize(() => {
    wrapW = $wrap.width();
    wrapH = $wrap.height();
});

// 실행
$(window).on('load', () => {
    requestAnimationFrame(petalGen);
});
