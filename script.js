window.onload = function(){
    
    changePhoneState();
    addLinksClickHandler();
    addPictureClickHandler();
    formSubmitHandler();
    addHamburgerHandler();
    changeSlides();
}

document.addEventListener('scroll', menuScroll);



function menuScroll(event) {
    const currentPos = window.scrollY;
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.header__navigation a');

    sections.forEach((elem) => {
        if(elem.offsetTop <= currentPos && (elem.offsetTop + elem.offsetHeight) > currentPos) {
            menuLinks.forEach((a) => {
                a.classList.remove('active');
                if(elem.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            });
        }
    });
}

// change state of phone screens 
const verticalOffScreen = document.querySelector('.vertical-dark-screen');
const horizontalOffScreen = document.querySelector('.horizontal-dark-screen');

const changePhoneState = () => {
    verticalOffScreen.addEventListener('click', () => {
        if (verticalOffScreen.classList.contains('off')){
            verticalOffScreen.classList.remove('off');
        } else {
            verticalOffScreen.classList.add('off');
        }
    });
    horizontalOffScreen.addEventListener('click',() => {
        if (horizontalOffScreen.classList.contains('off')){
            horizontalOffScreen.classList.remove('off');
        } else {
            horizontalOffScreen.classList.add('off');
        }
    })
}


// shuffle pictures and change links state

const portfolioLinks = document.querySelectorAll('.portfolio__link');

const addPortfolioLinkClass = (elem) => {
       elem.classList.add('selected');
}
const removePortfolioLinkClass = (elem) => {
     elem.classList.remove('selected'); 
}

const addLinksClickHandler = () => {
    document.querySelector('.portfolio__links').addEventListener('click', (e) => {
        if(e.target.classList.contains('portfolio__link')){
            let clickedLink = e.target;
            if(!clickedLink.classList.contains('link__selected')){
                removeSelectedLinks();
                selectClickedLink(clickedLink);
            }
        }
    })
}
const removeSelectedLinks = () => {
    let links = document.querySelectorAll('.portfolio__link');
    links.forEach((link => {
        link.classList.remove('link__selected');
    }))
}

const selectClickedLink = (link) => {
    link.classList.add('link__selected');
    shufflePictures();
}

const shufflePictures = () => {   
    let pictures = document.querySelectorAll('.portfolio-work__block');
    let picturesWrapper = document.querySelector('.portfolio-work-container');
    let shuffleWrapper = [];
    pictures.forEach(elem => {
        shuffleWrapper.push(elem);
        elem.remove();
    })
    shuffleWrapper.sort(function() {
        return .5 - Math.random();
      });
    
    shuffleWrapper.forEach(elem => {
        picturesWrapper.appendChild(elem);
    })
}

//select picture

const addPictureClickHandler = () => {
    document.querySelector('.portfolio-work-container').addEventListener('click', (e) => {
        if(e.target.classList.contains('portfolio-work')){
            let clickedPicture = e.target;
            removeSelectedPicture();
            selectClickedPicture(clickedPicture);
        }
    })
}

const removeSelectedPicture = () => {
    let pictures = document.querySelectorAll('.portfolio-work');
    pictures.forEach((picture => {
        if(picture.classList.contains('work-selected')){
            picture.classList.remove('work-selected');
        }
    }))
}

const selectClickedPicture = (picture) => {
    picture.classList.add('work-selected');
}

//form actions 

const formSubmitHandler = () => {
    let submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let mail = document.querySelector('.email');
        let name = document.querySelector('.name');
        if(mail.validity.valid && name.validity.valid){
            createModalWindow();
        } else {
            alert('invalid name or email');
        }        
    })
} 

const createModalWindow = () => {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    let header =  document.querySelector('header');
    document.body.insertBefore(modalWindow, header);
    createPopUp(modalWindow);
}

const deleteModalWindow = () => {
    document.body.removeChild(document.querySelector('.modal-window'));
}

const createPopUp = (elem) => {
    let popUpwindow = document.createElement('div');
    popUpwindow.classList.add('pop-up');
    elem.appendChild(popUpwindow);

    let letterText = document.createElement('p');
    letterText.innerHTML = 'The letter was sent';
    popUpwindow.appendChild(letterText);
    
    let subjectInput = document.querySelector('.subject');
    let subjectText = document.createElement('p');
    if(subjectInput.value === '') {
        subjectText.innerHTML = 'No subject';
    } else {
        subjectText.innerHTML = 'Subject: ' + subjectInput.value;
    }
    popUpwindow.appendChild(subjectText);

    let descriptionInput = document.querySelector('.mail-description');
    let descriptionText = document.createElement('p');
    if(descriptionInput.value === ''){
        descriptionText.innerHTML = 'No description';
    } else {
        descriptionText.innerHTML = 'Description: ' + descriptionInput.value;
    }
    popUpwindow.appendChild(descriptionText);

    let popUpButton = document.createElement('button');
    popUpButton.classList.add('close-button');
    popUpButton.innerHTML = 'OK';
    popUpwindow.appendChild(popUpButton);
    popUpButton.addEventListener('click', () => {
        deleteModalWindow();
        document.querySelector('.contact-form').reset();
    })
}

// mobile menu 

const addHamburgerHandler = () => {
    if (window.screen.width <= 375){
        let burger = document.querySelector('.hamburger');
        burger.addEventListener('click', () => {
            if(burger.classList.contains('opened')){
                hideMenu();
                burger.classList.remove('opened');
            }else {
                burger.classList.add('opened');
                showMenu();
                document.querySelector('.navigation').addEventListener('click', (e) => {
                    if(e.target){
                        hideMenu();
                        burger.classList.remove('opened');
                    }
                })
            }
        })
    }
}

const showMenu = () => {

    document.querySelector('header').classList.add('blur');
    document.querySelector('.header_wrapper').classList.add('opened');
    document.querySelector('.header__navigation').classList.remove('closed-menu');

}

const hideMenu = () => {
    document.querySelector('header').classList.remove('blur');
    document.querySelector('.header_wrapper').classList.remove('opened');
    document.querySelector('.header__navigation').classList.add('closed-menu');
}

//slider

const changeSlides = () => {
    let leftArrow = document.querySelector('.arrow-left');
    let rightArrow = document.querySelector('.arrow-right');
    let currentSlide = 0;
    slides = document.querySelectorAll('.slide');

    leftArrow.addEventListener('click', () => {
        if(currentSlide === 0){
            currentSlide = slides.length - 1;
        } else {
            currentSlide -=1;
        }
        showCurrentSlide(currentSlide);
    })

    rightArrow.addEventListener('click', () => {
        if(currentSlide >= slides.length -1){
            currentSlide = 0;
        } else {
            currentSlide +=1;
        }
        showCurrentSlide(currentSlide);
    })
}

const showSlide = (elem) => {
    elem.classList.add('visible');
}

const hideSlide = (elem) => {
    elem.classList.remove('visible');
}

const showCurrentSlide = (slideNum) => {
    slides = document.querySelectorAll('.slide');
    visibleSlide = document.querySelector('.visible');
    hideSlide(visibleSlide);
    showSlide(slides[slideNum]);
}

