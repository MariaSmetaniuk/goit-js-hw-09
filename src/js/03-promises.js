import {Notify} from "notiflix";

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitBtnClick);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onSubmitBtnClick(e) {
  e.preventDefault();
  const { delay, step, amount } = refs.form.elements;

  for (let i = 0; i < amount.value; i++) {
    const currentDelay = Number(delay.value) + Number(step.value) * i;
    const position = i + 1;

    createPromise(position, currentDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}