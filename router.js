const homeTemplate = require('./template/home.hbs')
const playTemplate = require('./template/play.hbs')
const resultTemplate = require('./template/result.hbs')

const Home = homeTemplate()
const Play = playTemplate()
const Result = resultTemplate()

const routes = {
    '/': Home,
    '/play': Play,
    '/result': Result
}

function renderHTML (el, route) {
    el.innerHTML = route
}

// init
function initialRoutes (el) {
    renderHTML(el, routes['/'])
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
}

// get hash history route
function getHashRoute () {
    let route = '/'

    Object.keys(routes).forEach(hashRoute => {
        if (window.location.hash.replace('#', '') === hashRoute.replace('/', '')) {
            route = routes[hashRoute]
        }
    })

    return route
}

// set hash history
function hashRouterPush (el) {
    renderHTML(el, getHashRoute())
}

module.exports = {
    initialRoutes,
    hashRouterPush
}