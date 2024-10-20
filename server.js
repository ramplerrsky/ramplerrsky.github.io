const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/boosters', { useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = new mongoose.Schema({
    clicks: { type: Number, default: 0 }
});

const Score = mongoose.model('Score', scoreSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Эндпоинт для увеличения счета
app.post('/increment', async (req, res) => {
    const { score } = req.body;

    // Сохранение или обновление счета в базе данных
    let currentScore = await Score.findOne();
    if (!currentScore) {
        currentScore = new Score();
    }
    currentScore.clicks += score;
    await currentScore.save();
    res.status(200).json({ message: 'Счет обновлен!', totalClicks: currentScore.clicks });
});

// Эндпоинт для покупки бустера
app.post('/buyBoost', async (req, res) => {
    const { score } = req.body;

    // Обновление счета в базе данных
    let currentScore = await Score.findOne();
    if (!currentScore) {
        return res.status(404).json({ message: 'Счет не найден!' });
    }

    currentScore.clicks = score; // Обновляем счет
    await currentScore.save();

    res.status(200).json({ message: 'Бустер куплен!', totalClicks: currentScore.clicks });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Сервер запущен на http://localhost:${PORT}");
});
