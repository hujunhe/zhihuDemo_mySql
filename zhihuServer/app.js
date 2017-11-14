const express = require('express');
const apiRouter = require('./controller/apiRouter'); //api路由
const pageRouter = require('./controller/pageRouter'); //api路由
const bodyParser = require('body-parser'); //post请求
const cookieParser = require('cookie-parser');
const session = require('express-session');

let app = express();
//设置session
app.use(session({
  secret: "hujunhe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 360000 //过期时间
  }
}));
//设置cookie
app.use(cookieParser());
//设置使用post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','jade');
app.use("/static",express.static("./static"));
//api接口
apiRouter(app);
//pageRouter(app);
app.listen(3000);
console.log("知乎服务器已启动");
