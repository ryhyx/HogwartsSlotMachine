
let ScreenSlot = document.getElementById("ScreenSlot");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let threeD_Btn = document.getElementsByClassName("threeD_Btn"); //stopbtn
let StartBtn = document.getElementById("StartBtn");
let sec = 100; //speed of reel(per second)
let stopReelFlag = [];//slot reel stop flag 
let reelCounts = []; //which image to position 
let slotFrameheight; //frame size
let slotReelsHeight; //overall reel (image) size
let slotReelitemHeight;//size of one reel (image) 
let slotReelStartheight;//initial image value

//مقدار دهی اولیه
let slot = {

    init: function () {

        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },
    //click event
    start: function () {

        slot.init();
        for (let index = 0; index < 3; index++) {
            slot.animation(index);
        }
    },
    // stop buuton click event 
    stop: function (i) {
        stopReelFlag[i] = true;
        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
            StartBtn.removeAttribute("disabled");
        }
    },
    // set first position
    resetLocationInfo: function () {
        slotFrameheight = ScreenSlot.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelitemHeight = reel[0].offsetHeight;
        slotReelStartheight = -slotReelsHeight;
        slotReelStartheight += slotFrameheight - (slotFrameheight / 2) + slotReelitemHeight * 3 / 2;

        for (let i = 0; i < reels > length; i++) {
            reels[i].style.top = slotReelStartheight + "px";
        }
    },
    //move the slot
    animation: function (index) {

        if (reelCounts[index] >= 6) {
            reelCounts[index] = 0;
        }
        $(".reels").eq(index).animate({
            "top": slotReelStartheight + (reelCounts[index] * slotReelitemHeight)
        }, {
            duration: sec,
            easing: "linear",
            complete: function () {
                if (stopReelFlag[index]) {
                    return;
                }
                reelCounts[index]++;
                slot.animation(index);
            }
        });
    },

};

window.onload = function () {
    slot.init();
    slot.resetLocationInfo();
    StartBtn.addEventListener("click", function (e) {
        e.target.setAttribute("disabled", true);
        slot.start();
        for (let i = 0; i < threeD_Btn.length; i++) {
            threeD_Btn[i].removeAttribute("disabled");
        }
    });

    for (let i = 0; i < threeD_Btn.length; i++) {
        threeD_Btn[i].addEventListener("click", function (e) {
            slot.stop(e.target.getAttribute("data-val"));
        });
    }
};
