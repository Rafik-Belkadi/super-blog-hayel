/*
* Variables 
*/

var posts = []
const articlesDiv = document.getElementById('articles');
const postForm = document.getElementById('post-form')
/**
 * function to get posts
**/
const getPosts = () => {
    // Fonction pour faire appel à une API
    // Prend en paramètre (url, config?)
    // Retourne une promesse (Promise)
    // On peut executer la fonction then() et catch() sur une promesse
    // then s'execute dans le cas ou on retourne une valeur
    // catch dans le cas d'une erreur
    fetch('https://jsonplaceholder.typicode.com/posts')
        // On convertie la reponse obtenu en format json
        .then((response) => response.json())
        // On utilise les données convertis
        .then((data) => {
            // Assiger à la variable data les données
            posts = data
            // Injecter dans l'html avec la fonction
            injectHtml(articlesDiv, posts)
        })
}
/**
 * function to inject Posts to html
**/
const injectHtml = (div, data) => {
    // Variable pour contenir le contenu des cards
    var html = ''
    // On boucle sur le tableau des posts en params "data"
    for (let index = 0; index < data.length; index++) {
        // On récupére titre.... depuis l'object courrant
        const { title, body, id } = data[index];
        // On concatène à la variable html l'html d'une card
        html += `<div id="article-${id}" class="article-card">
                    <img class="article-image" src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="" srcset="">
                    <div class="article-details">
                        <span class="date">2021.09.18</span>
                        <h2 class="article-title">${title}</h2>
                        <p class="article-content">${body}</p>
                    </div>
                </div>`
    }
    // J'injecte dans la div l'html concaténé
    div.innerHTML = html
}

/**
 * function to submit  form
**/
const submitPost = (event) => {
    event.preventDefault();
    var spinner = document.getElementById('spinner')
    var formBody = document.getElementById('form-body')
    var alertDiv = document.getElementById('alert')
    spinner.style.display = "block";
    formBody.style.display = "none";
    var data = {
        title: document.getElementById('input-title').value,
        body: document.getElementById('input-content').value,
        userId: 54
    }

    // SEND POST REQUEST
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(newPost => {
            spinner.style.display = "none";
            formBody.style.display = "block";
            alertDiv.style.display = "block";
            const { id, title, body } = newPost
            posts.unshift(newPost)
            posts.unshift(newPost)
            var content = `<div id="article-${id}" class="article-card">
                    <img class="article-image" src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="" srcset="">
                    <div class="article-details">
                        <span class="date">2021.09.18</span>
                        <h2 class="article-title">${title}</h2>
                        <p class="article-content">${body}</p>
                    </div>
                </div>`
            articlesDiv.innerHTML = content + articlesDiv.innerHTML
            setTimeout(() => {
                alertDiv.style.display = "none";
            }, 3000);
        })
        .catch(err => console.log(err))


}

// ----------------------------
// THIS PART EXECUTES ON PAGE LOAD
// ----------------------------

// Get Posts Data and fill posts array
getPosts();
// Added event listener for submit form
postForm.addEventListener('submit', submitPost)