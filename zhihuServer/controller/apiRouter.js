const business = require('./business');


function apiRouter(app){
  //注册用户
  app.post('/signIn',business.sign);
  //用户登陆
  app.post('/logIn',business.login);
  //用户登出
  app.get('/logOut',business.logOut);
  //用户登陆状态
  app.get('/loginStatus',business.loginStatus);
  //查找话题
  app.get('/getTopic',business.getTopic);
  //查找问题
  app.get('/getQuest',business.getQuest);
  //发布问题
  app.post("/sendQuest",business.sendQuest);
  //问题详情
  app.get("/getQuestDetail",business.getQuestDetail);
  //写评论
  app.post("/sendDiscuss",business.sendDiscuss);
  //获取问题评论
  app.get("/getQuestDiscuss",business.getQuestDiscuss);
  //赞评论
  app.get("/likeThisDisscus",business.likeDisscus);
  //发布回答
  app.post("/sendAnswer",business.sendAnswer);
  //获取答案列表
  app.get("/getAnswerList",business.getAnswerList);
}
module.exports = apiRouter;
