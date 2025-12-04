document.addEventListener('DOMContentLoaded', () => {

    const sections = {
        speciali: [0, 1],
        ayce: [2, 3],
        settimana: [4, 5, 6, 7, 8, 9]
    };

    const menuData = [
        { src: '../img/menu/speciali/natale-2025.png', title: 'Pranzo di Natale 2025' },
        { src: '../img/menu/speciali/capodanno-2026.png', title: 'Capodanno 2026' },

        { src: '../img/menu/all-you-can-eat.png', title: 'All You Can Eat €19.90' },
        { src: '../img/menu/menu-pranzo-10.png', title: 'Pranzo da 10€' },

        { src: '../img/menu/settimana/menu-pranzo-lunedi.png', title: 'Menù pranzo Lunedì' },
        { src: '../img/menu/settimana/menu-pranzo-martedi.png', title: 'Menù pranzo Martedì' },
        { src: '../img/menu/settimana/menu-pranzo-mercoledi.png', title: 'Menù pranzo Mercoledì' },
        { src: '../img/menu/settimana/menu-pranzo-giovedi.png', title: 'Menù pranzo Giovedì' },
        { src: '../img/menu/settimana/menu-pranzo-venerdi.png', title: 'Menù pranzo Venerdì' },
        { src: '../img/menu/settimana/menu-pranzo-sabato.png', title: 'Menù pranzo Sabato' }
    ];

    const cards = document.querySelectorAll('.menu-card');
    const viewer = document.getElementById('menuViewer');
    const viewerImg = document.getElementById('menuViewerImage');
    const viewerTitle = document.getElementById('menuViewerTitle');
    const btnClose = document.getElementById('menuViewerClose');
    const btnPrev = document.getElementById('menuPrev');
    const btnNext = document.getElementById('menuNext');
    const backdrop = document.querySelector('.menu-viewer-backdrop');

    let currentIndex = 0;
    let currentSection = [];

    let startX = null;

    function getSectionFor(index) {
        if (sections.speciali.includes(index)) return sections.speciali;
        if (sections.ayce.includes(index)) return sections.ayce;
        return sections.settimana;
    }

    function animate(direction) {
        viewerImg.classList.remove("menu-slide-left", "menu-slide-right");
        void viewerImg.offsetWidth; // forza reflow
        viewerImg.classList.add(direction === "left" ? "menu-slide-left" : "menu-slide-right");
    }

    function openViewer(index) {
        currentIndex = index;
        currentSection = getSectionFor(index);

        const data = menuData[currentIndex];
        viewerImg.src = data.src;
        viewerTitle.textContent = data.title;

        viewer.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
        viewer.classList.remove('visible');
        document.body.style.overflow = '';
    }

    function showNext() {
        const pos = currentSection.indexOf(currentIndex);
        const nextPos = (pos + 1) % currentSection.length;

        currentIndex = currentSection[nextPos];
        animate("left"); // animazione L/R
        openViewer(currentIndex);
    }

    function showPrev() {
        const pos = currentSection.indexOf(currentIndex);
        const prevPos = (pos - 1 + currentSection.length) % currentSection.length;

        currentIndex = currentSection[prevPos];
        animate("right");
        openViewer(currentIndex);
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            openViewer(parseInt(card.dataset.index));
        });
    });

    btnClose.addEventListener('click', closeViewer);
    backdrop.addEventListener('click', closeViewer);

    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    // KEYBOARD
    document.addEventListener('keydown', e => {
        if (!viewer.classList.contains('visible')) return;
        if (e.key === 'Escape') closeViewer();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // -------------------------------
    // SWIPE MOBILE
    // -------------------------------

    viewer.addEventListener('touchstart', e => {
        if (e.touches.length === 1) startX = e.touches[0].clientX;
    });

    viewer.addEventListener('touchend', e => {
        if (startX === null) return;

        const endX = e.changedTouches[0].clientX;
        const delta = endX - startX;

        if (Math.abs(delta) > 50) {
            if (delta < 0) showNext();
            else showPrev();
        }

        startX = null;
    });

    // -------------------------------
    // PINCH TO ZOOM + DOUBLE TAP
    // -------------------------------

    let scale = 1;
    let lastTap = 0;

    viewerImg.addEventListener('touchmove', e => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            scale = Math.min(3, Math.max(1, dist / 200));
            viewerImg.style.transform = `scale(${scale})`;
        }
    });

    viewerImg.addEventListener('touchend', e => {
        const now = Date.now();

        if (now - lastTap < 250) {
            scale = scale > 1 ? 1 : 2;
            viewerImg.style.transform = `scale(${scale})`;
        }

        lastTap = now;
    });

});

/* Gabriele Ciadamidaro */
/* >^..^< */