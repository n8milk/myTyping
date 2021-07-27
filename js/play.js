import homePage from "./home";

export default {
    props: null,
    setPlayPage : function (props) {
        this.props = props
        this.setInput() // input 설정
        this.runGame() // 게임 시작
    },
    setInput : function () {
        let answerEl = document.querySelector("#answer")
        let that = this

        function setInputFocus () {

            answerEl.focus()
        }

        function setInputEvent () {

            function checkCorrectAnswer (answer) {
                let index = that.props.currentWord.index
                answerEl.value = ""

                if (answer === that.props.currentWord.text) {
                    that.props.end = new Date()
                    that.props.oxList[index] = true
                    that.props.timeList[index] = (that.props.end - that.props.start) / 1000
                    that.setNextWord()
                }
            }

            answerEl.addEventListener("keyup", (e) => {
                // enter 입력
                if (e.keyCode === 13) {
                    checkCorrectAnswer(e.target.value)
                }
            })
        }

        setInputFocus()
        setInputEvent()
    },
    runGame : function () {
        // init
        let scoreEl = document.querySelector("#score")
        scoreEl.innerHTML = this.props.currentWord.score = this.props.wordData.length
        this.setCurrentWord(0)

        this.countdown() // start countdown
    },
    setNextWord : function () {
        this.setCurrentWord(++this.props.currentWord.index)
        this.countdown()
    },
    countdown : function () {
        let timeEl = document.querySelector("#time")
        let scoreEl = document.querySelector("#score")
        let that = this

        homePage.removeInterval()

        this.props.interval = setInterval(function () {

            if (that.validIndex(that.props.currentWord.index)) {
                timeEl.innerHTML = that.props.currentWord.time -= 1

                if (that.props.currentWord.time <= 0) {
                    scoreEl.innerHTML = that.props.currentWord.score -= 1  // 감점
                    that.setNextWord()
                }
            }
        }, 1000)
    },
    setCurrentWord : function (index) {
        let timeEl = document.querySelector("#time")
        let textEl = document.querySelector("#text")

        if (!this.validIndex(index)) return false;

        this.props.start = new Date()
        this.props.end = null
        this.props.currentWord.index = index
        timeEl.innerHTML = this.props.currentWord.time = this.props.wordData[index].second
        textEl.innerHTML = this.props.currentWord.text = this.props.wordData[index].text
    },
    validIndex : function (index) {
        if (this.props && this.props.wordData && index === this.props.wordData.length) {
            clearInterval(this.props.interval)
            this.props.start = this.props.end = null
            window.location.hash = "#result" // 결과 화면으로 이동
            return false
        }
        return true
    }
}