/* =========================================================
   PRIME DESIGN
   JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       LOADER
    ========================== */

    const loader =
        document.querySelector(".loader");


    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1600);



    /* =========================
       HEADER AO ROLAR
    ========================== */

    const header =
        document.querySelector(".header");


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();



    /* =========================
       MENU MOBILE
    ========================== */

    const menuButton =
        document.querySelector(".menu-button");


    const mobileMenu =
        document.querySelector(".mobile-menu");


    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });


    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });



    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =========================
       CONTADORES
    ========================== */

    const counters =
        document.querySelectorAll(".counter");


    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.target
                        );


                    const duration = 1800;


                    const startTime =
                        performance.now();


                    function updateCounter(currentTime) {


                        const progress =
                            Math.min(

                                (
                                    currentTime -
                                    startTime
                                )
                                /
                                duration,

                                1

                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                4
                            );


                        const current =
                            Math.floor(
                                eased * target
                            );


                        counter.textContent =
                            current + "+";


                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },

            {
                threshold: 0.7
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });



    /* =====================================================
       PORTFÓLIO / FILTROS / CARROSSEL
    ===================================================== */


    const track =
        document.querySelector(".projects-track");


    const nextButton =
        document.querySelector(".slider-button.next");


    const prevButton =
        document.querySelector(".slider-button.prev");


    const progressBar =
        document.querySelector(
            ".slider-progress-bar"
        );


    const slider =
        document.querySelector(".projects-slider");


    const filterButtons =
        document.querySelectorAll(".filter-button");


    const serviceFilterLinks =
        document.querySelectorAll(
            ".service-filter-link"
        );


    let currentSlide = 0;

    let activeFilter = "todos";


    function getVisibleSlides() {

        return Array.from(
            document.querySelectorAll(
                ".project-slide"
            )
        ).filter(slide => {

            return (
                activeFilter === "todos" ||
                slide.dataset.category === activeFilter
            );

        });

    }



    function getSlidesPerView() {

        if (window.innerWidth <= 768) {

            return 1;

        }

        return 2;

    }



    function applyFilter(filter) {


        activeFilter = filter;


        const allSlides =
            document.querySelectorAll(
                ".project-slide"
            );


        allSlides.forEach(slide => {


            const shouldShow =

                filter === "todos" ||

                slide.dataset.category === filter;


            slide.style.display =

                shouldShow
                    ? "block"
                    : "none";

        });


        currentSlide = 0;


        updateSlider();

    }



    function updateSlider() {


        const visibleSlides =
            getVisibleSlides();


        const slidesPerView =
            getSlidesPerView();


        const maxSlide =
            Math.max(

                0,

                visibleSlides.length -
                slidesPerView

            );


        if (currentSlide > maxSlide) {

            currentSlide = maxSlide;

        }


        if (visibleSlides.length === 0) {

            track.style.transform =
                "translateX(0)";

            return;

        }


        const slideWidth =
            visibleSlides[0]
                .getBoundingClientRect()
                .width;


        const gap = 30;


        const move =
            currentSlide *
            (
                slideWidth +
                gap
            );


        track.style.transform =
            `translateX(-${move}px)`;


        const totalPositions =
            maxSlide + 1;


        const progress =

            totalPositions <= 1

                ? 100

                : (

                    (
                        currentSlide + 1
                    )
                    /
                    totalPositions

                ) * 100;


        progressBar.style.width =
            `${progress}%`;

    }



    /* =========================
       PRÓXIMO
    ========================== */

    nextButton.addEventListener(
        "click",
        () => {


            const visibleSlides =
                getVisibleSlides();


            const slidesPerView =
                getSlidesPerView();


            const maxSlide =
                Math.max(

                    0,

                    visibleSlides.length -
                    slidesPerView

                );


            if (currentSlide >= maxSlide) {

                currentSlide = 0;

            } else {

                currentSlide++;

            }


            updateSlider();

        }
    );



    /* =========================
       ANTERIOR
    ========================== */

    prevButton.addEventListener(
        "click",
        () => {


            const visibleSlides =
                getVisibleSlides();


            const slidesPerView =
                getSlidesPerView();


            const maxSlide =
                Math.max(

                    0,

                    visibleSlides.length -
                    slidesPerView

                );


            if (currentSlide <= 0) {

                currentSlide = maxSlide;

            } else {

                currentSlide--;

            }


            updateSlider();

        }
    );



    /* =========================
       BOTÕES DE FILTRO
    ========================== */

    filterButtons.forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const filter =
                    button.dataset.filter;


                filterButtons.forEach(btn => {

                    btn.classList.remove("active");

                });


                button.classList.add("active");


                applyFilter(filter);

            }
        );

    });



    /* =========================
       SERVIÇOS → PORTFÓLIO
    ========================== */

    serviceFilterLinks.forEach(link => {


        link.addEventListener(
            "click",
            () => {


                const filter =
                    link.dataset.filter;


                filterButtons.forEach(button => {


                    if (
                        button.dataset.filter ===
                        filter
                    ) {

                        button.classList.add("active");

                    } else {

                        button.classList.remove("active");

                    }

                });


                setTimeout(() => {

                    applyFilter(filter);

                }, 400);

            }
        );

    });



    /* =========================
       RESIZE
    ========================== */

    window.addEventListener(
        "resize",
        updateSlider
    );


    updateSlider();



    /* =========================
       AUTOPLAY
    ========================== */

    let autoplay;


    function startAutoplay() {


        stopAutoplay();


        autoplay =
            setInterval(() => {

                nextButton.click();

            }, 5000);

    }


    function stopAutoplay() {

        clearInterval(autoplay);

    }


    startAutoplay();



    slider.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    slider.addEventListener(
        "mouseleave",
        startAutoplay
    );



    /* =========================
       SWIPE MOBILE
    ========================== */

    let touchStartX = 0;

    let touchEndX = 0;


    slider.addEventListener(

        "touchstart",

        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },

        {
            passive: true
        }

    );


    slider.addEventListener(

        "touchend",

        event => {


            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX -
                touchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                nextButton.click();

            } else {

                prevButton.click();

            }

        },

        {
            passive: true
        }

    );



    /* =====================================================
       LIGHTBOX
    ===================================================== */


    const lightbox =
        document.querySelector(".lightbox");


    const lightboxImage =
        document.querySelector(".lightbox-image");


    const lightboxClose =
        document.querySelector(".lightbox-close");


    const projectImages =
        document.querySelectorAll(
            ".project-image"
        );



    projectImages.forEach(project => {


        project.addEventListener(
            "click",
            () => {


                const image =
                    project.querySelector("img");


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt;


                lightbox.classList.add("active");


                document.body.classList.add(
                    "lightbox-open"
                );


                stopAutoplay();

            }
        );

    });



    function closeLightbox() {


        lightbox.classList.remove("active");


        document.body.classList.remove(
            "lightbox-open"
        );


        setTimeout(() => {

            lightboxImage.src = "";

        }, 350);


        startAutoplay();

    }



    lightboxClose.addEventListener(

        "click",

        closeLightbox

    );



    lightbox.addEventListener(

        "click",

        event => {


            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }

    );



    document.addEventListener(

        "keydown",

        event => {


            if (
                event.key === "Escape" &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight" &&
                !lightbox.classList.contains("active")
            ) {

                nextButton.click();

            }


            if (
                event.key === "ArrowLeft" &&
                !lightbox.classList.contains("active")
            ) {

                prevButton.click();

            }

        }

    );



    /* =====================================================
       CURSOR
    ===================================================== */


    const cursor =
        document.querySelector(".cursor");


    const follower =
        document.querySelector(".cursor-follower");


    let mouseX = 0;

    let mouseY = 0;

    let followerX = 0;

    let followerY = 0;



    document.addEventListener(

        "mousemove",

        event => {


            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            cursor.style.left =
                mouseX + "px";


            cursor.style.top =
                mouseY + "px";

        }

    );



    function animateCursor() {


        followerX +=
            (mouseX - followerX) * .12;


        followerY +=
            (mouseY - followerY) * .12;


        follower.style.left =
            followerX + "px";


        follower.style.top =
            followerY + "px";


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();



    /* =========================
       HOVER CURSOR
    ========================== */

    const hoverElements =
        document.querySelectorAll(

            "a, button, .service-card, .project-slide"

        );


    hoverElements.forEach(element => {


        element.addEventListener(

            "mouseenter",

            () => {


                follower.style.width =
                    "55px";


                follower.style.height =
                    "55px";

            }

        );


        element.addEventListener(

            "mouseleave",

            () => {


                follower.style.width =
                    "32px";


                follower.style.height =
                    "32px";

            }

        );

    });



    /* =========================
       REDUZIR ANIMAÇÕES
    ========================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";


        stopAutoplay();

    }


});