import { gsap } from "gsap";

gsap.from('.logo', {
    opacity: 0,
    x: -200,
    delay: 0.1,
    duration: 1.2
});

gsap.from('.menu__list-item', {
    opacity: 0,
    x: 200,
    stagger: 0.4,
    delay: 0.1
});

gsap.from('.hero__img-decor', {
    opacity: 0,
    x: 200,
    delay: 0.1,
    duration: 1.2,

    onComplete: () => {
        gsap.to('.hero__img-decor', {
            y: -20,
            yoyo: true,
            repeat: -1,
            duration: 1.6,
            ease: 'power1.inOut'
        })
    }
});