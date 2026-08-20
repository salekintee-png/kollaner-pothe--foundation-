/* =========================================================
   কল্যাণের পথে ফাউন্ডেশন
   script.js
   ---------------------------------------------------------
   এই JavaScript শুধু Animation + Interaction যোগ করবে।
   তোমার বর্তমান HTML/CSS ডিজাইন পরিবর্তন করবে না।
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. PAGE FADE-IN
    =============================== */

    const style = document.createElement("style");

    style.textContent = `
        body {
            opacity: 0;
            transition: opacity .55s ease;
        }

        body.js-loaded {
            opacity: 1;
        }

        .js-reveal {
            opacity: 0;
            transform: translateY(28px);
            transition:
                opacity .7s ease,
                transform .7s ease;
        }

        .js-reveal.js-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .js-ripple {
            position: relative;
            overflow: hidden;
        }

        .js-ripple-effect {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255,255,255,.35);
            transform: scale(0);
            animation: jsRipple .65s ease-out;
            pointer-events: none;
        }

        @keyframes jsRipple {
            to {
                transform: scale(18);
                opacity: 0;
            }
        }

        .js-top-button {
            position: fixed;
            right: 18px;
            bottom: 18px;

            width: 45px;
            height: 45px;

            border: 0;
            border-radius: 50%;

            background: #0b5d35;
            color: white;

            font-size: 20px;
            font-weight: 800;

            cursor: pointer;

            opacity: 0;
            visibility: hidden;

            transform: translateY(12px);

            transition: .3s ease;

            z-index: 9998;

            box-shadow:
                0 8px 22px rgba(0,0,0,.18);
        }

        .js-top-button.js-show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        @media (max-width:650px) {
            .js-top-button {
                right: 12px;
                bottom: 12px;
                width: 42px;
                height: 42px;
            }
        }
    `;

    document.head.appendChild(style);

    document.body.classList.add("js-loaded");


    /* ===============================
       2. SCROLL REVEAL ANIMATION
    =============================== */

    const revealItems = document.querySelectorAll(
        ".section, " +
        ".card, " +
        ".leader-card, " +
        ".activity-card, " +
        ".gallery-item, " +
        ".info-box, " +
        ".timeline-card, " +
        ".contact-card, " +
        ".donate-box, " +
        ".about-text, " +
        ".quote-box"
    );


    revealItems.forEach((item, index) => {

        item.classList.add("js-reveal");

        item.style.transitionDelay =
            `${Math.min(index * 45, 250)}ms`;

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "js-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(item => {

        revealObserver.observe(item);

    });


    /* ===============================
       3. BUTTON RIPPLE EFFECT
    =============================== */

    const buttons = document.querySelectorAll(
        ".btn, .main-button, nav a"
    );


    buttons.forEach(button => {

        button.classList.add("js-ripple");


        button.addEventListener("click", function(event) {

            const rect =
                this.getBoundingClientRect();


            const ripple =
                document.createElement("span");


            ripple.className =
                "js-ripple-effect";


            ripple.style.left =
                `${event.clientX - rect.left - 6}px`;


            ripple.style.top =
                `${event.clientY - rect.top - 6}px`;


            this.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });


    /* ===============================
       4. BACK TO TOP BUTTON
    =============================== */

    const topButton =
        document.createElement("button");


    topButton.className =
        "js-top-button";


    topButton.type =
        "button";


    topButton.setAttribute(
        "aria-label",
        "উপরে যান"
    );


    topButton.innerHTML = "↑";


    document.body.appendChild(
        topButton
    );


    const updateTopButton = () => {

        if (window.scrollY > 450) {

            topButton.classList.add(
                "js-show"
            );

        } else {

            topButton.classList.remove(
                "js-show"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateTopButton();


    /* ===============================
       5. IMAGE INTERACTION
    =============================== */

    const images = document.querySelectorAll(
        ".activity-card img, " +
        ".gallery-item img, " +
        ".hero-logo img, " +
        ".anniversary-logo img, " +
        ".footer-content img"
    );


    images.forEach(image => {

        image.addEventListener(
            "load",
            () => {

                image.style.cursor =
                    "pointer";

            }
        );


        image.addEventListener(
            "click",
            () => {

                if (
                    image.closest(
                        ".gallery-item"
                    ) ||
                    image.closest(
                        ".activity-card"
                    )
                ) {
                    return;
                }


                image.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },

                        {
                            transform:
                                "scale(1.025)"
                        },

                        {
                            transform:
                                "scale(1)"
                        }
                    ],
                    {
                        duration: 350,
                        easing: "ease-out"
                    }
                );

            }
        );

    });


    /* ===============================
       6. GALLERY KEYBOARD SUPPORT
    =============================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(item => {

        item.setAttribute(
            "tabindex",
            "0"
        );


        item.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    const checkbox =
                        item.querySelector(
                            "input[type='checkbox']"
                        );


                    if (checkbox) {

                        checkbox.checked =
                            !checkbox.checked;

                    }

                }


                if (
                    event.key === "Escape"
                ) {

                    const checkbox =
                        item.querySelector(
                            "input[type='checkbox']"
                        );


                    if (checkbox) {

                        checkbox.checked =
                            false;

                    }

                }

            }
        );

    });


    /* ===============================
       7. ESCAPE দিয়ে GALLERY বন্ধ
    =============================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            document
                .querySelectorAll(
                    ".gallery-item input:checked"
                )
                .forEach(input => {

                    input.checked = false;

                });

        }
    );


    /* ===============================
       8. ACTIVE NAVIGATION
    =============================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (currentPage) {

        document
            .querySelectorAll("nav a")
            .forEach(link => {

                const href =
                    link.getAttribute("href");


                if (!href) {
                    return;
                }


                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .toLowerCase();


                if (
                    linkPage === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }


    /* ===============================
       9. 4TH ANNIVERSARY IMAGE ANIMATION
    =============================== */

    const anniversaryImage =
        document.querySelector(
            'img[src="4th year.jpeg"]'
        );


    if (anniversaryImage) {

        anniversaryImage.addEventListener(
            "load",
            () => {

                anniversaryImage.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "scale(.96)"
                        },

                        {
                            opacity: 1,
                            transform:
                                "scale(1)"
                        }
                    ],
                    {
                        duration: 800,
                        easing: "ease-out",
                        fill: "both"
                    }
                );

            }
        );

    }


    /* ===============================
       10. EMPTY LINK PROTECTION
    =============================== */

    document
        .querySelectorAll("a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (
                href === "#" ||
                href === ""
            ) {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                    }
                );

            }

        });

});