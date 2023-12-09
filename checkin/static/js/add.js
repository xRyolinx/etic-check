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


async function send(data)
{
    // path
    let route = window.location.pathname;

    // fetch
    let result = await fetch(route, {
        method: "POST",
        body : data,
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    result = await result.json();

    // resultat
    if (result['status'] == 'OK')
    {
        let lien = result['lien'];
        window.location.pathname = lien;
    }
    else
    {
        alert("Une erreur s'est produite, veuillez ressayer!");
    }
}

// start
document.addEventListener('DOMContentLoaded', () => {
    // colors
    let colors = document.querySelectorAll('.id2');
    colors.forEach(color => {
        color.addEventListener('keyup', () => {
            let carre = color.parentElement.children[1];
            carre.style.backgroundColor = color.value;
        });
    });

    // click on file
    let div = document.querySelector('#excel');
    let file = document.querySelector('#excel-file');
    div.addEventListener('click', () => {
        file.click();
    });

    // file
    file.addEventListener('change', () => {
        div.removeAttribute('style');

        extension = file.value.substring(file.value.lastIndexOf('.') + 1);
        if (['xlsx'].includes(extension) )
        {
            div.innerHTML = file.value;
            div.style.color = 'black';
        }
        else
        {
            div.innerHTML = "Le fichier doit etre de format .xlsx!";
            div.style.color = 'red';
            // it deletes the file
            file.value = '';
        }
    });

    // confirmer
    let button = document.querySelector('#confirmer');
    button.addEventListener('click', () => {
        // reset inputs
        div.removeAttribute('style');

        // verifier les inputs
        let inputs = document.querySelectorAll('input');
        let check = true;
        inputs.forEach(input => {
            // reset inputs
            input.removeAttribute('style');
            if (input.name == 'cp' || input.name == 'cs')
            {
                input.parentElement.removeAttribute('style');
            }
            // check inputs
            if (! input.value)
            {
                check = false;

                if (input.name == 'excel')
                {
                    div.style.border = '2px solid red';
                }
                else if (input.name == 'cp' || input.name == 'cs')
                {
                    input.parentElement.style.border = '2px solid red';
                }
                else
                {
                    input.style.border = '2px solid red';
                }
            }
        });
        // if not all inputs are filled
        if (check == false)
        {
            return;
        }

        // add data
        let data = new FormData();
        inputs.forEach(input => {
            if (input.name == 'lien')
            {
                input.value = input.value.toLowerCase();
            }
            if (input.name == 'excel')
            {
                data.append(input.name, input.files[0]);
            }
            else
            {
                data.append(input.name, input.value);
            }
        });

        // send data
        send(data);
    });
});