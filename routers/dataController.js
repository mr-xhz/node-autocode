const express = require('express'),
      router = express.Router();
const global = require("../my_modules/global");

const request = require("../my_modules/request");


var apiHistoryModel = require("../model/apiHistoryModel");


router.post('/data/proxy',function(req,res,next){
  var params = req.body;
  //记录日志
  if(!params.url){
    return res.status(200).send(global.result({object:{
      status:200,
      body:"请传入正确的参数"
    }}));
  }
  function insertIntoHistory(params){
    apiHistoryModel.insert({
      create_time:new Date().getTime(),
      type:"API",
      args:params
    });
  }

  if(params.type == 'GET'){
    request.get(params.url,params.headers,function(ret){
      if(ret.status == 200){
        insertIntoHistory(params);
      }
      return res.status(200).send(global.result({object:ret}));
    });
  }else if(params.type == 'POST'){
    var postData;
    if(params.postType == "x-www-form-urlencoded"){
      params.forms.forEach(function(item,index){
        postData = postData || {};
        if(!item.key) return true;
        postData[item.key] = item.value;
      });
    }else{
      postData = params.postData;
    }
    request.post(params.url,postData,params.headers,function(ret){
      if(ret.status == 200){
        insertIntoHistory(params);
      }
      return res.status(200).send(global.result({object:ret}));
    });
  }
});

router.get('/data/listHistory',function(req,res,next){
  var type = req.query["type"] || "API";
  result = [];
  apiHistoryModel.where("type",type).orderBy("create_time DESC").limit(50).list(function(rs){
    result = rs;
    this.resolve();
  }).finally(() =>{
    return res.status(200).send(global.result({object:result}));
  });
});

module.exports = router;
