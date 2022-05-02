const body = document.querySelector('body')
const timer = document.getElementById('stopwatch_time')
const startStop = document.getElementById('stopwatch_start-stop')
const pauseResume = document.getElementById('stopwatch_pause-resume')

let milliseconds = 0
let seconds = 0
let minutes = 0
let isStopwatchGoing = false
let isPaused = false
let intervalStopwatch

let test = 0

pauseResume.style.opacity = '35%'

const zeroPad = (num, places) => String(num).padStart(places, '0')

const drawTime = (milliseconds, seconds, minutes) => {
    timer.innerHTML = `
    ${zeroPad(minutes, 2)}:
    ${zeroPad(seconds, 2)}:
    ${zeroPad(milliseconds, 2)}
    `.replace(/\s/g,'')
}

const refreshTime = () => {
    milliseconds++
    if (seconds >= 59 && milliseconds >= 100) {
        milliseconds = 0
        seconds = -1
        seconds++
        minutes++
    } else if (milliseconds >= 100) {
        milliseconds = 0
        seconds++
    }
    drawTime(milliseconds, seconds, minutes)
}

const startStopAction = () => {
    if (!isStopwatchGoing) {
        isStopwatchGoing = true
        startStop.className = 'stop'
        startStop.innerHTML = 'Stop'
        startStop.style.color = 'white'
        pauseResume.style.opacity = '100%'
        intervalStopwatch = setInterval(refreshTime, 1000 / 100)
        pauseResume.addEventListener('click', pauseResumeAction)
    } else {
        isStopwatchGoing = false
        isPaused = false
        startStop.className = 'start'
        startStop.innerHTML = 'Start'
        startStop.style.color = '#0b0a35'
        pauseResume.className = 'pause'
        pauseResume.innerHTML = 'Pause'
        pauseResume.style.opacity = '35%'
        clearInterval(intervalStopwatch)
        milliseconds = 0
        seconds = 0
        minutes = 0
        drawTime(milliseconds, seconds, minutes)
        pauseResume.removeEventListener('click', pauseResumeAction)
    }
}

const pauseResumeAction = () => {
    if (!isPaused) {
        isPaused = true
        clearInterval(intervalStopwatch)
        pauseResume.className = 'resume'
        pauseResume.innerHTML = 'Resume'
    } else {
        isPaused = false
        intervalStopwatch = setInterval(refreshTime, 1000 / 100)
        pauseResume.className = 'pause'
        pauseResume.innerHTML = 'Pause'
    }
}

startStop.addEventListener('click', startStopAction)
