/* =====================================================
   FLO.FLOW
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENT
    ================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");

    const revealElements =
        document.querySelectorAll(".reveal");

    const yearElement =
        document.getElementById("year");


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", function () {

            menuToggle.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            document.body.classList.toggle(
                "menu-active"
            );

        });

    }


    /* =================================================
       MOBILE MENU LINKS
    ================================================= */

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            document.body.classList.remove(
                "menu-active"
            );

        });

    });


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (menuToggle) {
                    menuToggle.classList.remove(
                        "active"
                    );
                }

                if (mobileMenu) {
                    mobileMenu.classList.remove(
                        "active"
                    );
                }

                document.body.classList.remove(
                    "menu-active"
                );

            }

        }
    );


    /* =================================================
       CLOSE MENU WHEN CLICK OUTSIDE
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (!mobileMenu ||
                !menuToggle) {
                return;
            }

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);

            if (
                mobileMenu.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedButton
            ) {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-active"
                );

            }

        }
    );


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /* Browser lama */

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =================================================
       CURRENT YEAR
    ================================================= */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       CLOSE MOBILE MENU ON RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {

                if (menuToggle) {
                    menuToggle.classList.remove(
                        "active"
                    );
                }

                if (mobileMenu) {
                    mobileMenu.classList.remove(
                        "active"
                    );
                }

                document.body.classList.remove(
                    "menu-active"
                );

            }

        }
    );


    /* =================================================
       SMOOTH SCROLL
       Fallback untuk browser lama
    ================================================= */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const header =
                        document.querySelector(
                            ".header"
                        );

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.pageYOffset
                        -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        }
    );


    /* =================================================
       IMAGE ERROR HANDLING
    ================================================= */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    this.style.background =
                        "#e7e0d5";

                    this.style.minHeight =
                        "200px";

                    this.style.objectFit =
                        "cover";

                }
            );

        }
    );

});