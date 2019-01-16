var rootEl = document.documentElement;
var modals = getAll('.modal');
var modalBtns = getAll('.modal-button');
var modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .close');
var submitBtns = getAll('.submit-btn');
var inputs = getAll('.submit-input');
var modalDialogs = getAll('.modal-card, .modal-content');

document.addEventListener('DOMContentLoaded', () => {
    const navbarBurgers = getAll('.navbar-burger');
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            })
        })  
    }

    modalDialog("-5000px");
});

if (modalBtns.length > 0) {
    modalBtns.forEach(function(el) {
        el.addEventListener('click', () => {
            var target = el.dataset.target;
            openModal(target);
        })
    })
}

if (modalCloses.length > 0){
    modalCloses.forEach((el) => {
        el.addEventListener('click', () => {
            closeModel();
        })
    })
}

if (submitBtns.length > 0) {
    submitBtns.forEach((el) => {
        el.addEventListener('click', () => {
            var target = el.dataset.target;
            var $target = document.getElementById(target);
            $target.submit();
        })
    })
}

if (inputs.length > 0) {
    inputs.forEach((el) => {
        el.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                var target = el.closest('form');
                target.submit();
            }
        })
    })
}

function openModal(target) {
    let $target = document.getElementById(target);
    rootEl.classList.add('is-clipped');
    $target.classList.add('is-active');
    modalDialog("0px");
    
    // if (Notification.permission == 'granted') {
    //     var notification = new Notification("Hi There Again!");
    //     notification.onclick = () => {
    //         window.open(window.location.href);
    //     }
    // }
}

function closeModel() {
    rootEl.classList.remove('is-clipped');
    modals.forEach((el) => {
        el.classList.remove('is-active');
    })
    modalDialog("-5000px");
}

function modalDialog(pos){
    if (modalDialogs.length > 0) {
        modalDialogs.forEach(el => {
            el.style.transition = 'all 2s';
            el.style.top = pos;
        })
    }
}

function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}