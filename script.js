// DOM grabbers
const body = document.querySelector('body');
const main = document.querySelector('main');
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
const etsyDiv = document.querySelector('#etsy');
const dropdownOptions = document.querySelector('#dropdownOptions');

// fetch-related variables
// const listingURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/listings/active?&fields=listing_id,title,url&includes=MainImage,Section&limit=999&api_key=rlk6rfoz714vea6dl8j63eqt`;
// const sectionsURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/sections?&api_key=rlk6rfoz714vea6dl8j63eqt`;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetchData('/listings')
.then(json => etsyHTML(json.results))

fetchData('/sections')
.then(json => populateDropdown(json.results))

// Promise.all([fetchData('/listings'), fetchData('/sections')])
// .then((data) => {
// 	const listings = data[0].results;
// 	const sections = data[1].results;
// 	// console.log(listings);
// 	// console.log(sections);
// 	etsyHTML(listings);
// 	populateDropdown(sections);
// });

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

	const data = await fetchData('/listings');
	data.results.forEach((result) => {
		if (result.Section && dropdownOptions.value === result.Section.title) {
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