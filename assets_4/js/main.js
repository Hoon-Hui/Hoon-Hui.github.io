/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			blockPC();
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();


})(jQuery);

function blockPC() {
    // 1. User Agent 체크
    const ua = navigator.userAgent;
    const isMobileUA = /iPhone|iPad|iPod|Android/i.test(ua);

    // 2. 터치 이벤트 지원 여부 (PC는 일반적으로 false)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 3. 화면 크기 및 방향 (모바일은 대개 가로보다 세로가 길거나 특정 해상도 이하)
    const isSmallScreen = window.innerWidth <= 1024; 

    // PC라고 판단되는 조건 (모바일 UA가 아니거나 터치를 지원하지 않을 때)
    if (!isMobileUA || !hasTouch) {
        alert("알림: 모바일 기기에서만 접속 가능합니다. 양해 부탁드립니다.");
        
        // 연결 실패 화면으로 즉시 교체
        document.documentElement.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100vh; flex-direction:column;">
                <h1 style="color:Gray;">Access Denied</h1>
                <p>PC 접속이 감지되어 연결이 차단되었습니다.</p>
				<p>모바일 환경에서 접속 부탁 드립니다.</p>
				<p>감사합니다.</p>
                <button onclick="location.reload()">다시 시도</button>
            </div>
        `;
        throw new Error("PC Access Blocked"); // 이후 스크립트 실행 중단
    }
};
