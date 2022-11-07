// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.getElementById('datetime-picker');
const btnRef = document.querySelector('[data-start]');
btnRef.disabled = true;
let futureTime = null;
let intervalId = null;
let deltaTime = 0;

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnRef.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(intervalId);

    futureTime = selectedDates[0];
    deltaTime = futureTime.getTime() - Date.now();
    if (deltaTime > 0) {
      btnRef.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnRef.disabled = true;
    }
    cleanForStarting();
  },
};

flatpickr(inputRef, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartTimer() {
  Notiflix.Notify.success('Date is correct! Timer starts!');
  btnRef.disabled = true;

  intervalId = setInterval(() => {
    deltaTime = futureTime.getTime() - Date.now();
    if (deltaTime < 1000) {
      Notiflix.Notify.info('Time is over!');
      clearInterval(intervalId);
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    secondsRef.textContent = seconds;
    minutesRef.textContent = minutes;
    hoursRef.textContent = hours;
    daysRef.textContent = days;
  }, 1000);
}

function cleanForStarting() {
  secondsRef.textContent = '00';
  minutesRef.textContent = '00';
  hoursRef.textContent = '00';
  daysRef.textContent = '00';
}
