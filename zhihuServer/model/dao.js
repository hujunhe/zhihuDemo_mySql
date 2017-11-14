const mysql = require('mysql');
//配置数据库应用池
let pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'hujunhe',
  password: '19940601hu',
  database: 'zhihudemo',
  connectionLimit: 10
});

function connectionDatabase(sql, callback) {
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, result) => {
      try {
        callback && callback(result);
      } catch (err) {
        console.log("数据库操作异常");
        throw err
      }
    });
    connection.release();
  });
}

//查询用户
exports.findUser = function(data, callback) {
  let findUserSQL = 'select * from account where userName = "' + data.userName + '"' + 'or cellphone="' + data.cellphone + '"';
  connectionDatabase(findUserSQL, result => {
    callback && callback(result);
  })
};
//插入用户
exports.inserUser = function(data, callback) {
  let createUserSQL = 'insert into account (userName, password, cellphone) values ("' + data.userName + '", "' + data.password + '","' + data.cellphone + '")';
  connectionDatabase(createUserSQL, result => {
    callback && callback(result);
  })
};
//查找话题
exports.findTopic = function(data, callback) {
  let findTopicSQL = 'select * from topic where topicName like "%' + data + '%"';
  connectionDatabase(findTopicSQL, result => {
    callback && callback(result);
  });
};
//模糊查找问题
exports.findQuestLike = function(data, callback) {
  let findQuestSQL = 'select * from question where questName like "%' + data + '%"';
  connectionDatabase(findQuestSQL, result => {
    callback && callback(result);
  });
};
//精确查找问题by问题名称
exports.findQuest = function(data, callback) {
  let findQuestSQL = 'select * from question where questName = "' + data + '"';
  connectionDatabase(findQuestSQL, result => {
    callback && callback(result);
  });
};
//插入问题
exports.insertQuest = function(data, callback) {
  let insertQuestSQL = 'insert into question (questName, describetion, unknow, createTime, updataTime) values ("' + data.questName + '", "' + data.describe + '", ' + data.isUnknow + ',NOW(),NOW())';
  console.log(insertQuestSQL);
  connectionDatabase(insertQuestSQL, result => {
    callback && callback(result);
  });
};
//查询topic表拿code
exports.checkTopicCode = function(data, callback) {
  let checkCodeSQL = 'SELECT code FROM topic WHERE topicName="' + data[0] + '" ';
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      checkCodeSQL += 'UNION SELECT code FROM topic WHERE topicName="' + data[i] + '"';
    }
  }
  connectionDatabase(checkCodeSQL, result => {
    callback && callback(result);
  })
};
//插入topic_question关系
exports.insertTopicAndQuest = function(data, callback) {
  let topicQuestSQL = 'INSERT INTO question_topic (questCode,topicCode) VALUES ';
  for (var i = 0; i < data.topic.length; i++) {
    let tmp = (i === (data.topic.length - 1)) ? ';' : ','
    topicQuestSQL += '(' + data.questCode + ',' + data.topic[i].code + ')' + tmp;
  }
  console.log(topicQuestSQL);
  connectionDatabase(topicQuestSQL, result => {
    callback && callback(result);
  })
};
//插入question_account关系
exports.insertAccountAndQuest = function(data, callback) {
  let insertAccountAndQuestSQL = 'INSERT INTO account_question (accountCode,questionCode) VALUES ("' + data[0] + '","' + data[1] + '")';
  connectionDatabase(insertAccountAndQuestSQL, res => {
    callback && callback(res);
  })
};
//查询question_topic表取出topicCode
exports.selectQuestCodeSQL = function (data,callback) {
  let selectQuestCodeSQL = 'SELECT topicCode from question_topic where questCode = ' + data;
  connectionDatabase(selectQuestCodeSQL,res=>{
    callback && callback(res);
  })
};
//查询topic表拿topciName
exports.checkTopicName = function(data, callback) {
  let checkNameSQL = 'SELECT topicName FROM topic WHERE code=' + data[0].topicCode + ' ';
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      checkNameSQL += 'UNION SELECT topicName FROM topic WHERE code=' + data[i].topicCode + ';';
    }
  }
  connectionDatabase(checkNameSQL, result => {
    callback && callback(result);
  })
};
//精确查找问题by问题名称
exports.findQuestByCode = function(data, callback) {
  let findQuestSQL = 'select * from question where code = "' + data + '"';
  connectionDatabase(findQuestSQL, result => {
    callback && callback(result);
  });
};
//发布评论
exports.insertDiscuss = function (data,callback) {
  let insertDiscussSQL = 'INSERT INTO disscus (questCode,disscus,createTime,userCode,replyCode,userName,replyName) VALUES (' + data.questCode + ',"' + data.disscus + '",NOW(),' + data.userCode + ',' + data.replyCode + ',"' + data.userName + '","' + data.replyName + '")';
  connectionDatabase(insertDiscussSQL,result=>{
    callback && callback(result);
  })
};
//查看问题评论
exports.getALLdisscus = function (data,callback) {
  let getDisscusSQL = 'SELECT disscus.* , account.code,account.headImg,account.userName FROM disscus LEFT JOIN account on disscus.userCode = account.code WHERE questCode = ' + data ;
  connectionDatabase(getDisscusSQL,result=>{
    callback&&callback(result);
  })
};
//查找disscus_account表关系
exports.disscusAccount = function (data,callback) {
  let sql = 'select isLike from disscus_account where disscusCode = ' + data.disCode + ' and accountCode = '+ data.userCode;
  connectionDatabase(sql,result=>{
    if(result){
      callback(result);
    }
  })
};
//点赞或取消点赞
exports.likeDisscus = function (data,callback) {
  let sql ='';
  if(data.likeStatus === 0){
    sql = 'update disscus set likeCount = likeCount - 1 where disscusCode = '+ data.disCode+';';
  }else{
    sql = 'update disscus set likeCount = likeCount + 1 where disscusCode = '+ data.disCode+';';
  }
  connectionDatabase(sql,result=>{
    if(result){
      callback(result);
    }
  })
};
//更新disscus_account关系
exports.likeDisscusAccount = function (data,callback) {
  let sql = 'update disscus_account set isLike = ' + data.likeStatus + ' where accountCode = ' + data.userCode + ' and disscusCode = ' + data.disCode + ';';
  console.log(sql);
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//插入disscus_account
exports.insertDisAcc = function (data,callback) {
  let sql = 'insert into disscus_account (accountCode,disscusCode,isLike) values (' + data.userCode + ',' + data.disCode + ',0);'
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//获取问题评论总条数
exports.findDisscusCountByCode = function (data,callback) {
  let sql ='select count(disscusCode) from disscus where questCode = ' + data + ';';
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//查找发布或写答案数据
exports.checkIsAnswer = function (data,callback) {
  let sql = 'select isAnswer from account_question where questionCode = ' + data.questCode + ' and accountCode = ' + data.accountCode +';'
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//插入关系数据并将在此问题下发言状态置为1
exports.insertAccQue = function (data,callback) {
  let sql = 'insert into account_question (accountCode,questionCode,isAnswer) values (' +data.accountCode+ ',' + data.questCode + ',1);';
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//更新关系数据将此问题下发言状态置为1
exports.updateAccQue = function (data,callback) {
  let sql ='update account_question set isAnswer = 1 where accountCode = ' + data.accountCode + ' and questionCode = ' + data.questCode;
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//插入关系数据问题_答案
exports.inserAns = function (data,callback) {
  let sql = 'insert into answer (answerContent,questCode,accountCode,createTime,updateTime) values ("' + data.content + '",' + data.questCode + ',' + data.accountCode + ',NOW(),NOW())';
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
//获取答案列表
exports.getAllAnswer = function (data,callback) {
  let sql = 'SELECT answer.* ,account.headImg,account.userName,account.introduction from answer left join account on answer.accountCode = account.code where questCode = ' + data;
  connectionDatabase(sql,result=>{
    if(result){
      callback(result)
    }
  })
};
