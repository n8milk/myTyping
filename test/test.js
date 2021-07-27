import props from '../js/props'
import home from '../js/home'
import play from '../js/play'
import result from '../js/result'
import { JSDOM } from 'jsdom'
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

let i

props.currentWord = {
    index: 1,
    time: 1,
    score: 1,
    text: "1"
};
props.quizSize = 1;
props.nickName = "nick";
props.orgWordData = [{ second: 8, text: "안녕" }, { second: 10, text: "프론트엔드" }];
home.props = props;


test("home - init()", () => {
    let quizSizeBarEl = {
        value: "",
        addEventListener: jest.fn().mockReturnValueOnce(null)
    };
    let quizSizeEl = { innerHTML: "" };
    let playBtnEl = { href: "", onclick: null };
    let playBtnButtonEl = {
        innerHTML: "",
        classList: { value: ""},
        focus: jest.fn().mockReturnValueOnce(null)
    };
    let nickNameEl = { value: "" };
    let recordBoardEl = { innerHTML: "" };
    let recordBoardAreaEl = {
        classList: {
            add: jest.fn().mockReturnValueOnce(null),
            remove: jest.fn().mockReturnValueOnce(null),
            contains: jest.fn().mockReturnValueOnce(null)
        }
    };
    let initRecordBoardEl = {
        onclick: jest.fn().mockReturnValueOnce(null)
    };
    let navLinkEl = {
        forEach: jest.fn().mockReturnValueOnce(null)
    };
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
        switch (selector) {
            case '#quizSizeBar':
                return quizSizeBarEl;
            case '#quizSize':
                return quizSizeEl;
            case '#playBtn':
                return playBtnEl;
            case '#playBtn button':
                return playBtnButtonEl;
            case '#nickName':
                return nickNameEl;
            case '#recordBoard':
                return recordBoardEl;
            case '#recordBoardArea':
                return recordBoardAreaEl;
            case '#initRecordBoard':
                return initRecordBoardEl;
        }
    });
    jest.spyOn(document, 'querySelectorAll').mockImplementation((selector) => {
        switch (selector) {
            case '.nav-link':
                return navLinkEl;
        }
    });

    home.setHomePage(props);
    expect(props.currentWord.index).toBe(0);
    expect(props.currentWord.time).toBe(0);
    expect(props.currentWord.score).toBe(0);
    expect(props.currentWord.text).toBe("");
    expect(props.nickName).toBe("");

    playBtnEl.onclick();

    props.interval = i = setInterval(function () {
    }, 2000)
    expect(props.interval).toEqual(i);

    home.removeInterval();
    expect(props.interval).toEqual(undefined);

    home.disabledPlayBtn();
    expect(playBtnEl.href).toBe("javascript:void(0)");
    expect(playBtnButtonEl.classList.value).toBe("");

    home.setRecordBoardModeEvent();
});


test("play - validIndex()", () => {
    let answerEl = {
        innerHTML: "",
        focus: jest.fn().mockReturnValueOnce(null),
        addEventListener: jest.fn().mockReturnValueOnce(null)
    };
    let scoreEl = { innerHTML: "" };
    let timeEl = { innerHTML: "" };
    let textEl = { innerHTML: "" };
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
        switch (selector) {
            case '#answer':
                return answerEl;
            case '#score':
                return scoreEl;
            case '#time':
                return timeEl;
            case '#text':
                return textEl;
        }
    });

    play.setPlayPage(props)

    play.setNextWord();
    expect(play.props.currentWord.index).toBe(1);
    expect(window.location.hash).toBe("#result");

    play.props.currentWord.index = 0
    jest.useFakeTimers();
    play.countdown();
    jest.runAllTimers();
});

test("result - setResultPage()", () => {
    let resultNickNameEl = { innerHTML: "" };
    let resultScoreEl = { innerHTML: "" };
    let resultSecondEl = { innerHTML: "" };
    let resultBtnEl = {
        focus: jest.fn().mockReturnValueOnce(null)
    };
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
        switch (selector) {
            case '#resultNickName':
                return resultNickNameEl;
            case '#resultScore':
                return resultScoreEl;
            case '#resultSecond':
                return resultSecondEl;
            case '#resultBtn':
                return resultBtnEl;
        }
    });


    result.setResultPage(props);
    expect(resultNickNameEl.innerHTML).toBe("당신");
    expect(resultScoreEl.innerHTML).toBe(0);
    expect(resultSecondEl.innerHTML).toBe('단어당 평균 답변 시간을 측정할 수 없습니다.');
   
    result.props.nickName = "하이";
    result.setReusltNickName();
    expect(resultNickNameEl.innerHTML).toBe("하이님");


    let averageTime = 1.2345
    result.props.oxList = [true]
    result.props.timeList = [averageTime]
    result.setResultSecond()
    expect(resultSecondEl.innerHTML).toBe(`단어당 평균 답변 시간은 ${averageTime.toFixed(2)}초 입니다.`);
});
