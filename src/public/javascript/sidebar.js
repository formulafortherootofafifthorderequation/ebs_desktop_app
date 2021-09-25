const menu = document.querySelector('.menu_button');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('main')
const nav_text = document.querySelector('.nav_text')

menu.onclick = function(){
    sidebar.classList.toggle('open_sidebar');
    main.classList.toggle('open_main')
}