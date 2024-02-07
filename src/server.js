const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port =3001;

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подгрузка статических файлов из папки build
app.use(express.static(path.join(__dirname, '..', 'build')));

// Обработка запроса к корневому URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Разрешаем запросы только с для dev-сервера
const corsOptions = {
  origin: 'http://localhost:3000',
};

// Middleware для обработки CORS
app.use(cors(corsOptions));

// Обработка запроса для проксирования
app.get('/api/ruz', async (req, res) => {
  try {
    const targetUrl = "https://ruz.fa.ru/api/schedule/group/110809/";
    const startDate = req.query.start || '';
    const endDate = req.query.finish || '';
    const lng = req.query.lng || '1';

    const fullUrl = `${targetUrl}?start=${startDate}&finish=${endDate}&lng=${lng}`;
    const response = await axios.get(fullUrl);
    const data = { data: response.data };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
