particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 105,              // больше частиц
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "color": {
            "value": "#ffffff"        // белые
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.8,             // ярче
            "random": true
        },
        "size": {
            "value": 4,               // крупнее
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#ffffff",       // белые линии
            "opacity": 0.5,           // ярче
            "width": 1.5              // толще
        },
        "move": {
            "enable": true,
            "speed": 2.5,             // быстрее
            "direction": "none",
            "random": true,
            "out_mode": "bounce"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
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