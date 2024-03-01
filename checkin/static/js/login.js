// cookie
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

// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// start
document.addEventListener('DOMContentLoaded', () => {
    // enter sur username
    document.querySelector('#username').addEventListener('keyup', (e) => {
        if (e.key == 'Enter')
        {
            document.querySelector('#mdp').focus();
        }
    });

    // enter sur mdp
    document.querySelector('#mdp').addEventListener('keyup', (e) => {
        if (e.key == 'Enter')
        {
            document.querySelector('#login-button').click();
        }
    });
    
    // login button
    document.querySelector('#login-button').addEventListener('click', async function () {
        // error
        let error = document.querySelector('#error');
        error.innerHTML = '';

        // get data
        let username = document.querySelector('#username');
        username.style.border = '2px solid transparent';
        
        if (! username.value)
        {
            username.style.border = '2px solid red';
        }

        let mdp = document.querySelector('#mdp');
        mdp.style.border = '2px solid transparent';
        if (! mdp.value)
        {
            mdp.style.border = '2px solid red';
        }

        if (! mdp.value || ! username.value)
        {
            return;
        }

        // create form data
        let data = new FormData();
        data.append('username', username.value);
        data.append('mdp', mdp.value);

        // get path
        let path = window.location.pathname;

        // fetch
        let result = await fetch(path, {
            method: "POST",
            body: data,
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            }
        });
        result = await result.json();

        // cnx
        if (result['login'] == 'Success')
        {
            window.location.pathname = 'events/';
        }
        else
        {
            error.innerHTML = 'Les indentifiants sont éronnés. Veuillez reessayer !';
        }

    });
});