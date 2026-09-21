// Тёмный фон с частицами для calculator.html (страница мини-проектов)
// Визуально 1-в-1 как блок particles в greeting-two на главной
particlesJS('particles-bg', {
    "particles": {
        "number": {
            "value": 105,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.8,
            "random": true
        },
        "size": {
            "value": 4,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#ffffff",
            "opacity": 0.5,
            "width": 1.5
        },
        "move": {
            "enable": true,
            "speed": 2.5,
            "direction": "none",
            "random": true,
            "out_mode": "bounce"
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 180,
                "line_linked": {
                    "opacity": 0.9
                }
            },
            "push": {
                "particles_nb": 6
            }
        }
    },
    "retina_detect": true
});