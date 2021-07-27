export default {
    nickName: "",
    quizSize: 12,
    interval: null,
    orgWordData: null,
    wordData: null,
    currentWord: {
        index: 0,   // 현재 word index
        time: 0,    // 남은 시간
        score: 0,   // 점수
        text: ""    // 단어
    },
    start: null,
    end: null,
    oxList: null,
    timeList: null,
    latestRecord: {
        list: []
    },
    recordBoardList: [],
    recordBoardMode: 'score' // 점수판 모드 (score, time)
}