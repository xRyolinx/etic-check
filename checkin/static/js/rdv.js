function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function send(data, route)
{
    // fetch
    let result = await fetch(route, {
        method: "POST",
        body : data,
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    result = await result.json();

    // afficher resultat du message
    let status = document.getElementById('status');
    if (result['status'] == 'OK')
    {
        status.style.color = "green";
        status.innerHTML = "Message envoyé!";
    }
    else
    {
        status.style.color = "red";
        status.innerHTML = "Une erreur s'est produite, veuillez ressayer!";
    }
}


// start
document.addEventListener('DOMContentLoaded', function() {
    // form
    let form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        // arreter
        event.preventDefault();
        let status = document.getElementById('status');
        status.innerHTML = '';

        // route
        let route = form.action;
    
        // var
        let check = true;
        let inputs = document.querySelectorAll('input');
        let msg = document.querySelector('textarea');
        let select = document.querySelector('select');

        // afficher erreur
        for (let i = 0 ; i < inputs.length ; i++)
        {
            if (inputs[i].name == "csrfmiddlewaretoken")
            {
                delete inputs[i];
            }
            else
            {
                inputs[i].removeAttribute('style');
                if (! inputs[i].value && inputs[i].name != 'email')
                {
                    inputs[i].setAttribute("style", "border: solid 1.5px red;");
                    check = false;
                }
            }
        }
        // service
        select.parentElement.removeAttribute('style');
        if (select.value == 'service' || ! select.value)
        {
            select.parentElement.setAttribute("style", "border: solid 1.5px red;");
            check = false;
        }
        
        // formulaire envoyé
        if (check == true)
        {
            // Creer data et vider les champs
            // inputs
            let data = new FormData();
            for (let i = 0 ; i < inputs.length ; i++)
            {
                data.append(inputs[i].name, inputs[i].value);
                inputs[i].value = '';
            }

            // select
            data.append(select.name, select.value);
            select.selectedIndex = 0;
            
            // envoyer
            send(data, route);
        }
    });
});