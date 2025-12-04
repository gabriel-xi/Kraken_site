

document.addEventListener("DOMContentLoaded", () => {
    const backgrounds = [
        "img/carosello/banner1.png",
        "img/carosello/banner2.jpg",
        "img/carosello/banner3.jpg",
       // "img/carosello/immagine1.jpg",
       // "img/carosello/immagine2.jpg",
       // "img/carosello/immagine3.jpg",
       // "img/carosello/immagine4.jpg",
       // "img/carosello/immagine5.jpg",
       // "img/carosello/immagine6.jpg"
    ];

    const bgCurrent = document.querySelector(".body-bg");
    const bgNext = document.querySelector(".body-bg-next");

    let index = Math.floor(Math.random() * backgrounds.length);

    function fadeToNextBackground() {

        const nextIndex = (index + 1) % backgrounds.length;


        bgNext.style.backgroundImage = `url(${backgrounds[nextIndex]})`;


        bgNext.style.opacity = 1;


        setTimeout(() => {
            bgCurrent.style.backgroundImage = `url(${backgrounds[nextIndex]})`;
            bgNext.style.opacity = 0;
            index = nextIndex;
        }, 1500); 
    }


    bgCurrent.style.backgroundImage = `url(${backgrounds[index]})`;


    setInterval(fadeToNextBackground, 6000);
});


document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.menu-item');
    const slides = document.querySelectorAll('.hero-slide');
    const heroText = document.getElementById('heroText');


    document.querySelector('.menu-item[data-slide="1"]').classList.add('active');
    document.querySelector('.slide-1').classList.add('active');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const slide = item.dataset.slide;

            // Cambia attivo menu
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Cambia slide immagini
            slides.forEach(s => s.classList.remove('active'));
            document.querySelector(`.slide-${slide}`).classList.add('active');

            // Cambia posizione del testo (sx, centro, dx)
            heroText.classList.remove('left', 'center', 'right');
            if (slide == 1) heroText.classList.add('left');
            if (slide == 2) heroText.classList.add('center');
            if( slide == 3) heroText.classList.add('center');
            if (slide == 4) heroText.classList.add('right');

            /* -----------------------------
               ANIMAZIONE USCITA
            ------------------------------*/
            heroText.classList.remove('enter', 'enter-active');
            heroText.classList.add('exit');

            setTimeout(() => {
                heroText.classList.add('exit-active');
            }, 20);

            /* -----------------------------
               CAMBIO TESTO DOPO USCITA
            ------------------------------*/
            setTimeout(() => {
                heroText.classList.remove('exit', 'exit-active');

                // Cambia contenuto del testo
                if (slide == 1) heroText.innerHTML = `
                    <h1 style="font-weight:800; margin-bottom:20px;">
                        <span style="color:#ff5f2e;">Kraken</span>Restaurant
                    </h1>
                    <h2 style="margin-bottom:20px;">All You Can <span style="color:#ff5f2e;">EAT</span> cucina Italiana</h2>
                    <p>All you can eat di cucina italiana</p>
                    <p>Menù pranzo 10€</p>
                    <button class="hero-btn" onclick="window.location.href='contatti.html'">Vai ai Menù</button>
                `;

                if (slide == 2) heroText.innerHTML = `
                    <h1 style="font-weight:800; margin-bottom:20px;">
                        <span style="color:#ff5f2e;">Kraken</span>Restaurant
                    </h1>
                    <h2>Vuoi sapere un po' di noi?</h2>
                    <button class="hero-btn" onclick="window.location.href='chi_siamo.html'">Chi siamo</button>
                `;

                if (slide == 3) heroText.innerHTML = `
                    <h1 style="font-weight:800; margin-bottom:20px;">
                        <span style="color:#ff5f2e;">Kraken</span>Restaurant
                    </h1>
                    <h2> Kraken Restaurant Beinasco offre ai clienti una sala e una saletta accoglienti completamente ristrutturate  </h2>
                    <h3> per ogni vostra esigenza.</h3>
                    <button class="hero-btn" onclick="window.location.href='info_sales.html'">Info</button>
                `;

                if (slide == 4) heroText.innerHTML = `
                    <h1 style="font-weight:800; margin-bottom:20px;">
                        <span style="color:#ff5f2e;">Kraken</span>Restaurant
                    </h1>
                    <h2> Il nostro ristorante </h2>
                    <h3> I nostri piatti </h3>
                    <button class="hero-btn" onclick="window.location.href='gallery.html'">Dai un'occhiata</button>
                `;
                
                /* -----------------------------
                   ANIMAZIONE ENTRATA
                ------------------------------*/
                heroText.classList.add('enter');
                setTimeout(() => {
                    heroText.classList.add('enter-active');
                }, 20);

            }, 400); // tempo uscita
        });
    });
});

window.addEventListener("scroll", () => {
    const footer = document.querySelector(".footer");

    if (window.scrollY > 100) {
        footer.classList.add("visible");
    } else {
        footer.classList.remove("visible");
    }
});


/* Gabriele Ciadamdiaro */
/* >^..^< */