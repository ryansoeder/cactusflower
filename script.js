// fetch-related variables
let listingURL = '';
let sectionsURL = '';


	listingURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/listings/active?&fields=listing_id,title,url&includes=MainImage,Section&limit=999&api_key=${API_SECRET}`;
	sectionsURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/sections?&api_key=${API_SECRET}`;

	// ------------------------------------------
	//  FETCH FUNCTIONS
	// ------------------------------------------

	Promise.all([fetchData(listingURL), fetchData(sectionsURL)]).then((data) => {
		const listings = data[0].results;
		const sections = data[1].results;

		etsyHTML(listings);
		populateDropdown(sections);
	});


// DOM grabbers
const body = document.querySelector('body');
const main = document.querySelector('main');
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
const etsyDiv = document.querySelector('#etsy');
const dropdownOptions = document.querySelector('#dropdownOptions');

// ------------------------------------------
//  FETCH HELPER FUNCTIONS
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
	let list = `<ul id="etsy-list">`;
	data.forEach((result) => {
		list += `
		<li class="etsy-list-item">
			<a href=${result.url} target="_blank"s>
				<img src=${result.MainImage.url_170x135} alt="etsy item"><br>
				<span>${result.title}</span>
			</a>
		</li>
		`;
	});
	list += `</ul>`;
	etsyDiv.innerHTML = list;
}

function populateDropdown(data) {
	let options = `<option value="Every Damn Thing">Every Damn Thing</option>`;
	data.forEach((section) => {
		options += `
		<option value="${section.title}">${section.title} <span>(${section.active_listing_count})</span></option>
		`;
	});

	dropdownOptions.innerHTML = options;
}

async function deepSearch() {
	let searchList = `<ul id="etsy-list">`;

	const data = await fetchData(listingURL);
	data.results.forEach((result) => {
		// console.log(result.Section);
		if (result.Section && dropdownOptions.value === result.Section.title) {
			// console.log(result.Section);
			searchList += `
			<li class="etsy-list-item">
				<a href=${result.url} target="_blank"s>
					<img src=${result.MainImage.url_170x135} alt="etsy item"><br>
					<span>${result.title}</span>
				</a>
			</li>
			`;
		}
	});
	searchList += `</ul>`;
	etsyDiv.innerHTML = searchList;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

dropdownOptions.addEventListener('change', deepSearch);

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
