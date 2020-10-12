const expect = require('chai').expect;

describe('sanity', () => {
	it('should return true', () => {
		expect(true).to.equal(true);
	});
});

describe('fetchData', () => {
    const fetchData = require('../function_tests/fetch_functions').fetchData;

    it('should respond with a Promise object', () => {
        const url = 'https://foaas.com/operations';

        expect(fetchData(url)).to.be.a('promise');
    })
});

describe('etsyHTML', () => {
	const etsyHTML = require('../function_tests/fetch_functions').etsyHTML;

	it('should build a string', () => {
		const data = {
			results: [
                {
				url: 'resultUrl',
				MainImage: {
					url_170x135: 'imageUrl',
				},
				title: 'Title',
                },
                {
				url: 'resultUrl',
				MainImage: {
					url_170x135: 'imageUrl',
				},
				title: 'Title',
			    },
            ]
        };

        expect(etsyHTML(data.results)).to.be.a('string');
	});
});

describe('checkStatus', () => {
    const checkStatus = require('../function_tests/fetch_functions').checkStatus;
    
    it('should pass the response back if ok', () => {
        const response = {
            ok: true,
            statusText: "Red Leader standing by."
        };

        expect(checkStatus(response)).to.deep.equal(response);
    });

    it('should pass the statusText back if !ok', () => {
        const response = {
            ok: false,
            statusText: "Red Leader standing by."
        };

        expect(checkStatus(response)).to.equal('Red Leader standing by.');
    });
});