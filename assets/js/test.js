// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 12,
    minSize: 9,
    newOn: 300
};

// CSS 스타일 주입 (GPU 가속 및 애니메이션 정의)
// JS 루프 대신 CSS Keyframes를 사용하여 메인 스레드 부하를 0으로 만듭니다.
const styles = `
<style>
    .cherry_blossom {
        position: relative;
        overflow: hidden; /* 영역 밖 잎 숨김 */
        perspective: 1000px; /* 3D 효과 강화 */
    }
    .petal-container {
        position: absolute;
        top: -20px;
        will-change: transform; /* 브라우저에게 GPU 사용 힌트 제공 */
        pointer-events: none; /* 마우스 이벤트 무시 (성능 향상) */
    }
    .petal-inner {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #ffc0cb; /* 벚꽃색 (필요시 이미지로 변경) */
        border-radius: 50% 0 50% 0; /* 벚꽃잎 모양 */
        will-change: transform;
    }
    
    /* 떨어지며 좌우로 이동하는 애니메이션 */
    @keyframes fall-drift {
        to {
            transform: translate3d(var(--end-x), 100vh, 0);
        }
    }
    
    /* 3D 회전 및 흔들림 애니메이션 (기존의 sway + spin 통합) */
    @keyframes tumble {
        0% { transform: rotate3d(1, 1, 1, 0deg); }
        25% { transform: rotate3d(1, 0, 0, 90deg); }
        50% { transform: rotate3d(0, 1, 0, 180deg); }
        75% { transform: rotate3d(0, 0, 1, 270deg); }
        100% { transform: rotate3d(1, 1, 0, 360deg); }
    }
</style>
`;
$('head').append(styles);

// 벚꽃 영역 및 변수 캐싱
var $wrap = $('.cherry_blossom');
let wrapW = $wrap.width();

// 벚꽃 잎 구조 (부모: 이동 담당, 자식: 회전 담당)
// transform 충돌을 방지하기 위해 구조를 분리함
const $petalTemplate = $('<div class="petal-container"><span class="petal-inner"></span></div>');

// 벚꽃 잎 생성 함수
const petalGen = () => {
    // 다음 생성 예약 (재귀 호출)
    setTimeout(() => requestAnimationFrame(petalGen), defaults.newOn);

    const $el = $petalTemplate.clone();
    const $inner = $el.find('.petal-inner');
    
    // 랜덤 속성 계산
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startLeft = Math.random() * wrapW;
    const fallTime = 5 + Math.random() * 5; // 떨어지는 시간
    
    // 드리프트(좌우 이동) 거리 계산 (기존 로직의 누적값을 미리 계산)
    // 기존: 매 프레임 offset 더함 -> 최적화: 총 이동 거리 한번에 계산
    // 60fps 기준, fallTime 동안 이동할 총 거리 근사치
    const driftTotal = (Math.random() * 2 - 1) * 60 * fallTime; 
    
    // 회전 애니메이션 속도 랜덤화
    const spinTime = 2 + Math.random() * 3; 

    // CSS 변수 및 스타일 적용
    $el.css({
        width: size,
        height: size,
        left: startLeft,
        '--end-x': `${driftTotal}px`, // CSS 변수로 전달
        animation: `fall-drift ${fallTime}s linear forwards`
    });

    $inner.css({
        animation: `tumble ${spinTime}s linear infinite`
    });

    // 애니메이션 종료 후 제거 (메모리 누수 방지)
    // animationend 이벤트는 CSS 애니메이션이 끝날 때 발생
    $el.on('animationend', (e) => {
        if (e.originalEvent.animationName.includes('fall-drift')) {
            $el.remove();
        }
    }).appendTo($wrap);
};

// 창 크기 변경 대응
$(window).resize(() => {
    wrapW = $wrap.width();
});

// 실행
$(window).on('load', () => {
    // 잎 스타일이 없다면 기본 스타일 추가 (이미지라면 background-image 사용)
    // 기존 코드에 .petal 스타일 정의가 없어 위 CSS에 배경색을 추가했습니다.
    requestAnimationFrame(petalGen);
});
