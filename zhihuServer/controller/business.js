const dao = require('../model/dao');
const crypto = require('crypto');
const augment = require('../model/augment');
const secret = 'hujunhe';
const cookiesAge = 360000;
//注册用户
exports.sign = function(req, res) {
  let status = augment([{
    string: req.body.userName
  }, {
    string: req.body.password
  }, {
    string: req.body.cellphone
  }], res);
  if (status === false) {
    return false
  }

  let data = {
    userName: req.body.userName,
    password: req.body.password,
    cellphone: req.body.cellphone
  };

  let message = '';
  if (data.cellphone.length !== 11) {
    message = '手机号有误';
  }
  if (data.password.length < 6) {
    message = '密码少于6位';
  }
  if (message !== '') {
    res.send({
      "message": message,
      "success": false
    });
    return false;
  }
  data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
  dao.findUser(data, _res => {
    if (_res.length === 0) {
      dao.inserUser(data, __res => {
        res.send({
          "message": "创建成功",
          "success": true,
          'account': data.userName,
          'cellphone': data.cellphone
        });
      });
    } else {
      res.send({
        "message": '用户已存在',
        "success": false
      });
    }
  });
};
//登录用户
exports.login = function(req, res) {
  if (req.session.login === '1') {
    res.send({
      message: '已登陆',
      success: false
    });
    return false
  }
  let data = {
    userName: req.body.userName,
    password: req.body.password,
    cellphone: req.body.userName
  };
  let status = augment([{
    string: data.userName
  }, {
    string: data.password
  }, {
    string: data.cellphone
  }], res);
  if (status === false) {
    return false
  }
  dao.findUser(data, _res => {
    if (_res.length === 0) {
      res.send({
        "message": "用户不存在",
        "success": false
      });
    } else {
      data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
      if (_res[0].password != data.password) {
        res.send({
          "message": "密码错误",
          "success": false
        });
      } else {
        //登陆后设置cookie与session
        req.session.login = '1';
        res.cookie("userPhone", _res[0].cellphone, {
          maxAge: cookiesAge
        });
        res.cookie("userName", _res[0].userName, {
          maxAge: cookiesAge
        });
        res.cookie("userCode", _res[0].code, {
          maxAge: cookiesAge
        });
        res.cookie("headImg", _res[0].headImg, {
          maxAge: cookiesAge
        });
        res.cookie("userName", _res[0].userName, {
          maxAge: cookiesAge
        });
        res.send({
          "message": '登陆成功',
          'success': true
        });
      }
    }
  });
};
//退出登陆
exports.logOut = function(req, res) {
  res.clearCookie("userPhone");
  res.clearCookie("userName");
  res.clearCookie("userCode");
  res.clearCookie("headImg");
  res.clearCookie("userName");
  req.session.destroy(err => {
    try {
      res.send({
        message: '退出成功',
        success: true
      })
    } catch (err) {
      throw err
    }
  })

};
//登录状态
exports.loginStatus = function(req, res) {
  let userName = req.cookies.userName;
  let userPhone = req.cookies.userPhone;
  let headImg = req.cookies.headImg;
  let code = req.cookies.userCode;
  if (req.session.login === '1') {
    res.send({
      "message": "登陆中",
      'userInfo': {
        userName: userName,
        userPhone: userPhone,
        userCode: code,
        headImg: headImg,
      },
      'success': true
    });
  } else {
    //设置跨域
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    res.send({
      "message": "未登录",
      'success': false
    });
  }
};
//获取话题
exports.getTopic = function(req, res) {
  let query = req.query.query;
  let status = augment([{
    string: query
  }], res);
  if (status === false) {
    return false;
  }
  dao.findTopic(query, _res => {
    res.send({
      "message": "获取成功",
      "success": true,
      "data": _res
    });
  });
};
//获取问题
exports.getQuest = function(req, res) {
  let query = req.query.query;
  let status = augment({
    string: query
  }, res);
  if (status === false) {
    return false;
  }
  dao.findQuestLike(query, _res => {
    res.send({
      "message": "获取成功",
      "success": true,
      "data": _res
    });
  });
};
//发布问题
exports.sendQuest = function(req, res) {
  let message = '';
  let query = req.body.query;
  let data = {
    questName: query, //问题名
    describe: req.body.describe, //问题描述
    isUnknow: req.body.unknow, //是否匿名
    topic: req.body.topic //话题数组
  };
  let status = augment([{
    string: data.questName
  }, {
    string: data.describe
  }, {
    number: data.isUnknow
  }, {
    object: data.topic
  }], res);
  if (status === false) {
    return false
  }
  if (query.length === 0) {
    message = '未填写问题';
  }
  if (req.session.login !== '1') {
    message = '未登录';
  }
  if (message != '') {
    res.send({
      "message": message,
      'success': false
    });
    return false;
  }
  dao.findQuest(query, _res => {
    let _data = {};
    if (_res.length === 0) {
      dao.checkTopicCode(data.topic, __res => {
        console.log(__res);
        dao.insertQuest(data, ___res => {
          console.log(___res);
          _data.questCode = ___res.insertId;
          _data.topic = __res;
          dao.insertTopicAndQuest(_data, ____res => {
            dao.insertAccountAndQuest([req.cookies.userCode, ___res.insertId], finaRes => {
              res.send({
                "message": '提问成功',
                'success': true
              });
            });
          });
        });
      });
    } else {
      res.send({
        "message": "该问题已存在",
        "success": false,
      });
    }
  });
};
//获取问题详情
exports.getQuestDetail = function(req, res) {
  var code = parseInt(req.query.code);
  let status = augment([{
    number: code
  }], res);
  if (status === false) {
    return false;
  }
  dao.findQuestByCode(code, _res => {
    if (_res.length === 0) {
      res.send({
        message: '没有该问题',
        sucess: 'true'
      });
    } else {
      _res = _res[0];
      dao.selectQuestCodeSQL(code, __res => {
        dao.checkTopicName(__res, ___res => {
          dao.findDisscusCountByCode(code, ____res => {
            let str = JSON.stringify(____res[0]);
            res.send({
              message: '获取成功',
              success: true,
              data: {
                questInfo: _res,
                topic: ___res,
                disscusCount: str.match(/\d+/g)[0]
              }
            });
          })
        });
      });
    }
  });
};
//发布问题评论
exports.sendDiscuss = function(req, res) {
  if (req.session.login !== '1') {
    res.send({
      message: '未登录',
      success: false
    });
  }
  let data = {
    questCode: parseInt(req.body.questCode),
    replyCode: parseInt(req.body.replyCode) || 0,
    disscus: req.body.disscus,
    replyName: req.body.replyName || "",
    userName: req.cookies.userName,
    userCode: req.cookies.userCode
  };
  let status = augment([{
    number: data.questCode,
  }, {
    number: data.replyCode
  }, {
    string: data.disscus
  }, {
    string: data.replyName
  }], res);
  if (status === false) {
    return false
  }
  dao.insertDiscuss(data, _res => {
    if (_res) {
      dao.getALLdisscus(data.questCode, __res => {
        res.send({
          message: '获取成功',
          success: true,
          data: __res
        });
      })
    }
  })
};
//获取问题评论
exports.getQuestDiscuss = function(req, res) {
  let status = augment([{
    string: req.query.code
  }], res);
  if (status === false) {
    return false
  }
  let code = parseInt(req.query.code);
  dao.getALLdisscus(code, _res => {
    if (_res.length === 0) {
      res.send({
        message: "暂无评论",
        success: true
      })
    } else {
      res.send({
        message: '获取成功',
        success: true,
        data: _res
      });
    }
  })
};
//对评论点赞
exports.likeDisscus = function(req, res) {
  if (req.session.login !== '1') {
    res.send({
      message: '未登录',
      success: false
    });
    return false
  }
  let data = {
    userCode: parseInt(req.cookies.userCode),
    disCode: parseInt(req.query.disscusCode),
  };
  let status = augment([{
    number: data.userCode
  }, {
    number: data.disCode
  }], res);
  if (status === false) {
    return false
  }
  dao.disscusAccount(data, _res => {
    let message = '';
    if (_res.length !== 0) {
      if (_res[0].isLike === 1) {
        data.likeStatus = 0;
        message = '取消赞';
      } else {
        data.likeStatus = 1;
        message = '点赞';
      }
      dao.likeDisscus(data, __res => {
        dao.likeDisscusAccount(data, ___res => {
          res.send({
            message: message,
            success: true
          });
        })
      })
    } else {
      data.likeStatus = 1;
      dao.insertDisAcc(data, _res => {
        dao.likeDisscus(data, __res => {
          dao.likeDisscusAccount(data, ___res => {
            res.send({
              message: '点赞',
              success: true
            });
          })

        })
      })
    }
  });
};
//发布回答
exports.sendAnswer = function(req, res) {
  if (req.session.login !== '1') {
    res.send({
      message: '未登录',
      success: false
    });
  }
  let data = {
    questCode:req.body.questCode,
    accountCode:req.cookies.userCode,
    content:req.body.content
  }
  dao.checkIsAnswer(data,_res=>{
    //如果没查到数据
    if(_res.length === 0){
      dao.insertAccQue(data,__res=>{
        dao.inserAns(data,___res=>{
          console.log(___res);
          res.send('ok');
        })
      })
    }else{
      if(_res[0].isAnswer === 1){
        res.send({
          message:'您已经发布过了',
          success:false
        })
      }else{
        dao.updateAccQue(data,__res=>{
          dao.inserAns(data,___res=>{
            res.send({
              message:'发布成功',
              success:true
            });
          })
        })
      }
    }
  })

};
//获取回答列表
exports.getAnswerList = function (req,res) {
  let code = req.query.code;
  dao.getAllAnswer(code,_res=>{
    if(_res.length === 0){
      res.send({
        message:'暂无回答',
        success:true
      });
    }else{
      res.send({
        message:'获取列表成功',
        success:true,
        data:_res
      })
    }

  })
};
