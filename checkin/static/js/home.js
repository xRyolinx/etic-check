// global vars

let hero = {
    container : null,
    object : null,
    slide : 1,
    slides_num : 3,
    add : 1,
    timing : 0,
};
let testimonial = {
    object : null,
    slide : 1,
    slides_num : 3,
    add : 1,
    timing : 0,
};

// swipe
let touchstartX = 0;
let touchendX = 0;


    
function checkDirection() {
    // swipe suivant
    if (touchendX < touchstartX)
    {
        document.getElementById('suivant').click();
    }
    // swipe precedent
    if (touchendX > touchstartX)
    {
        document.getElementById('precedent').click();
    }
}


function carousel_bg(container)
{
    let width = container.object.clientWidth / container.slides_num;
    container.object.setAttribute('style', 'left: -' + (width * (container.slide - 1)).toString() + 'px;');
}

function carousel_title(object)
{
    // reset hero.titles
    object.titles.forEach(title => {
        title.removeAttribute('style');
    });

    // show title
    let title = object.titles[object.slide - 1];
    title.setAttribute('style', "display: block !important; animation: visible 1.5s; opacity: 1");
}


function carousel_buttons(object)
{
    // reset
    object.buttons.forEach(button => {
        button.removeAttribute('style');
    });

    // show button
    let button = object.buttons[object.slide - 1];
    button.setAttribute('style', 'background-color: var(--Ivory_White);');
}

function adjust_height() {
    let height_testi = document.querySelector('#testimonials-total').clientHeight;
    console.log(height_testi);
    document.querySelector('#testimonials').style.height = height_testi.toString() + 'px';
}

// start
document.addEventListener('DOMContentLoaded', function() {
    // Services boxes
    let image = document.querySelector('.service-title-container');
    let height = image.clientHeight / 2;

    let infos = document.querySelectorAll('.service-info');
    infos.forEach(info => {
        info.style.marginTop = height.toString() + 'px';
        info.style.minHeight = (info.clientWidth * 1.2).toString() + 'px';
    });

    let texts = document.querySelectorAll('.service-info-text');
    texts.forEach(text => {
        text.style.paddingTop = height.toString() + 'px';
    });



    // carousel hero
    hero.container = document.querySelector('.carousel');
    hero.object = document.getElementById('bg-home');
    hero.titles = document.querySelectorAll('.title');
    hero.buttons = document.querySelectorAll('.scroll-button');

    // carousel testimonial
    testimonial.object = document.getElementById('testimonials-total');
    testimonial.titles = document.querySelectorAll('.testimonial');

    setTimeout(adjust_height, 100);

    // // testimonials
    // let height_testi = testimonial.object.clientHeight;
    // document.querySelector('#testimonials').style.height = height_testi.toString() + 'px';

    // window
    window.addEventListener('resize', () => {
        carousel_bg(hero);
        carousel_bg(testimonial);
        adjust_height();
    });


    // go back hero
    document.getElementById('precedent').addEventListener('click', function() {
        if (hero.slide != 1)
        {
            // reset timing
            hero.timing = 0;

            // slide
            hero.slide--;
            carousel_bg(hero);
            carousel_title(hero);
            carousel_buttons(hero);
        }
    })
    
    // go forth hero
    document.getElementById('suivant').addEventListener('click', function() {
        if (hero.slide != 3)
        {
            // reset timing
            hero.timing = 0;

            // slide
            hero.slide++;
            carousel_bg(hero);
            carousel_title(hero);
            carousel_buttons(hero);
        }
    })

    // hero.buttons
    hero.buttons.forEach(button => {
        button.addEventListener('click', () => {
            hero.slide = parseInt(button.id);

            hero.add = 1;

            carousel_bg(hero);
            carousel_title(hero);
            carousel_buttons(hero);

            hero.timing = 0;
        });
    });

    // swipe hero
    hero.container.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    })
    
    hero.container.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
    })
    



    // go back testimonial
    document.getElementById('test-but-pre').addEventListener('click', function() {
        if (testimonial.slide != 1)
        {
            // reset timing
            testimonial.timing = 0;

            // slide
            testimonial.slide--;
            carousel_bg(testimonial);
            carousel_title(testimonial);
        }
    })
    
    // go forth testimonial
    document.getElementById('test-but-suiv').addEventListener('click', function() {
        if (testimonial.slide != 3)
        {
            // reset timing
            testimonial.timing = 0;

            // slide
            testimonial.slide++;
            carousel_bg(testimonial);
            carousel_title(testimonial);
        }
    })




    // autoscroll
    setInterval(function() {
        // add to timing
        hero.timing++;

        // return if not reach n seconds
        if (hero.timing < (hero.slides_num + 1))
        {
            return;
        }

        // else
        if (hero.slide == 1)
        {
            hero.add = 1;
        }
        else if (hero.slide == hero.slides_num)
        {
            hero.add = -1;
        }
        hero.slide += hero.add;

        carousel_bg(hero);
        carousel_title(hero);
        carousel_buttons(hero);

        hero.timing = 0;

    }, 1000);
})