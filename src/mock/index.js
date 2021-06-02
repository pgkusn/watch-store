const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // 接收 json 資料
app.use(express.urlencoded({ extended: false })); // 接收 form urlencoded 的資料

const multer = require('multer');
const upload = multer();

// cors 處理
const cors = require('./utils/cors');
app.use('/*', cors);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const API = require('../api');
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

app.get(API.product.url, upload.array(), async (req, res) => {
    await sleep(500);
    res.status(200);
    res.json(require('./products.json'));
});

app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`));
