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
}
