const container = document.querySelector('.logo');
const image = document.getElementById('logo__img');
let rotationAngle = 0;

function rotateImage() {

  rotationAngle += 0.5;

  image.style.transform = `rotate(${rotationAngle}deg)`;

  requestAnimationFrame(rotateImage);
}

rotateImage();


document.addEventListener('DOMContentLoaded', function () {
	const messages = document.querySelectorAll('.chat__message__container')
	let delay = 0

	messages.forEach(message => {
		setTimeout(() => {
			message.classList.add('animate-message')
		}, delay)
		delay += 130
  })
})

document.addEventListener('DOMContentLoaded', function () {
	const progressTabs = document.querySelectorAll('.progress__tab')

	progressTabs.forEach((tab, index) => {
    if(index < 3){
      tab.style.animationDelay = `${index * 0.3}s`;
      tab.classList.add("yellow");
    }
	})
})

function animateMoney(target, start, end, duration) {
	const element = document.getElementById(target);
    const range = end - start;
    const increment = range > 0 ? 1 : -1;
    const stepValue = Math.abs(Math.ceil(range / duration)); 
    let current = start;

    const timer = setInterval(function() {
        current += increment * stepValue;
        element.innerHTML = current.toLocaleString();

        if ((increment === 1 && current >= end) || (increment === -1 && current <= end)) {
            clearInterval(timer);
            element.innerHTML = end.toLocaleString();
        }
    }, 10); 

    if (duration < 10) {
        element.innerHTML = end.toLocaleString();
    }
}



window.onload = function() {
	animateMoney("moneyCounter", 0, 10300205, 100);
}