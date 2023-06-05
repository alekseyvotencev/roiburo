document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('.header');
    const body = document.body;
    const html = document.documentElement;
    const footer = document.querySelector('.footer')

    let heroHeading = document.querySelector('.hero__heading');
    let heroSertificates = document.querySelector('.hero__sertificates');
    let onboardingText = document.querySelector('.hero__left-onboarding');
    let heroRight = document.querySelector('.hero__right');
    let heroBtn = document.querySelector('.hero .request-btn');

    if (!document.querySelector('.main-hero')) {
        header.classList.remove('main-header');
    }

    if (onboardingText) {
        setTimeout(() => {
            onboardingText.classList.remove('paused');
            heroHeading.classList.remove('paused');
            header.classList.remove('paused');
            heroSertificates.classList.remove('paused');
            heroRight.classList.remove('paused');
            heroBtn.classList.remove('paused');
        }, 1000);
    }


    // Пересчет rem в px 
    const rem = function (rem) {
        if (window.innerWidth > 768) {
            return 0.005208335 * window.innerWidth * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100 / 375) * (0.1 * window.innerWidth) * rem;
        }
    }

    // функция клика вне элемента
    function clickOutside(elem, needToClose) {
        document.addEventListener('click', function (e) {
            if (e.target !== elem && !elem.contains(e.target)) {
                needToClose.classList.remove('active');
            }
        })
    }

    // функция открытия попапа
    function openPopupElement(element) {
        if (window.innerWidth > 768) {
            let scrollWidth = (window.innerWidth - body.clientWidth);
            body.style.paddingRight = `${scrollWidth}px`;
            header.style.paddingRight = `${scrollWidth}px`
        }
        body.classList.add('lock', 'dark', 'blur');
        html.classList.add('lock');
        element.classList.add('active');
    }

    // функция закрытия попапа
    function closePopupElement(element) {
        body.classList.remove('lock', 'dark', 'blur');
        html.classList.remove('lock');
        element.classList.remove('active');
        if (window.innerWidth > 768) {
            body.style.paddingRight = '0';
            header.style.paddingRight = '0';
        }
    }

    if (document.querySelector('.popup__close')) {
        let popupCloseBtns = document.querySelectorAll('.popup__close');
        popupCloseBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                closePopupElement(btn.parentElement.parentElement);
            })
        })
    }

    // кнопка контактов в хедере
    let headerContacts = document.querySelector('.header__contacts');
    let headerContactsBtn = header.querySelector('.header__phone');
    headerContactsDropdown = header.querySelector('.header__contacts-dropdown');
    headerContactsBtn.addEventListener('click', function () {
        headerContactsDropdown.classList.toggle('active');
        clickOutside(headerContacts, headerContactsDropdown);
    })


    // аккордеоны

    function initAccordion(accordion) {
        let accItems = accordion.querySelectorAll('.acc-item');
        accItems.forEach(item => {
            let accHead = item.querySelector('.acc-head');
            let accContent = item.querySelector('.acc-content');
            accHead.addEventListener('click', function () {

                accItems.forEach(el => {
                    if (item !== el) {
                        el.classList.remove('active');
                        el.querySelector('.acc-content').style.maxHeight = null;
                    }
                })

                item.classList.toggle('active');
                if (accContent.style.maxHeight) {
                    accContent.style.maxHeight = null
                } else {
                    accContent.style.maxHeight = accContent.scrollHeight / 5 + "rem";
                }
            })
        });
    }

    // аккордеон в хедер меню
    initAccordion(header);

    // аккордеон в секции Этапы работы

    if (document.querySelector('.stages__right-list') && window.innerWidth < 768) {
        initAccordion(document.querySelector('.stages__right-list'));
    }

    // аккордеон в qa

    if (document.querySelector('.qa__accordion')) {
        initAccordion(document.querySelector('.qa__accordion'))
    }

    // табы
    function initTabs(tabButtons, tabBlocks) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                tabButtons.forEach(el => el.classList.remove('active'));
                tabBlocks.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                const path = btn.dataset.path;
                tabBlocks.forEach(block => {
                    if (block.dataset.target === path) {
                        block.classList.add('active');
                    }
                })

                if (window.innerWidth < 993 && tabBlocks[0].classList.contains('services__item') && tabBlocks[0].classList.contains('mobile')) {
                    body.classList.add('lock');
                    body.classList.add('dark');
                }
            })
        })
    }

    // открытие меню в хедере
    let headerBurger = header.querySelector('.header__burger');
    let headerMenu = header.querySelector('.header__menu');
    headerBurger.addEventListener('click', function () {
        headerBurger.classList.toggle('active');
        if (window.innerWidth > 992) {
            let scrollWidth = (window.innerWidth - body.clientWidth);
            body.style.paddingRight = `${scrollWidth}px`;
            header.style.paddingRight = `${scrollWidth}px`
        }
        body.classList.toggle('lock');
        body.classList.toggle('dark');
        html.classList.toggle('lock');
        headerMenu.classList.toggle('active');
    })

    // выбор способа связи в форме
    if (document.querySelector('.callback-form')) {
        let callbackForms = document.querySelectorAll('.callback-form');
        callbackForms.forEach(form => {
            let choiceBtn = form.querySelector('.communication-method__choice-head');
            let communicationMethodBlock = form.querySelector('.communication-method');
            choiceBtn.addEventListener('click', function () {
                communicationMethodBlock.classList.toggle('active');
            })
            let commMethodField = form.querySelector('.communication-method__choice-head > p');
            let commMethodBtns = form.querySelectorAll('.communication-method__choice-dropdown__list-item > button');
            commMethodBtns.forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    let btnText = btn.innerText;
                    if (btnText === 'E-mail') {
                        commMethodField.innerText = 'E-mail';
                    } else if (btnText === 'Телефон') {
                        commMethodField.innerText = 'Телефону';
                    }
                    communicationMethodBlock.classList.remove('active');
                })
            })
        })
    }

    // табы в блоке услуг на главной
    if (document.querySelector('.services__tags')) {
        let servicesTags = document.querySelectorAll('.services__tags-item__btn');
        let servicesBlocksDesktop = document.querySelectorAll('.services__item.desktop');
        let servicesBlocksMobile = document.querySelectorAll('.services__item.mobile');

        if (window.innerWidth > 992) {
            document.querySelector('.services__tags-item__btn[data-path=seo]').classList.add('active');
            document.querySelector('.services__item.desktop[data-target=seo]').classList.add('active');
            initTabs(servicesTags, servicesBlocksDesktop)
        } else {
            initTabs(servicesTags, servicesBlocksMobile)

            let servicesBlocksClose = document.querySelectorAll('.services__item-close');
            servicesBlocksClose.forEach(btn => {
                btn.addEventListener('click', function () {
                    btn.parentElement.classList.remove('active');
                    body.classList.remove('lock');
                    body.classList.remove('dark');
                    servicesTags.forEach(el => el.classList.remove('active'));
                })
            })
        }


    }

    if (document.querySelector('.request-btn') && document.querySelector('.request-popup')) {
        let requestBtns = document.querySelectorAll('.request-btn');
        let requestPopup = document.querySelector('.request-popup');
        requestBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                openPopupElement(requestPopup);
            })
        })

        let requestPopupClose = requestPopup.querySelector('.request-popup__close');
        requestPopupClose.addEventListener('click', function () {
            if (!document.querySelector('.services__item.mobile.active')) {
                closePopupElement(requestPopup);
            }
            requestPopupClose.parentElement.classList.remove('active');
        })
    }

    // анимация для футера
    if (window.innerWidth < 993) {
        footer.classList.add('active');
    } else {
        let footerOffset = footer.offsetTop;
        window.addEventListener('scroll', function () {
            if (window.scrollY > footerOffset - 300) {
                footer.classList.add('active');
            }
        })
    }


    // анимации

    // блок hero
    if (document.querySelector('.hero')) {
        const homeAnimation = bodymovin.loadAnimation({
            container: document.getElementById('home'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/src/js/home.json',
        })

        const digitalAnimation = bodymovin.loadAnimation({
            container: document.getElementById('digital'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/src/js/digital.json',
        })

        setTimeout(() => {
            homeAnimation.play();
        }, 6000);

        setTimeout(() => {
            digitalAnimation.play();
        }, 7000);

    }

    // блок услуг
    if (document.querySelector('.services')) {
        const servAnimation = bodymovin.loadAnimation({
            container: document.getElementById('serv'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/src/js/serv.json',
        })

        const serv2Animation = bodymovin.loadAnimation({
            container: document.getElementById('serv2'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/src/js/serv2.json',
        })

        let servSection = document.querySelector('.services');
        let servSectionOffset = servSection.offsetTop;
        if (window.scrollY > servSectionOffset - 300) {
            servAnimation.play();
            serv2Animation.play();
        }
        window.addEventListener('scroll', function () {
            if (window.scrollY > servSectionOffset - 300) {
                servAnimation.play();
                serv2Animation.play();
            }
        })
    }

    // блок Команда
    if (document.querySelector('.teamline')) {
        const teamlineAnimation = bodymovin.loadAnimation({
            container: document.getElementById('teamline'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/src/js/teamline.json',
        })

        let teamSection = document.querySelector('.team');
        let teamSectionOffset = teamSection.offsetTop;
        if (window.scrollY > teamSectionOffset - 300) {
            teamlineAnimation.play();
        }
        window.addEventListener('scroll', function () {
            if (window.scrollY > teamSectionOffset - 300) {
                teamlineAnimation.play();
            }
        })
    }

    // блок seo
    if (document.querySelector('.hero.seo')) {
        const seoAnimation = bodymovin.loadAnimation({
            container: document.getElementById('seo'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '/src/js/seo.json',
        })
    }

})