// DOM grabbers
const body = document.querySelector('body');
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

// fetch-related variables
const listingURL =
	'https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/listings/active?&fields=listing_id,title,url&includes=MainImage&api_key=svhon2zu78866rwwekz6u9v5';

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetchData(listingURL)
	.then(data => etsyHTML(data.results));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function fetchData(url) {
	return fetch(url)
		.then(checkStatus)
		.then((response) => response.json())
		.catch((error) => console.log('Fetch error: ', error));
}

function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function etsyHTML(data) {
  let list = `<ul class=etsy-list>`;
  data.map(result => {
    console.log(result.title);
  })
}

//Nav button
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

// Lightbox for Pawpaw Corner gallery.

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('.pic');
images.forEach((image) => {
	image.addEventListener('click', (e) => {
		lightbox.classList.add('active');
		const img = document.createElement('img');
		img.src = image.src;
		while (lightbox.firstChild) {
			lightbox.removeChild(lightbox.firstChild);
		}
		lightbox.appendChild(img);
	});
});

lightbox.addEventListener('click', (e) => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove('active');
});
