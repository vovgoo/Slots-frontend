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
      tab.style.animationDelay = `${index * 0.5}s`;
      tab.classList.add("yellow");
    }
	})
})