import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

let mm = gsap.matchMedia();
let tl = gsap.timeline();

let startAnimDuration = 1.2;
let scrollAnimDuration = 1;
let animOpacity = 0;
let animDelay = 0.1;
let animX = 200;
let animY = 200;
let animStagger = 0.4;

let leftHeroDecorEndPath = "M-391.591 0.394644C-445.452 -1.33161 -477.316 35.6128 -501.573 83.7333C-545.833 171.537 -560.967 276.494 -546.418 365.852C-531.868 455.21 -479.047 517.336 -426.365 554.562C-346.508 610.991 -325.59 612.6 -247.5 607.018C-190.503 602.944 -159.808 595.565 -93.806 561.844C-27.804 528.123 76.4385 554.066 50.4219 463.5C29.8274 391.808 -112.879 282.313 -112.879 282.313C-112.879 282.313 -179.389 274.713 -219.36 243.749C-260.729 211.701 -286.937 128.037 -286.937 128.037C-286.937 128.037 -327.164 2.45955 -391.591 0.394644Z";
let rightHeroDecorEndPath = "M10.7281 344.647C34.6067 302.728 -16.0002 224 39.6955 183.632C55.7692 171.981 50.5379 154.374 60.834 137.403C110.83 54.9974 183.595 9.06294 279.656 1.85181C346.27 -3.14813 425.191 -2.5432 454.244 63.7508C483.603 130.743 467.972 215.786 417.839 289.8C362.644 371.287 314.481 428.584 225.244 485.683C177.487 516.241 69.5016 569.279 27.169 506.055C10.7281 481.5 -13.1505 386.566 10.7281 344.647Z";

// ============== all widths ==============

gsap.from('.logo', {
    opacity: animOpacity,
    x: -animX,
    delay: animDelay,
    duration: startAnimDuration
});

tl.from('.hero__title', {
    x: -animX,
    opacity: animOpacity,
    delay: animDelay,
    duration: startAnimDuration
}).from('.hero__text', {
    x: -animX,
    opacity: animOpacity,
    duration: startAnimDuration
}).from('.hero__buttons', {
    opacity: animOpacity,
    y: animY,
    duration: startAnimDuration
});

gsap.from('.hero__decor--left svg path', {
    x: -animX,
    opacity: animOpacity,
    duration: startAnimDuration,
    delay: animDelay,

    onComplete: () => {
        gsap.to('.hero__decor--left svg path', {
            scrollTrigger: {
                start: 'top',
                end: '70% top',
                scrub: true
            },
            morphSVG: {
                shape: leftHeroDecorEndPath
            }
        })
    }
});

gsap.from('.services__list-item', {
    x: -animX,
    opacity: animOpacity,
    delay: animDelay,
    stagger: {
        each: animStagger,
        from: "end"
    },
    scrollTrigger: {
        trigger: '.services__list',
        start: "top bottom"
    },
})

gsap.from('.road__title', {
    y: animY,
    opacity: animOpacity,
    delay: animDelay,
    duration: scrollAnimDuration,
    scrollTrigger: {
        trigger: '.road',
        start: "top bottom",
    },
})

gsap.from('.road__subtitle', {
    y: animY,
    opacity: animOpacity,
    delay: animDelay,
    duration: scrollAnimDuration,
    scrollTrigger: {
        trigger: '.road__title',
        start: `bottom-=${animY}px bottom`,
    },
})

// ============== min-width: em(1000) ==============

mm.add("(min-width: 62.5em)", () => {
    gsap.from('#connecting-line path', {

    });
});

// ============== min-width: em(800) ==============

mm.add("(min-width: 50em)", () => {
    gsap.from('.hero__decor--right svg path', {
        x: animX,
        opacity: animOpacity,
        duration: startAnimDuration,
        delay: animDelay,

        onComplete: () => {
            gsap.to('.hero__decor--right svg path', {
                scrollTrigger: {
                    scrub: true,
                    start: 'top',
                    end: '45% top',
                },

                morphSVG: {
                    shape: rightHeroDecorEndPath
                }
            })
        }
    });

    let heroImgSlide = ['.hero__img-decor', '.hero__img-man'];

    heroImgSlide.forEach(heroImg => {
        gsap.from(heroImg, {
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
    });

    gsap.utils.toArray('.road__item:nth-child(odd)').forEach(roadItem => {
        let image = roadItem.querySelector('.road__item-img');

        gsap.from(image, {
            x: animX,
            opacity: animOpacity,
            delay: animDelay,
            duration: scrollAnimDuration,

            scrollTrigger: {
                trigger: roadItem,
                start: 'top bottom',
            }
        });

        let roadItemContents = [
            roadItem.querySelector('.road__item-subtitle p'),
            roadItem.querySelector('.road__item-title'),
            roadItem.querySelector('.road__item-text')
        ];

        roadItemContents.forEach((itemContent, i) => {
            gsap.from(itemContent, {
                x: -animX,
                opacity: animOpacity,
                delay: i * animStagger * 2,

                scrollTrigger: {
                    trigger: roadItem,
                    start: 'top bottom',
                }
            });
        });
    });

    gsap.utils.toArray('.road__item:nth-child(even)').forEach(roadItem => {
        let image = roadItem.querySelector('.road__item-img');

        gsap.from(image, {
            x: -animX,
            opacity: animOpacity,
            delay: animDelay,
            duration: scrollAnimDuration,

            scrollTrigger: {
                trigger: roadItem,
                start: 'top bottom',
            }
        });

        let roadItemContents = [
            roadItem.querySelector('.road__item-subtitle p'),
            roadItem.querySelector('.road__item-title'),
            roadItem.querySelector('.road__item-text')
        ];

        roadItemContents.forEach((itemContent, i) => {
            gsap.from(itemContent, {
                x: animX,
                opacity: animOpacity,
                delay: i * animStagger,

                scrollTrigger: {
                    trigger: roadItem,
                    start: 'top bottom',
                }
            });
        });
    });

    gsap.from('.subscribe__item:nth-child(odd)', {
        x: -animX,
        opacity: animOpacity,
        delay: animDelay,
        duration: scrollAnimDuration,

        scrollTrigger: {
            trigger: '.subscribe__container',
            start: '5% bottom'
        }
    });

    gsap.from('.subscribe__item:nth-child(even)', {
        x: animX,
        opacity: animOpacity,
        delay: animDelay,
        duration: scrollAnimDuration,

        scrollTrigger: {
            trigger: '.subscribe__container',
            start: '5% bottom'
        }
    });
});

// ============== max-width: em(800) ==============

mm.add("(max-width: 50em)", () => {
    gsap.from('.hero__decor--right svg path', {
        x: animX,
        opacity: animOpacity,
        duration: startAnimDuration,
        delay: animDelay
    });
});

// ============== max-width: em(720) ==============

mm.add("(max-width: 45em)", () => {
    gsap.from('.burger-label', {
        x: animX,
        opacity: animOpacity,
        duration: startAnimDuration,
        delay: animDelay
    });
});

// ============== min-width: em(610) ==============

mm.add("(min-width: 38.125em)", () => {
    gsap.from('.menu__list-item', {
        opacity: animOpacity,
        x: animX,
        stagger: animStagger,
        delay: animDelay
    });
});

