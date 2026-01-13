/* function toggleMusic() {					
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

				function showToast() {
					var toast = document.getElementById("toast");
					toast.classList.add("show");
			
					setTimeout(() => {
						toast.classList.remove("show");
					}, 3000);
				}
				
				window.addEventListener("load", showToast);
*/

document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("myAudio");
    var gif = document.getElementById("gifMusic");
    var png = document.getElementById("pngMusic");

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // 1. 먼저 muted 상태로 autoplay 시도
    audio.play().catch(() => {});

    // 2. iOS 트릭: iframe/비디오 클릭 이벤트를 자동으로 트리거
    if (isIOS) {
        var btn = document.createElement("button");
        btn.style.position = "fixed";
        btn.style.left = "0";
        btn.style.top = "0";
        btn.style.width = "1px";
        btn.style.height = "1px";
        btn.style.opacity = "0";
        btn.style.zIndex = "-1";
        document.body.appendChild(btn);

        btn.addEventListener("click", function() {
            audio.muted = false; // 음소거 해제
            audio.play().then(() => {
                gif.style.display = "block";
                png.style.display = "none";
            }).catch(() => {
                console.log("iOS 자동재생 실패");
            });
            btn.remove();
        });

        // 강제로 클릭 이벤트 발생
        btn.click();
    }

    // 기존 toggleMusic 기능
    window.toggleMusic = function() {
        if (audio.paused) {
            audio.play();
            gif.style.display = "block";
            png.style.display = "none";
        } else {
            audio.pause();
            gif.style.display = "none";
            png.style.display = "block";
        }
    }
});
