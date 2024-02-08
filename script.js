const reels = Array.from(document.querySelectorAll(".reels"));
let intervalIds = [];
let altTextArray = [];
let chance = 5;
let stoppedCount = 0;

function rotateImages(ul) {
  const items = Array.from(ul.children);
  ul.appendChild(items.shift());
}
//you can change the speed of changing images here
function start() {
  intervalIds.forEach(clearInterval);
  intervalIds = reels.map((ul) => setInterval(() => rotateImages(ul), 1000));
  altTextArray = [];
}

function stop(index) {
  clearInterval(intervalIds[index]);
  const firstImageAlt = reels[index].querySelector("li:first-child img").alt;
  altTextArray.push(firstImageAlt);
  stoppedCount++;
  
  if (chance <= 0) {
    alert("Game over 😥 ");
    //TODO: the start butten shouldent work anymore id user click on it
  } else if (
    stoppedCount === 3 &&
    altTextArray.every((alt) => alt === altTextArray[0])
  ) {
    alert(
      "😍🎇 All pictures Are the same!\nYour character is: " + altTextArray[0]
    );
    stoppedCount = 0;
    chance++;
    altTextArray = [];
  } else if (
    stoppedCount === 3 &&
    (altTextArray[0] === altTextArray[1] ||
      altTextArray[0] === altTextArray[2] ||
      altTextArray[1] === altTextArray[2])
  ) {
    chance--;
    stoppedCount = 0;
    alert("That Was close! 😲 \n You'll get a new chance \n" + chance + "left");
  }
//this feature should add too, it have bug
//  else if(stoppedCount ===3){
//    alert("Nothing has match :( \n " +chance + "left")
//  }
}
