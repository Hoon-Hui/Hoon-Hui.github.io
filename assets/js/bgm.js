<script>
const BGM_SRC = "music.mp3";
const BGM_VOLUME = 0.3;

let bgm = new Audio(BGM_SRC);
bgm.loop = true;
bgm.volume = BGM_VOLUME;

// 재생 위치 저장
bgm.addEventListener("timeupdate", () => {
    localStorage.setItem("bgmTime", bgm.currentTime);
    localStorage.setItem("bgmPlaying", !bgm.paused);
});

// 페이지 로드 시 복구
window.addEventListener("load", () => {
    const savedTime = localStorage.getItem("bgmTime");
    const wasPlaying = localStorage.getItem("bgmPlaying") === "true";

    if (savedTime) bgm.currentTime = parseFloat(savedTime);

    // 최초 1회 사용자 클릭 필요
    document.body.addEventListener("click", () => {
        if (wasPlaying) bgm.play();
    }, { once: true });
});
</script>
