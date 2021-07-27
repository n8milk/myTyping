export default {
    props: null,
    setHomePage : function (props) {
        this.props = props
        this.init()
        this.setQuizSizeBarEvent()
        this.removeInterval()
        this.activePlayBtn()
        this.makeCookie()
        this.setScoreBoard()
        this.setRecordBoardModeEvent()
        this.setInitRecordBoardEvent()
    },
    init : function () {
        this.props.currentWord = {
            index: 0,
            time: 0,
            score: 0,
            text: ""
        }
        this.props.nickName = ""
    },
    setQuizSizeBarEvent : function () {
        let quizSizeBarEl = document.querySelector("#quizSizeBar")
        let quizSizeEl = document.querySelector("#quizSize")

        quizSizeBarEl.value = quizSizeEl.innerHTML = this.props.quizSize

        quizSizeBarEl.addEventListener("change", (e) => {
            quizSizeEl.innerHTML = this.props.quizSize = e.target.value
        })
    },
    disabledPlayBtn : function () {
        let aEl = document.querySelector("#playBtn")
        let btnEl = document.querySelector("#playBtn button")

        aEl.href = "javascript:void(0)"
        btnEl.classList.value = btnEl.classList.value.replace("btn-primary", "btn-secondary")
    },
    activePlayBtn : function () {
        let that = this

        function startGame () {
            let nickNameEl = document.querySelector("#nickName")

            that.props.wordData = [...that.props.orgWordData]
            suffle(that.props.wordData)
            that.props.wordData.length = that.props.quizSize

            if (that.props.wordData && that.props.wordData.length) {
                let wordDataLen = that.props.wordData.length
                that.props.oxList = new Array(wordDataLen)
                that.props.timeList = new Array(wordDataLen)
            }

            that.props.nickName = nickNameEl.value

            window.location.hash = "#play"
        }

        function suffle (array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]
            }
        }

        let aEl = document.querySelector("#playBtn")
        let btnEl = document.querySelector("#playBtn button")

        aEl.onclick = startGame
        btnEl.classList.value = btnEl.classList.value.replace("btn-secondary", "btn-primary")
        btnEl.focus()
    },
    removeInterval : function () {
        if (this.props.interval) clearInterval(this.props.interval)
    },
    setScoreBoard : function () {
        this.alignRecordBoardList();
        this.makeRecordBoard();
        this.showRecordBoard(true);
    },
    alignRecordBoardList : function () {
        let recordBoardList = this.props.recordBoardList;
        let recordBoardMode = this.props.recordBoardMode;
        recordBoardList.sort(function (a, b) {
            return a[recordBoardMode] > b[recordBoardMode] ? -1 : a[recordBoardMode] < b[recordBoardMode] ? 1 : 0;
        });

        if (recordBoardMode === 'time') recordBoardList = recordBoardList.reverse();

        if (recordBoardList.length > 10) recordBoardList.length = 10;
    },
    makeRecordBoard : function () {
        let el = document.querySelector("#recordBoard");
        let recordBoardList = this.props.recordBoardList;
        let recordBoardMode = this.props.recordBoardMode;
        let recordBoardModeKr = recordBoardMode === 'score' ? '점수' : '시간';
        let html = `<div class="row border-bottom border-dark bg-warning">
                        <div class="col">순위</div>
                        <div class="col">닉네임</div>
                        <div class="col">${recordBoardModeKr}</div>
                      </div>`;

        recordBoardList.forEach((record, i) => {
            html += `<div class="row border-bottom border-dark">
                        <div class="col">${i + 1}</div>
                        <div class="col text-truncate">${record.nickName}</div>
                        <div class="col">${record[recordBoardMode]}</div>
                    </div>`;
        });

        el.innerHTML = html;
    },
    showRecordBoard : function (flag) {
        let el = document.querySelector("#recordBoardArea");
        let recordBoardList = this.props.recordBoardList;

        if (flag) {
            if (recordBoardList.length > 0) {
                el.classList.remove("d-none");
            } else {
                if (!el.classList.contains("d-none")) {
                    el.classList.add("d-none");
                }
            }
        } else {
            el.classList.add("d-none");
        }
    },
    setRecordBoardModeEvent : function () {
        function changeRecordBoardMode (element, elements) {
            return (e) => {
                elements.forEach(each => each.classList.remove("active"));
                element.classList.add("active");
                that.props.recordBoardMode = element.dataset.mode;
                that.setScoreBoard();
            }
        }
        let that = this;
        let els = document.querySelectorAll('.nav-link');
        els.forEach(el => {
            el.onclick = changeRecordBoardMode(el, els);
        });
    },
    setInitRecordBoardEvent : function () {
        let that = this;
        let el = document.querySelector('#initRecordBoard');
        el.onclick = function () {
            if(confirm("기록을 초기화하시겠습니까?")) {
                that.deleteCookie("recordBoardList");
                that.showRecordBoard(false);
            }
        }
    },
    makeCookie : function () {
        let recordBoardList = this.getCookie('recordBoardList');

        if (recordBoardList === null) {
            recordBoardList = [];
        } else {
            recordBoardList = JSON.parse(recordBoardList);
        }

        if (this.props.latestRecord.list.length > 0) {
            recordBoardList.push(this.props.latestRecord.list[0]);
            this.props.latestRecord.list = [];
        }

        this.props.recordBoardList = recordBoardList;

        if (recordBoardList.length > 0) {
            this.setCookie('recordBoardList', JSON.stringify(recordBoardList), 1);
        }
    },
    setCookie : function(name, value, day) {
        let date = new Date();
        date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    },
    getCookie : function(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    },
    deleteCookie : function(name) {
        let date = new Date();
        document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
    }
}