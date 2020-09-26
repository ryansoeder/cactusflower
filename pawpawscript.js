const body = document.querySelector('body');
const main = document.querySelector('main');
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');


// ------------------------------------------
//  NAV BUTTON
// ------------------------------------------

let menuOpen = false;

menuBtn.addEventListener('click', (event) => {
	if (!menuOpen) {
		menuBtn.classList.add('open');
		menu.classList.add('open');

		menuOpen = true;

		event.stopPropagation();
	} else {
		menuBtn.classList.remove('open');
		menu.classList.remove('open');

		menuOpen = false;

		event.stopPropagation();
	}
});

// close nav menu after clicking anything

body.addEventListener('click', (event) => {
	if (menuOpen) {
		menu.classList.remove('open');
		menuBtn.classList.remove('open');

		menuOpen = false;
	}
});

// ------------------------------------------
//  PAWPAW CORNER LIGHTBOX
// ------------------------------------------

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('.pic');
images.forEach((image) => {
	image.addEventListener('click', (event) => {
		lightbox.classList.add('active');
		const img = document.createElement('img');
		img.src = image.src;
		while (lightbox.firstChild) {
			lightbox.removeChild(lightbox.firstChild);
		}
		lightbox.appendChild(img);
	});
});

lightbox.addEventListener('click', (event) => {
	if (event.target !== event.currentTarget) return;
	lightbox.classList.remove('active');
});
