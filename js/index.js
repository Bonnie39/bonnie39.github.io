const typingWelcomeElement = document.querySelector('.typing-welcome');
const typingAboutMeElement = document.querySelector('.typing-aboutme');

document.addEventListener('DOMContentLoaded', function() {
  const topScrollCoverElement = document.querySelector('#topscroll');

  // Define the function to handle scroll events
  function handleScroll() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
    if (scrollPosition <= 3) {
      topScrollCoverElement.style.opacity = '1';
      topScrollCoverElement.style.visibility = 'visible';
    } else {
      topScrollCoverElement.style.opacity = '0';
      topScrollCoverElement.style.visibility = 'hidden';
    }
  }

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Call the function initially to set the initial state
  handleScroll();
});

setTimeout(() => {
  typingWelcomeElement.classList.add('stop-animation');
}, 2500);

setTimeout(() => {
  typingAboutMeElement.classList.add('stop-animation');
}, 2500);
