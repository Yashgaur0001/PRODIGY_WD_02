let timer;
let startTime;
let running = false;
let lapCounter = 1;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const lapTimesList = document.querySelector('.lap-times');

function startStopwatch() {
    
    if (!running) {
        if(timer!=null)
            {
                startTime=Date.now()-pausedtime;

            }
            else{
                startTime = Date.now();
            }
    timer = setInterval(updateDisplay, 1000);
    // startBtn.textContent = 'Resume';
    running = true;
  }

   else {
    clearInterval(timer);
    timer = null;
    startBtn.textContent = 'Start';;
    running = false;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(timer);
    // timer = null;
    pausedtime=Date.now()-startTime;
    startBtn.textContent = 'Start';
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(timer);
  timer = null;
  display.textContent = '00:00:00';
  startBtn.textContent = 'Start';
  running = false;
  lapCounter = 1;
  lapTimesList.innerHTML = '';
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  display.textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function lapStopwatch() {
  if (running) {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimesList.appendChild(lapItem);
    lapCounter++;
  }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
