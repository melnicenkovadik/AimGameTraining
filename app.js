const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0;

let time = 0
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up')
})


timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')

        startGame()
    }
    board.addEventListener('click', (boardrEvent) => {
        if (boardrEvent.target.classList.contains('circle')) {
            score++
            boardrEvent.target.remove()
            createRandomCircle()
        }
    })
})

const startGame = () => {
    setInterval(decTime, 1000)
    createRandomCircle()
    setTime(time)

}

function finishGame() {
    timeEl.parentNode.classList.add('hide')

    board.innerHTML = `<h1>Счет:   <span class="primary">${score}</span>`
    setTimeout(()=>{
        window.location.reload()
    },2000)
}

const decTime = () => {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(time) {
    timeEl.innerHTML = `00:${time}`

}

function createRandomCircle() {

    const circle = document.createElement('div')
    const {width, height} = board.getBoundingClientRect()
    const size = getRandomNumber(10, 60)
    circle.classList.add('circle')
    circle.style.background = `linear-gradient(90deg, #000 0%, ${get_rand_color()} 50%,#000 100%)`;

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    board.append(circle)
}

function getRandomNumber(min,max) {
    return Math.floor(Math.round(Math.random() * (max - min) + min))
}

function get_rand_color() {
    let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}
