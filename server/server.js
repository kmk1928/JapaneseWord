const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

const wordsData = require('../data/words.json');

app.get('/api/word', (req, res) => {
    const difficulty = req.query.difficulty || 'easy';
    const topic = req.query.topic || 'general';

    const wordList = wordsData[difficulty] || wordsData['easy'];
    const filteredWords = wordList.filter(word => word.topic === topic || word.topic === 'general');

    if (filteredWords.length === 0) {
        // 해당 난이도와 주제에 맞는 단어가 없을 경우 기본으로 general 난이도에서 가져옴
        res.json(wordsData['easy'][0]);
    } else {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const selectedWord = wordList[randomIndex];

        res.json({
            question: selectedWord.question,
            answer: selectedWord.answer
        });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
