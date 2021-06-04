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

app.get(API.productDetail.url, upload.array(), async (req, res) => {
    console.log(req.params.id);
    await sleep(500);
    res.status(200);
    res.json({
        id: Number(req.params.id),
        name: 'CHANEL N°5',
        description: 'N°5，女性魅力的極致精髓。散發柔美澄透的乙醛花束香氣。經典傳奇香氛，蘊藏於極簡設計的獨特瓶身。',
        price: 4980,
        imageUrl: [
            'https://hexschool.github.io/webLayoutTraining1st/perfume-week6/product1.jpg',
            'https://hexschool.github.io/webLayoutTraining1st/perfume-week6/product2.jpg',
            'https://hexschool.github.io/webLayoutTraining1st/perfume-week6/product3.jpg',
            'https://hexschool.github.io/webLayoutTraining1st/perfume-week6/product1.jpg'
        ]
    });
});

app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`));
