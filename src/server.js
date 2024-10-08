const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const https = require("https");

const app = express();
const port = 3001;

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подгрузка статических файлов из папки build
app.use(express.static(path.join(__dirname, "..", "build")));

// Обработка запроса к корневому URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Разрешаем запросы для dev-сервера
const corsOptions = {
  origin: "*",
};

// Middleware для обработки CORS
app.use(cors(corsOptions));

const groupAliases = {
  "ПИ21-5": 137271,
  "ПИ21-2": 110809,
};

let countQueries = 0;

// Обработка запроса для проксирования
app.get("/api/ruz", async (req, res) => {
  try {
    countQueries++;
    console.log(countQueries);
    
    const targetUrl =
      "https://ruz.fa.ru/api/schedule/group/" + groupAliases["ПИ21-5"];
    const startDate = req.query.start || "";
    const endDate = req.query.finish || "";
    const lng = req.query.lng || "1";

    const fullUrl = `${targetUrl}?start=${startDate}&finish=${endDate}&lng=${lng}`;
    const response = await axios
      .get(fullUrl, {
        rejectUnauthorized: false,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
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
