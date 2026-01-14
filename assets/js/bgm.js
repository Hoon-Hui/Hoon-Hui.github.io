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

window.addEventListener('pageshow', function(event) {
    const audio = document.getElementById("myAudio");
    const gif = document.getElementById("gifMusic");
    const png = document.getElementById("pngMusic");

    // BFCache에서 복원되거나 세션 스토리지에 켜져 있는 경우
    if (event.persisted || sessionStorage.getItem('music') === 'on') {
        audio.play().catch(()=>{}); // 자동재생 정책 대응
        gif.style.display = "block";
        png.style.display = "none";
        sessionStorage.setItem('music','on');
    }
});

/*
				function showToast() {
					var toast = document.getElementById("toast");
					toast.classList.add("show");
			
					setTimeout(() => {
						toast.classList.remove("show");
					}, 3000);
				}
				
				window.addEventListener("load", showToast);
*/
