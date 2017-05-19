const express = require('express'),
      router = express.Router();
const global = require("../my_modules/global");

const request = require("../my_modules/request");


var mysql = require("mysql");


var apiHistoryModel = require("../model/apiHistoryModel");


router.post('/database/refresh',function(req,res,next){
  var params = req.body;
  //记录日志
  if(!params.url){
    return res.status(200).send(global.result({message:"请传入正确的参数",success:false}));
  }

  function handleError(err){
    if(err){
      console.log(err);
      return res.status(200).send(global.result({message:err,success:false}));
    }
  }


  if(/^mysql:\/\//i.test(params.url)){
    var url = params.url.replace("mysql://","");
    var config = {
      host:url.split(":")[0],
      port:url.split(":")[1].split("/")[0],
      database:url.split(":")[1].split("/")[1],
      user:params.user_name,
      password:params.password
    }
    var conn = mysql.createConnection(config);
    conn.connect(handleError);
    conn.query("SHOW TABLES;",function(err,rs){

      apiHistoryModel.where("type","DATABASE").where("args",params.url,"%").delete(function(){
        apiHistoryModel.insert({
          create_time:new Date().getTime(),
          type:"DATABASE",
          args:params
        });
        if(err){
          return res.status(200).send(global.result({message:err,success:false}));
        }else{
          var result = [];
          rs.forEach(function(item){
            for(var key in item){
              result.push(item[key]);
            }

          });
          return res.status(200).send(global.result({object:result}));
        }
      });
      conn.end();
    });

  }
});

router.get('/database/listHistory',function(req,res,next){
  var type = req.query["type"] || "DATABASE";
  result = [];
  apiHistoryModel.where("type",type).orderBy("create_time DESC").limit(50).list(function(rs){
    result = rs;
    this.resolve();
  }).finally(() =>{
    return res.status(200).send(global.result({object:result}));
  });
});



router.post('/database/detail',function(req,res,next){
  var params = req.body.args;
  var database = req.body.database;
  //记录日志
  if(!params.url){
    return res.status(200).send(global.result({message:"请传入正确的参数",success:false}));
  }

  function handleError(err){
    if(err){
      console.log(err);
      return res.status(200).send(global.result({message:err,success:false}));
    }
  }


  if(/^mysql:\/\//i.test(params.url)){
    var url = params.url.replace("mysql://","");
    var config = {
      host:url.split(":")[0],
      port:url.split(":")[1].split("/")[0],
      database:url.split(":")[1].split("/")[1],
      user:params.user_name,
      password:params.password
    }
    var conn = mysql.createConnection(config);
    conn.connect(handleError);
    conn.query("SHOW FULL FIELDS FROM `"+database+"`",function(err,rs){
      if(err){
        return res.status(200).send(global.result({message:err,success:false}));
      }else{
        return res.status(200).send(global.result({object:{
          table:database,
          fields:rs
        }}));
      }
      conn.end();
    });

  }
});

module.exports = router;
