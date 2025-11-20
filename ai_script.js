
const sliders = document.querySelectorAll('.slider-container');
sliders.forEach(slider => {
    let scrollAmount = 0;
    let scrollStep = 1;
    let maxScroll = slider.scrollWidth - slider.clientWidth;

    function autoScroll() {
        if (scrollAmount >= maxScroll) {
            scrollAmount = 0;
        } else {
            scrollAmount += scrollStep;
        }
        slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }

    let interval = setInterval(autoScroll, 50);

    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => interval = setInterval(autoScroll, 50));

    // ドラッグでスクロール
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // ドラッグ速度調整
        slider.scrollLeft = scrollLeft - walk;
    });
});
