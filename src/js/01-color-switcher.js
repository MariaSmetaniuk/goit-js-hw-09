const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBodyBgColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function onStartBtnClick() {
    refs.startBtn.setAttribute('disabled', 'true');
    refs.stopBtn.removeAttribute('disabled');

    timerId = setInterval(changeBodyBgColor, 1000);
};

function onStopBtnClick() {
    refs.stopBtn.setAttribute('disabled', 'true');
    refs.startBtn.removeAttribute('disabled');

    clearInterval(timerId);
}