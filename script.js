// DOM grabbers
const body = document.querySelector('body');
const main = document.querySelector('main');
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
const etsyDiv = document.querySelector('#etsy');
const dropdownOptions = document.querySelector('#dropdownOptions');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetchData('/listings')
.then(json => etsyHTML(json.results));

fetchData('/sections')
.then(json => populateDropdown(json.results));

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
	let options = `<option value="All Items">All Items</option>`;
	data.forEach((section) => {
		options += `
		<option value="${section.title}">${section.title} (${section.active_listing_count})</option>
		`;
	});

	dropdownOptions.innerHTML = options;
}

async function deepSearch() {
	let searchList = `<ul id="etsy-list">`;
	const data = await fetchData('/listings');

	if (dropdownOptions.value === "All Items") {
		etsyHTML(data.results);
	} else {
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
}

// export for testing
// module.exports.fetchData = fetchData;
// module.exports.checkStatus = checkStatus;
// module.exports.etsyHTML = etsyHTML;
// module.exports.checkStatus = checkStatus;
// module.exports.populateDropdown = populateDropdown;
// module.exports.checkStatus = checkStatus;
// module.exports.deepSearch = deepSearch;

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