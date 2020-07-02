import Routers from '../router';

let routers = new Routers();
const content = document.querySelector('body');
const ul = document.querySelector('ul');

function changeBgColor(color) {
  content.style.backgroundColor = color;
}
routers.router('/red', changeBgColor.bind(null, 'red'));
routers.router('/green', changeBgColor.bind(null, 'green'));
routers.router('/yellow', changeBgColor.bind(null, 'yellow'));
routers.init(location.pathname);
ul.addEventListener('click', (e) => {
  if (e.target.tagName == 'A') {
    e.preventDefault();
    routers.go(e.target.getAttribute('href'));
  }
});
