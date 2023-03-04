const navbar = document.getElementsByClassName("navbarContainer");
let sticky = navbar.offsetTop;

window.onscroll = function() {makeSticky()}

const makeSticky = () => {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky")
    }
}