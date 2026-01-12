document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("myAudio");
    const gifMusic = document.getElementById("gifMusic");
    const pngMusic = document.getElementById("pngMusic");

    const STORAGE_TIME = "bgmTime";
    const STORAGE_STATE = "bgmPlaying";

    function updateIcon() {
        if (audio.paused) {
            gifMusic.style.display = "none";
            pngMusic.style.display = "block";
        } else {
            gifMusic.style.display = "block";
            pngMusic.style.display = "none";
        }
    }

    window.toggleMusic = function () {
        if (audio.paused) {
            fadeIn(audio, 0.25, 0.05);
            localStorage.setItem(STORAGE_STATE, "true");
        } else {
            audio.pause();
            localStorage.setItem(STORAGE_STATE, "false");
        }
    };

    // 재생 중일 때 현재 시간 저장
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem(STORAGE_TIME, audio.currentTime);
        }
    }, 1000);

    // 페이지 로드 시 복구
    const savedTime = localStorage.getItem(STORAGE_TIME);
    const wasPlaying = localStorage.getItem(STORAGE_STATE) === "true";

    if (savedTime) {
        audio.addEventListener("loadedmetadata", () => {
            audio.currentTime = parseFloat(savedTime);
        });
    }

    // 모바일/Chrome 정책: 사용자 터치 필요
    const resumeMusic = () => {
        if (wasPlaying) fadeIn(audio, 0.25, 0.05);
        updateIcon();
        document.removeEventListener("touchstart", resumeMusic);
        document.removeEventListener("click", resumeMusic);
    };

    document.addEventListener("touchstart", resumeMusic, { once: true });
    document.addEventListener("click", resumeMusic, { once: true });

    audio.addEventListener("play", updateIcon);
    audio.addEventListener("pause", updateIcon);

    updateIcon();

    // 페이드 인 함수
    function fadeIn(audioEl, targetVol = 0.25, step = 0.05, interval = 100) {
        audioEl.volume = 0;
        audioEl.play();
        let vol = 0;
        const fade = setInterval(() => {
            vol += step;
            if (vol >= targetVol) {
                vol = targetVol;
                clearInterval(fade);
            }
            audioEl.volume = vol;
        }, interval);
    }
});
