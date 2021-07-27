export default {
    props: null,
    setResultPage : function (props) {
        this.props = props
        this.setReusltNickName()
        this.setResultScore()
        this.setResultSecond()
        this.setBtnFocus()
    },
    setReusltNickName : function () {
        let el = document.querySelector("#resultNickName")
        let nick = "당신"

        if (this.props.nickName.trim().length > 0) {
            nick = this.props.nickName.trim() + "님"
        }

        if (el) {
            el.innerHTML = nick
        }
    },
    setResultScore : function () {
        let el = document.querySelector("#resultScore")
        if (el) {
            el.innerHTML = this.props.currentWord.score
        }
    },
    setResultSecond : function () {
        let el = document.querySelector("#resultSecond")
        let oCount = 0
        let sum = 0
        let averageTime = 0
        let message

        if (this.props.oxList) {
            this.props.oxList.forEach((ox, i) => {
                if (ox === true) {
                    oCount++
                    sum += this.props.timeList[i]
                }
            })
        }

        if (oCount > 0) {
            averageTime = (sum / oCount).toFixed(2)
            message = `단어당 평균 답변 시간은 ${averageTime}초 입니다.`
            this.setLatestRecord(averageTime);
        } else {
            message = '단어당 평균 답변 시간을 측정할 수 없습니다.'
        }

        if (el) {
            el.innerHTML = message
        }
    },
    setLatestRecord : function (time) {
        this.props.latestRecord.list.push({
            nickName: this.props.nickName,
            score: this.props.currentWord.score,
            time: time
        })
    },
    setBtnFocus : function () {
        document.querySelector("#resultBtn").focus()
    }
}