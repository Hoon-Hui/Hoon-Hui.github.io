document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("myAudio");
    const gifMusic = document.getElementById("gifMusic");
    const pngMusic = document.getElementById("pngMusic");

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
            audio.play();
        } else {
            audio.pause();
        }
    };

    audio.addEventListener("play", updateIcon);
    audio.addEventListener("pause", updateIcon);

    updateIcon();
});
