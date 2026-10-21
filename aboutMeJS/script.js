document.addEventListener('DOMContentLoaded', function() {
    // Логика появления и исчезания кнопки вверх
    let scrollTopBtn = document.getElementById('scroll-btn');
    
    // Отслеживаем, какие проекты видны
    let visibleModules = new Set();

    const scrollBtnObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleModules.add(entry.target);
                } else {
                    visibleModules.delete(entry.target);
                }
            });
            
            if (visibleModules.size > 0) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto'; 
                scrollTopBtn.style.cursor = 'pointer';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none'; 
                scrollTopBtn.style.cursor = 'default';
            }
        },
        { threshold: 0.1 }
    );

    // Наблюдаем за блоками
    const hakhatonBlock = document.querySelector('.hakhaton');
    const plansBlock = document.querySelector('.plans');
    
    if (hakhatonBlock) scrollBtnObserver.observe(hakhatonBlock);
    if (plansBlock) scrollBtnObserver.observe(plansBlock);

    // Обработчик клика
    scrollTopBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
});

// Стрелка назад
let backArrowContainer = document.getElementsByClassName('back-arrow-container')[0];
if (backArrowContainer) {
    backArrowContainer.addEventListener('click', function() {
        location.href = 'index.html';
    });
}