let currentQuestion = '';
let currentAnswer = '';
let difficulty = 'easy';
let topic = 'general';
const resultMessageElement = document.getElementById('resultMessage');

function loadWord() {
    fetch(`/api/word?difficulty=${difficulty}&topic=${topic}`)
        .then(response => response.json())
        .then(data => {
            currentQuestion = data.question;
            currentAnswer = data.answer;
            displayQuestion();
        })
        .catch(error => console.error('Error fetching word:', error));
}

function displayQuestion() {
    document.getElementById('question').innerText = currentQuestion;
}

function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.toLowerCase();
    if (userAnswer === currentAnswer.toLowerCase()) {
        resultMessageElement.innerText = '정답입니다!';
        loadWord(); // 정답이면 다음 단어로 넘어감
    } else {
        resultMessageElement.innerText = '틀렸습니다. 다시 시도해보세요.';
    }
}

function changeDifficulty() {
    difficulty = document.getElementById('difficulty').value;
    resultMessageElement.innerText = '';
    loadWord(); // 난이도 변경 시 다음 단어로 넘어감
}

function changeTopic() {
    topic = document.getElementById('topic').value;
    resultMessageElement.innerText = '';
    loadWord(); // 주제 변경 시 다음 단어로 넘어감
}

function init() {
    loadWord();
}

window.onload = init;
