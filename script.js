// Lightbox for Pawpaw Corner gallery. Notes for learning purposes.

const lightbox = document.createElement('div'); // creates a div element and stores it in lightbox variable
lightbox.id = 'lightbox'; // gives that div an id of '#lightbox'
document.body.appendChild(lightbox); // attaches that div to the body tag in the html

const images = document.querySelectorAll('.pic') // stores all images with class="pic" in 'images' variable
images.forEach(image => { // for every image on the page...
    image.addEventListener('click', e => { // listen for it to be clicked on and...
        lightbox.classList.add('active'); // change the class to 'actice' (see CSS)
        const img = document.createElement('img'); // create in img element and store it in 'img' variable
        img.src = image.src; // make the new image the same as the one on the page
        while(lightbox.firstChild){ // if #lightbox has anything in it (children)...
            lightbox.removeChild(lightbox.firstChild); // remove it before placing anything else in #lightbox
        }
        lightbox.appendChild(img); // put the new image (same origin as original) into #lightbox
    })
});

lightbox.addEventListener('click', e => { // when you click on #lightbox when is active on the web page...
    if (e.target !== e.currentTarget) return; // and you're not clicking on the picture you clicked to make #lightbox active in the first place...
    lightbox.classList.remove('active'); // turn off .active state [(close #lightbox) see CSS]
});


// NAV MENU BUTTON

const body = document.querySelector('body');
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
let menuOpen = false;

menuBtn.addEventListener('click', event => {

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

// close after clicking anything

body.addEventListener('click', event => { 

    if (menuOpen) {
        menu.classList.remove('open');
        menuBtn.classList.remove('open');
        
        menuOpen = false;
    }
});
