document.addEventListener('DOMContentLoaded', function () {
    // Vanta Globe
    VANTA.GLOBE({
        el: "#vanta-globe",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x9a83b5,
        size: 1.10,
        backgroundColor: 0x1a0f2e
    });

    // AOS
    AOS.init({
        duration: 600,
        once: true
    });


    //Логика скролла
    const options = {
        threshold: 0.45,
        rootMargin: "0px",
        root: null
    };
    const observer = new IntersectionObserver(addClasses, options);

    observer.observe(document.querySelector('.first-project-image'));
    observer.observe(document.querySelector('.first-project-text'));
    observer.observe(document.querySelector('.second-project-image'));

    observer.observe(document.querySelector('.second-project-text'));

    function addClasses(entries) {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('first-project-image')) {
                    entry.target.classList.add('animationImg');
                }
                if (entry.target.classList.contains('first-project-text')) {
                    entry.target.classList.add('animationText');
                }
                if (entry.target.classList.contains('second-project-image')) {
                    entry.target.classList.add('animationImg');
                }
                if (entry.target.classList.contains('second-project-text')) {
                    entry.target.classList.add('animationText');
                }
                observer.unobserve(entry.target);
            }
        });
    }

    //Логика появления и исчезания кнопки вверх
    let scrollTopBtn = document.getElementById('scroll-btn');
    const scrollBtnObserver = new IntersectionObserver(
        function ([entry]) {
            if (entry.isIntersecting) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.cursor = 'pointer';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.cursor = 'default';
            }
        },
        { threshold: 0.1 }
    );

    scrollBtnObserver.observe(
        document.querySelector('.first-project-image')
    );

    //прокрутка вверх
    scrollTopBtn.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const scrollToTop = () => {
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
        
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 100);
});
});

// Выпадающее меню
let buttonProjects = document.getElementById('buttonProjects');
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');

buttonProjects.addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
});

document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
        dropdownContent.classList.remove('show');
    }
});
let greetingCard = document.querySelector('.greeting-card');
let faceCard = document.getElementsByClassName('face-card');
let backCard = document.getElementsByClassName('back-card');
let isFace = true;
greetingCard.addEventListener('click', function () {
    if (isFace == true) {
        greetingCard.classList.add('greeting-card-rotate');
        isFace = false;
    } else {
        greetingCard.classList.remove('greeting-card-rotate');
        isFace = true;
    }
});


let calculatorBtn = document.querySelector('.back-card-calculator');
let converterBtn = document.querySelector('.back-card-converter');
let ToDoBtn = document.querySelector('.back-card-todo');

let calcWind = document.getElementById('calculatorWind');
let converterWind = document.getElementById('converterWind');
let ToDoWind = document.getElementById('ToDoWind');

calculatorBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    location.href = 'calculator.html';
});

converterBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    location.href = 'calculator.html?mode=converter';  // С параметром
});

ToDoBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    location.href = 'calculator.html?mode=ToDoList';
});
