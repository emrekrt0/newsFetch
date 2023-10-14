// router.js

window.addEventListener('hashchange', handleRoute);

const routes = {
    '/': {
        title: 'Anasayfa',
        template: 'index',
        callback: fetchTableRows,
    },
    '/spor': {
        title: 'Spor Türü',
        template: 'spor',
        callback: renderNewsDetail,
    },
    '/takim': { // Dinamik takım URL'si
        title: 'Takım',
        template: 'takim',
        callback: renderNewsDetail,
    },
    '/lig': { // Dinamik lig URL'si
        title: 'Lig',
        template: 'lig',
        callback: renderNewsDetail,
    },
    '/404': {
        title: 'Sayfa Bulunamadı',
        template: '404',
    }, 
};

const documentTitleSuffix = ' | sonra eklenecek';
const content = document.querySelector('.content');

async function handleRoute() {
    const url = location.hash.substring(1);
    const parts = url.split('/');
let routePath = parts[0];
const category = parts[1];
const league = parts[2];
const team = parts[3];

if (routePath === '') {
    routePath = '/';
}

const route = routes[routePath] || routes['/404'];
const params = getRouteParams(routePath, url);

document.title = route.title + documentTitleSuffix;

fetch(`/assets/templates/${route.template}.html`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Template not found');
        }
        return response.text();
    })
    .then((data) => {
        content.innerHTML = data;
        if (route.callback) {
            route.callback(params, category, league, team); // Callback'a yeni parametreleri ekleyin
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function getRouteParams(routePath, url) {
    const routeSegments = routePath.split('/');
    const urlSegments = url.split('/');

    const params = {};

    for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) {
            const paramName = routeSegments[i].substring(1);
            params[paramName] = urlSegments[i];
        }
    }

    return params;
}

// ...

// Diğer kodlar ve event listenerlar burada olacak.



const commentEl = document.querySelector('.comment-content');

document.querySelector('#comment-form').addEventListener('submit', bindForm)

function bindForm(e) {
   
   e.preventDefault();
      // console.log(Object.fromEntries(new FormData(document.querySelector('#comment-form'))));
      // Bu dataları aldıktan sonra fetch yapıp method post ile verileri gönder.

      document.querySelector('#comment-form').reset();
}

// const form = document.querySelector('#comment-form');

// form.addEventListener('submit', function(e) {
//    e.preventDefault();
//    const data = new FormData(form);
//    const formObject = Object.fromEntries(data);

//    fetch('supabaseApi', {
//       method: 'POST',
//       body: JSON.stringify({ data : formObject }),
//       headers: { '??'}
//       .catch(function () {
//          console.log('failed');
//       })
//       .then(function(r) {
//          return r.json();
//       })
//    })
// })