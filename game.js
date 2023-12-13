// game.js

let gameData = {}; // 데이터를 저장할 전역 변수
let currentTheme = "general";
let currentDifficulty = "easy";
let currentGameData = {}; // 변경된 변수명
let questionElement = document.getElementById("question");
let answerInput = document.getElementById("answer-input");
let resultElement = document.getElementById("result");
let currentQuestionIndex = 0;
let timerInterval;

function startGame() {
    // JSON 파일 로드
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            gameData = data;
            initializeGameData();
            showQuestion();
        })
        .catch(error => console.error('Error loading data:', error));
}

function initializeGameData() {
    // 선택된 주제 및 난이도에 따라 데이터를 설정
    const themeSelect = document.getElementById("theme-select");
    const difficultySelect = document.getElementById("difficulty-select");
    currentTheme = themeSelect.value;
    currentDifficulty = difficultySelect.value;

    // 선택한 테마와 난이도에 대한 데이터가 있는지 확인
    if (gameData[currentTheme] && gameData[currentTheme][currentDifficulty]) {
        currentGameData = gameData[currentTheme][currentDifficulty]; // 변경된 변수명
        currentQuestionIndex = 0;
        showQuestion();
    } else {
        console.error(`Data not found for theme: ${currentTheme}, difficulty: ${currentDifficulty}`);
        endGame(); // 데이터가 없으면 게임 종료
    }
}

function changeTheme() {
    // 주제 변경 시 게임 초기화
    initializeGameData();
    showQuestion();
}

function changeDifficulty() {
    // 난이도 변경 시 게임 초기화
    initializeGameData();
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < currentGameData.length) {
        const currentQuestion = currentGameData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        // 타이머 업데이트
        updateTimer(10); // 여기에 원하는 시간(초)을 넣으세요
    } else {
        endGame();
    }
}

function updateTimer(seconds) {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `남은 시간: ${seconds}초`;

    // 이미 실행 중인 타이머가 있다면 중지
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        seconds--;

        if (seconds <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "";
            showQuestion();
        } else {
            timerElement.textContent = `남은 시간: ${seconds}초`;
        }
    }, 1000);
}

function checkAnswer() {
    const currentQuestion = currentGameData[currentQuestionIndex];
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "정답입니다!";
    } else {
        resultElement.textContent = `틀렸습니다. 정답은 "${currentQuestion.answer}"입니다.`;
    }

    // 다음 문제로 이동
    currentQuestionIndex++;
    setTimeout(() => {
        resultElement.textContent = "";
        answerInput.value = "";
        showQuestion();
    }, 2000);

    // 폼 제출 후 페이지 새로고침 방지
    return false;
}

function endGame() {
    questionElement.textContent = "게임 종료!";
    answerInput.disabled = true;
}

function resetGame() {
    currentQuestionIndex = 0;
    answerInput.disabled = false;
    initializeGameData();
    showQuestion();
}

function addNewData() {
    const newThemeInput = document.getElementById("new-theme");
    const newDifficultyInput = document.getElementById("new-difficulty");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    const newTheme = newThemeInput.value.trim();
    const newDifficulty = newDifficultyInput.value.trim();
    const newQuestion = newQuestionInput.value.trim();
    const newAnswer = newAnswerInput.value.trim();

    if (newTheme && newDifficulty && newQuestion && newAnswer) {
        // 새로운 주제 및 난이도가 없다면 추가
        if (!gameData[newTheme]) {
            gameData[newTheme] = {};
        }
        if (!gameData[newTheme][newDifficulty]) {
            gameData[newTheme][newDifficulty] = [];
        }

        // 새로운 데이터 추가
        gameData[newTheme][newDifficulty].push({ question: newQuestion, answer: newAnswer });

        // 사용자 입력 초기화
        newThemeInput.value = "";
        newDifficultyInput.value = "";
        newQuestionInput.value = "";
        newAnswerInput.value = "";

        // 성공 메시지 표시
        alert("데이터가 성공적으로 추가되었습니다.");
    } else {
        // 필수 입력 필드가 비어있을 경우 경고 메시지 표시
        alert("주제, 난이도, 문제, 답변을 모두 입력하세요.");
    }
}

// 게임 시작
startGame();
