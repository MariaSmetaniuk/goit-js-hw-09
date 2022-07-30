import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let deadline = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const today = new Date();
        deadline = selectedDates[0];

        if (deadline <= today) {
            Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.removeAttribute('disabled');
        }
    },
};
flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStartBtnClick);


function onStartBtnClick() {
    refs.startBtn.setAttribute('disabled', 'true');
    timerId = setInterval(timer, 1000);
};

function timer() {
    const today = new Date();
    const delta = deadline - today;

    if (delta < 0) {
        clearInterval(timerId);
        return;
    };

    refs.seconds.textContent = convertMs(delta).seconds;
    refs.minutes.textContent = convertMs(delta).minutes;
    refs.hours.textContent = convertMs(delta).hours;
    refs.days.textContent = convertMs(delta).days;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};