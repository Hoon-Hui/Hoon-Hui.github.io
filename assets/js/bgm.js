/*
function toggleMusic() {					
	var audio = document.getElementById("myAudio");
	var gif = document.getElementById("gifMusic");
	var png = document.getElementById("pngMusic");
	
	if (audio.paused) {
		audio.play();
		gif.style.display = "block";  // 움직이는 아이콘 보이기
		png.style.display = "none";   // 멈춘 아이콘 숨기기
	} else {
		audio.pause();
		gif.style.display = "none";   // 움직이는 아이콘 숨기기
		png.style.display = "block";  // 멈춘 아이콘 보이기
	}
};
*/
// bgm.js

// 음악 토글 함수
function toggleMusic() {					
    const audio = document.getElementById("myAudio");
    const gif = document.getElementById("gifMusic");
    const png = document.getElementById("pngMusic");
    
    if (audio.paused) {
        audio.play().catch(()=>{}); // 자동재생 정책 대응
        gif.style.display = "block";  
        png.style.display = "none";   
        sessionStorage.setItem('music','on'); // 상태 저장
    } else {
        audio.pause();
        gif.style.display = "none";   
        png.style.display = "block";  
        sessionStorage.setItem('music','off'); // 상태 저장
    }
};

// 페이지 복원 시 상태 복원
window.addEventListener('pageshow', function(event) {
    const audio = document.getElementById("myAudio");
    const gif = document.getElementById("gifMusic");
    const png = document.getElementById("pngMusic");

    const musicState = sessionStorage.getItem('music');

    if (musicState === 'on') {
        if (audio.paused) audio.play().catch(()=>{}); // 자동재생 정책 대응
        gif.style.display = "block";
        png.style.display = "none";
    } else if (musicState === 'off') {
        if (!audio.paused) audio.pause();
        gif.style.display = "none";
        png.style.display = "block";
    } else {
        // 기본 상태: 멈춤
        gif.style.display = "none";
        png.style.display = "block";
    }
});
