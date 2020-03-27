window.onload = function(){
    
    changePhoneState();
    addLinksClickHandler();
    addPictureClickHandler();
    formSubmitHandler();
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


const portfolioLinks = document.querySelectorAll('.portfolio__link');
const addPortfolioLinkClass = (elem) => {
       elem.classList.add('selected');
}
const removePortfolioLinkClass = (elem) => {
     elem.classList.remove('selected'); 
}


// shuffle pictures and change links state


const addLinksClickHandler = () => {
    document.querySelector('.porfolio__links').addEventListener('click', (e) => {
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
    let pictures = document.querySelectorAll('.porfolio-work__block');
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
        console.log(e.target);
        if(e.target.classList.contains('porfolio-work')){
            let clickedPicture = e.target;
            removeSelectedPicture();
            selectClickedPicture(clickedPicture);
        }
    })
}

const removeSelectedPicture = () => {
    let pictures = document.querySelectorAll('.porfolio-work');
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
        console.log('clicked');
        createModalWindow();
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
    })
}
