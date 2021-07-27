import props from './js/props'
import homePage from './js/home'
import playPage from './js/play'
import resultPage from './js/result'

// css
require('./css/style.css')

// router
const {
    initialRoutes,
    hashRouterPush
} = require('./router')

// properties
const contentArea = document.querySelector('#content-area') // app division

// Browser History
initialRoutes(contentArea)

window.onload = () => {
    window.location.hash = "" // 새로고침 시, 첫 화면
    homePage.disabledPlayBtn(); // 데이터 수신 전까지 플레이 버튼 비활성화

    props.orgWordData = [
        { second: 3, text: "안녕" },
        { second: 5, text: "하세요" },
        { second: 3, text: "이걸" },
        { second: 5, text: "심심해서" },
        { second: 4, text: "만들긴" },
        { second: 4, text: "했는데" },
        { second: 6, text: "잘되나" },
        { second: 7, text: "모르겠" },
        { second: 4, text: "습니다." }
    ];
    homePage.setHomePage(props)
}

window.onhashchange = () => {

    hashRouterPush(contentArea) // 화면 변경

    let hash = window.location.hash.replace("#", "")

    switch (hash) {
        case "":
            homePage.setHomePage(props)
            break

        case "play":
            playPage.setPlayPage(props)
            break

        case "result":
            resultPage.setResultPage(props)
            break
    }
}