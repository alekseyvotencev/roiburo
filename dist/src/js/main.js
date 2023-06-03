document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const body = document.body;
    const html = document.documentElement;

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
                        if (window.innerWidth <= 768 && block.classList.contains('account-lk__right-content')) {
                            body.classList.add('lock');
                        }
                    }
                })
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
})