const routerApi = require('./router');
const bodyParser = require('body-parser'); 
const express = require('express');
const app = express();
app.use(bodyParser.json());

// 後端api路由
app.use('/api', routerApi);
// 監聽埠
app.listen(3000);
console.log('success listen at port:3000......');
