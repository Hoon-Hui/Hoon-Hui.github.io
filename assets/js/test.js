// 기본 설정
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300 // 벚꽃 생성 간격 (ms)
};

// 1. 최적화된 애니메이션 스타일 주입
// (기존 화면에 영향 없도록 벚꽃잎(petal)에만 적용되는 스타일입니다)
const styles = `
<style>
    .petal-layer {
        position: absolute;
        top: -20px;
        z-index: 8888;     /* 배경보다 위에, 메뉴보다는 아래에 (필요시 조절) */
        pointer-events: none; /* 벚꽃이 클릭을 막지 않게 함 (필수) */
        will-change: transform;
    }
    
    .petal-shape {
        display: block;
        width: 100%;
        height: 100%;
        /* 이미지가 있다면 아래 background-color를 지우고 background-image를 넣으세요 */
        background-color: #ffc0cb; 
        border-radius: 50% 0 50% 0;
        will-change: transform;
    }
    
    /* 최적화된 낙하 애니메이션 (GPU 사용) */
    @keyframes fall-opt {
        to { transform: translate3d(var(--end-x), var(--end-y), 0); }
    }
    
    /* 최적화된 회전 애니메이션 */
    @keyframes spin-opt {
        0% { transform: rotate3d(0, 0, 0, 0deg); }
        100% { transform: rotate3d(1, 1, 1, 360deg); }
    }
</style>
`;
$('head').append(styles);

// 벚꽃 영역 선택
var $wrap = $('.cherry_blossom');

// 2. 벚꽃 잎 템플릿 (미리 생성)
const $petalTemplate = $('<div class="petal-layer"><span class="petal-shape"></span></div>');

const petalGen = () => {
    // 재귀 호출 (setTimeout 사용)
    setTimeout(() => requestAnimationFrame(petalGen), defaults.newOn);

    // 영역 크기 실시간 계산 (반응형 대응)
    const wrapW = $wrap.width();
    const wrapH = $wrap.height();

    const $el = $petalTemplate.clone();
    const $inner = $el.find('.petal-shape');
    
    // 랜덤 값 설정
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5;
    
    // 끝나는 위치 계산
    const endY = wrapH + 50; 
    const endX = (Math.random() * 2 - 1) * 150; // 좌우 흔들림 폭
    
    const spinTime = 2 + Math.random() * 3; 

    // CSS 변수로 위치 전달 (JS가 매 프레임 위치를 계산하지 않도록 함)
    $el.css({
        width: size,
        height: size,
        left: startLeft,
        '--end-x': `${endX}px`,
        '--end-y': `${endY}px`,
        animation: `fall-opt ${fallTime}s linear forwards`
    });

    $inner.css({
        animation: `spin-opt ${spinTime}s linear infinite`
    });

    // 애니메이션 끝나면 제거
    $el.on('animationend', (e) => {
        if (e.originalEvent.animationName.includes('fall-opt')) {
            $el.remove();
        }
    }).appendTo($wrap);
};

// 시작
$(window).on('load', () => {
    // 벚꽃 영역에 relative가 없으면 위치가 어긋날 수 있어 체크하지만, 강제로 바꾸진 않음
    // 만약 벚꽃이 엉뚱한데서 떨어지면 CSS 파일에서 .cherry_blossom { position: relative; } 를 추가하세요.
    requestAnimationFrame(petalGen);
});
