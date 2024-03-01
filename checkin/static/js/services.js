// start
document.addEventListener('DOMContentLoaded', function() {
    // drop-down menu
    // link content to its menu
    let menus = document.querySelectorAll('.drop-down-title-container');
    menus.forEach((menu) => {
        let content = menu.parentElement.children[1];
        let arrow = menu.children[1].children[0];
        content.height = content.clientHeight + content.style.marginTop.replace(/p/g, '').replace(/x/g, '');
        content.setAttribute('style', 'height: 0;');
        menu.content = content;
        menu.arrow = arrow;
    });

    // menus
    menus.forEach((menu) => {
        let content = menu.content;
        let arrow = menu.arrow;
        menu.addEventListener('click', function() {
            if (window.getComputedStyle(arrow).transform == 'matrix(-1, 0, 0, -1, 0, 0)')
            {
                content.setAttribute('style', 'height: ' + content.height.toString() + 'px; margin-top: 20px;');
                arrow.setAttribute('style', 'transform: rotate(0deg);')
            }
            else
            {
                content.setAttribute('style', 'height: 0;');
                arrow.setAttribute('style', 'transform: rotate(180deg);')
            }
        });
    });
});