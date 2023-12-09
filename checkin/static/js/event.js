// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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

// load
async function fetch_participants() {
    // get path
    let path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 2];

    // fetch
    let result = await fetch('/events/api/' + path + '/', {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    
    result = await result.json();
    participants = result['participants'];

    return participants;
}

// update
async function update_presence(participants) {
    let new_participants = await fetch_participants();
    for (let i = 0 ; i < participants.length ; i++)
    {
        // vars
        let presence = new_participants[i].present;
        let span = participants[i].node.children[2].children[0];
        // if update
        if (participants[i].present != presence)
        {
            participants[i].present = presence;
            if (presence)
            {
                span.innerHTML = 'X';
            }
            else
            {
                span.innerHTML = '&nbsp;';
            }
        }
    }
}

// start
document.addEventListener("DOMContentLoaded", function () { 
    // participants container
    let details = document.querySelector('#details');
    
    // participants
    fetch_participants()
    .then((participants) => {
        // render participants
        participants.forEach(participant => {
            // create node
            let nouveau = document.createElement('article');
            nouveau.id = participant.id;
            // presence
            let x = '&nbsp;';
            if (participant.present)
            {
                x = 'X';
            }
            // insert informations
            nouveau.innerHTML = `
                <p>${participant.nom}</p>
                <p>${participant.prenom}</p>
                <div class="presence">
                    <span>${x}</span>
                </div>
            `;
            // insert to dom
            details.append(nouveau);

            // add node to our var
            participant.node = nouveau;
        });

        // button present
        participants.forEach(participant => {
            let button = participant.node.children[2].children[0];
            button.addEventListener('click', () => {
                // get id of person
                let id = participant.id.replace(/p/g, '');

                let data = new FormData();
                data.append('id', id);

                // get path
                let path = window.location.pathname;
                path = path.split('/');
                path = path[path.length - 2];

                // send
                fetch('/events/api/presence/' + path + '/', {
                    method: "POST",
                    body: data,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    }
                });
            });
        });

        // check updates
        setInterval(() => {
            update_presence(participants)
        }, 200);
    })


    // search
    document.querySelector('#search').addEventListener('keyup', (e) => {
        // get tous les noms/prénoms de la recherche
        let searched = e.target.value.split(' ');
        
        // for each node
        let articles = [];
        for (let i = 0; i < details.childElementCount; i++)
        {
            articles.push(details.children[i]);
        }
        articles.forEach(article => {
            // re-enable article
            article.removeAttribute('style');

            // if there is a search
            if (e.target.value)
            {
                // disable article
                article.style.display = 'none';
            
                // get tous les noms/prénoms de l'article
                let nom = article.children[0].innerText;
                let names = article.children[1].innerText.split(' ');
                names.push(nom);
                
                // check each name
                names.forEach(name => {
                    // with each searched
                    searched.forEach(s => {
                        if (name.toUpperCase().includes(s.toUpperCase())) {
                            article.removeAttribute('style');
                        }
                    });
                });
            }
        });
    });


    // If found you qr code 
    let previous = null;
    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText == previous)
        {
            return;
        }
        // save previous
        previous = decodeText;

        // vars
        let nom = document.querySelector('#nom');
        let prenom = document.querySelector('#prenom');
        let etat = document.querySelector('#etat');

        // reset
        nom.innerText = '';
        prenom.innerText = '';
        nom.removeAttribute('style');
        prenom.removeAttribute('style');

        etat.innerText = '';

        // write results
        let result = decodeText.toString().split(" ");
        let i = 0;
        result.forEach(word => {
            // nom
            if (i == 0)
            {
                nom.innerText = word;
            }
            // prénom
            else
            {
                prenom.innerText = document.querySelector('#prenom').innerText + ' ' + word;
            }
            i = 1;
        });

        // check with participants
        let found = false;
        let is_there = false;

        // for each node
        let articles = [];
        for (let i = 0; i < details.childElementCount; i++)
        {
            articles.push(details.children[i]);
        }

        articles.forEach(article => {
            let span = article.children[2].children[0];
            if (article.children[0].innerText == nom.innerText
                && article.children[1].innerText == prenom.innerText)
            {
                found = true;

                // check if he came
                if (span.innerText == 'X') {
                    is_there = true;
                    found = false;
                }
                else {
                    span.click();
                }
            }
        });

        if (found) {
            etat.innerText = 'Succes !';
            etat.style.color = 'var(--vert)';
        }
        else {
            // colors
            etat.style.color = 'var(--rouge)';
            nom.style.color = 'var(--rouge)';
            prenom.style.color = 'var(--rouge)';
            // inputs
            if (! is_there)
            {
                etat.innerText = "Le participant n'existe pas !";
            }
            else
            {
                etat.innerText = "Le participant est deja présent !";
            }
        }
    }
  
    let htmlscanner = new Html5QrcodeScanner( 
        "my-qr-reader", 
        { fps: 10, qrbos: 250 } 
    ); 


    // scan
    document.querySelector('#scan-button').addEventListener('click', async function () {
        previous = null;
        htmlscanner.render(onScanSuccess);
        document.querySelector('.section').style.display = 'block';
        
        let check1 = false;
        let check2 = false;
        while (!check1 || !check2)
        {
            // button
            let butt = document.querySelector('#html5-qrcode-button-camera-stop');
            if (butt && !check1)
            {
                // butt.style.backgroundColor = 'violet';
                butt.addEventListener('click', () => {
                    htmlscanner.clear();
                    document.querySelector('.section').style.display = 'none';
                    // class to container back to normal (pour l'image de chargement au prochain lancement)
                    document.querySelector('#my-qr-reader').style.display = 'block';
                })
                check1 = true;
            }

            // after video loaded
            let vid = document.querySelector('video');
            if (vid && !check2)
            {
                // class to container
                document.querySelector('#my-qr-reader').style.display = 'flex';

                // class to scan container
                document.querySelector('#my-qr-reader__scan_region').classList.add('vid-container');

                // class to button container
                document.querySelector('#my-qr-reader__dashboard').style.backgroundColor = 'var(--beige)';


                // insert child 'result'
                let child = document.createElement('div');
                child.id = 'qr-result-container';
                child.innerHTML = `
                    <h3>Résultat :</h3>
                    <div id="qr-result">
                        <p id="nom-p">Nom : <span id="nom"></span></p>
                        <p id="prenom-p">Prénom : <span id="prenom"></span></p>
                        <p id="etat-p">État : <span id="etat"></span></p>
                    </div>
                `;
                let div = document.querySelector('#my-qr-reader__dashboard');
                div.prepend(child);
                check2 = true;
            }

            await sleep(200);
        }
    });
});