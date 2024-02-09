const reels = Array.from(document.querySelectorAll(".reels"));
let intervalIds = [];
let altTextArray = [];
let chance = 3 ;
let stoppedCount = 0;

function rotateImages(ul) {
    const items = Array.from(ul.children);
    ul.appendChild(items.shift());
}
//you can change the speed of changing images here
function start() {
    chance--;
    intervalIds.forEach(clearInterval);
    intervalIds = reels.map((ul) => setInterval(() => rotateImages(ul), 500));
}

function stop(index) {
    clearInterval(intervalIds[index]);
    const firstImageAlt = reels[index].querySelector("li:first-child img").alt;
    altTextArray.push(firstImageAlt);
    stoppedCount++;

     if (stoppedCount === 3) {
        stoppedCount = 0;
         if (altTextArray.every(alt => alt === altTextArray[0])) {
            alert("😍🎇 All pictures Are the same!\nYour character is: " + altTextArray[0]);
            StartBtn.disabled = true;
            StartBtn.textContent ="Refresh the game to play again!";
            StartBtn.style.color = "red";            
        } else if (altTextArray[0] === altTextArray[1] || altTextArray[0] === altTextArray[2] || altTextArray[1] === altTextArray[2]) {
            chance=chance+1;
            alert("That Was close! 😲 \n You'll get a new chance \n" +chance+ " left");
        }
        else if (chance<=0){
            alert("Game over 😥 ")
            StartBtn.disabled = true;
            StartBtn.textContent = "Disabled";
            StartBtn.style.color = "red";
        }
        else{
            alert(chance+ " left");
        }
       
        altTextArray = [];
    }


}