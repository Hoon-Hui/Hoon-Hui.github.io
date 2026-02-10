$(window).on('load', function() {
    gallery();
});

function gallery() {
    let list = undefined;
    let thumbs = undefined;
    const slideNum = $('.gallery .list .swiper-slide').length; // 슬라이드 총 개수
    let slideInx = 0; // 현재 슬라이드 index
    let viewNum = 0;
    let loopChk = true;

    // 디바이스 체크
    let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
    sliderAct();

    $(window).on('resize', function() {
        const newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
        if (newWChk !== oldWChk) {
            oldWChk = newWChk;
            sliderAct();
        }
    });

    // 슬라이드 실행
    function sliderAct() {
        // 슬라이드 초기화
        [list, thumbs].forEach(item => item && item.destroy());

        // slidesPerView 옵션 설정
        viewNum = oldWChk === 'pc' ? 5 : 3;
        // loop 옵션 체크
        loopChk = slideNum > viewNum;

        // 갤러리 썸네일
        thumbs = new Swiper(".gallery .thumbs", {
            spaceBetween: 10,
            slidesPerView: viewNum,
            loopedSlides: viewNum,
            loop: loopChk,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        // 메인 슬라이드
        list = new Swiper(".gallery .list .inner", {
            initialSlide: slideInx,
            loopedSlides: viewNum,
            loop: loopChk,
            effect: "fade",
            navigation: {
                nextEl: ".gallery .btn_next",
                prevEl: ".gallery .btn_prev",
            },
            on: {
                activeIndexChange: function() {
                    slideInx = this.realIndex; // 현재 슬라이드 index 갱신
                }
            },
            thumbs: {
                swiper: thumbs,
            },
        });
    }
}
