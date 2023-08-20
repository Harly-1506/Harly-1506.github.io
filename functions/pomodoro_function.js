let urlParams = new URLSearchParams(window.location.search);
let focus = parseInt(urlParams.get('focus')) * 60;
let breakTime = parseInt(urlParams.get('break')) * 60;
let reps = parseInt(urlParams.get('reps'));
let color = decodeURIComponent(urlParams.get('color'));
let timerFont = urlParams.get('timerFont');
let sessionFont = urlParams.get('sessionFont');
let alignment = urlParams.get('alignment');

let container = document.getElementById('container');
container.style.color = color;
container.style.textAlign = alignment;
container.children[0].style.fontFamily = sessionFont;
container.children[1].style.fontFamily = timerFont;

let label = document.getElementById('label');
let timer = document.getElementById('timer');
let end_focus_sound = new Audio('sounds/end_focus_sound.mp3');
let end_break_sound = new Audio('sounds/end_break_sound.mp3');

let timeLeft = focus;
let intervalId;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timeLeft--;
  if (timeLeft < 0) {
    clearInterval(intervalId);
    if (label.innerHTML === 'Get ready') {
      label.innerHTML = 'Focus';
      end_focus_sound.play();
      setTimeout(function() {
      timeLeft = focus;
      intervalId = setInterval(updateTimer, 1000);},10000);
    } 
    else if (label.innerHTML === 'Focus') {
      reps--;
      if (reps > 0) {
        label.innerHTML = 'Break';
        end_focus_sound.play();
        setTimeout(function() {
        timeLeft = breakTime;
        intervalId = setInterval(updateTimer, 1000);},10000);
        // end_break_sound.play();
      } 
      else {
        label.innerHTML = 'Well';
        timer.innerHTML = 'DONE!';
      }
    } 
    else if (label.innerHTML === 'Break') {
      label.innerHTML = 'Focus';
      end_break_sound.play();
      setTimeout(function(){
      timeLeft = focus;
      intervalId = setInterval(updateTimer, 1000);},10000);
    }
  }
}

// timer.addEventListener('click', function() {
//   if (!intervalId) {
//     label.innerHTML = 'Get ready';
//     timeLeft = 10;
//     intervalId = setInterval(updateTimer, 1000);
//   }
// });

function startTimer() {
if (!intervalId) {
label.innerHTML = 'Get ready';
timeLeft = 10;
intervalId = setInterval(updateTimer, 1000);
}
}

startTimer()