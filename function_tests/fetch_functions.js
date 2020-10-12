const fetch = require('node-fetch');

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
		return (response);
	} else {
		return (response.statusText);
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
	return list;
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

// export for testing
module.exports.fetchData = fetchData;
module.exports.checkStatus = checkStatus;
module.exports.etsyHTML = etsyHTML;
module.exports.checkStatus = checkStatus;
module.exports.populateDropdown = populateDropdown;
module.exports.checkStatus = checkStatus;
module.exports.deepSearch = deepSearch;