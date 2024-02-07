const reels = Array.from(document.querySelectorAll(".reels"));
let intervalIds = [];
let altTextArray = [];
let chance = 5 ;
let stoppedCount = 0;

function rotateImages(ul) {
    const items = Array.from(ul.children);
    ul.appendChild(items.shift());
}
//you can change the speed of changing images here
function start() {
    chance--;
    intervalIds.forEach(clearInterval);
    intervalIds = reels.map((ul) => setInterval(() => rotateImages(ul), 1000));
}

function stop(index) {
    clearInterval(intervalIds[index]);
    const firstImageAlt = reels[index].querySelector("li:first-child img").alt;
    altTextArray.push(firstImageAlt);
    stoppedCount++;
    if(chance == 0){
        alert("Game over 😥 ")
        //TODO: the start butten shouldent work anymore id user click on it
    }
    else if (stoppedCount === 3 && altTextArray.every(alt => alt === altTextArray[0])) {
        alert("😍🎇 All pictures Are the same!\nYour character is: " + altTextArray[0]);
        stoppedCount = 0;
        chance -- ;
    }
    else if (stoppedCount === 3 && (altTextArray[0] === altTextArray[1] ||
                                    altTextArray[0] === altTextArray[2] ||
                                    altTextArray[1] === altTextArray[2])){
             chance ++;
             alert("That Was close! 😲 \n You'll get a new chance \n"+ chance + "left");
        
    }
}

window.onload = function () {
    
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

