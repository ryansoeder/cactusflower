require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening @ ${port}`));
app.use(express.static('./'));
app.use(express.json({limit: '1mb'}));

app.get('/listings', async (request, response) => {
    const listingURL = `https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/listings/active?&fields=listing_id,title,url&includes=MainImage,Section&limit=999&api_key=${process.env.API_KEY}`;
    const fetch_response = await fetch(listingURL);
    const json = await fetch_response.json();
    response.json(json);
});

app.get('/sections', async (request, response) => {  
    const sectionsURL = `https://openapi.etsy.com/v2/shops/CactusFlowerOutpost/sections?&api_key=${process.env.API_KEY}`;
    const fetch_response = await fetch(sectionsURL);
    const json = await fetch_response.json();
    response.json(json);
});


