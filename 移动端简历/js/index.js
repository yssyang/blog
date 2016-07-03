

//->解决click的300ms延迟
FastClick.attach(document.body);

//->动态计算REM的值
~function () {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / 640 * 100 + "px";
}();

//->初始化Swiper
new Swiper(".swiper-container", {
    loop: true,
    direction: "vertical",
    onSlidePrevEnd: changeEnd,
    onSlideNextEnd: changeEnd
});

function changeEnd(swiper) {
    var n = swiper.activeIndex,
        slideAry = swiper.slides;//->获取当前所有的活动块(获取的结果是一个数组)
    [].forEach.call(slideAry, function (slide, index) {
        if (n === index) {


             if(n==0){
                //slide.id = "page"+slideAry.length-2;
                 slide.id = "page5";
                console.log(n,slideAry.length,slideAry.length-2)

            }
            else if(n==slideAry.length-1){
                slide.id = "page1";
                console.log(n,slideAry.length)

            }
            else{
                slide.id = "page"+n;
                console.log(n,slideAry.length)

            }
            return;

        }
        slide.id = null;
    });
}

//->音频的自动播放
var music = document.getElementById("music"),
    musicAudio = document.getElementById("musicAudio");
window.setTimeout(function () {
    musicAudio.play();
    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
        music.className = "music move";
    }, false);
}, 1000);
music.addEventListener("click", function () {

    if (musicAudio.paused) {
        musicAudio.play();
        music.className = "music move";
        return;
    }
    //->当前是播放状态我让其暂停
    musicAudio.pause();
    music.className = "music";
}, false);