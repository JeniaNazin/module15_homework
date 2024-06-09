const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  alert(`Размеры окна: высота - ${window.screen.height}, ширина - ${window.screen.width}`);
});