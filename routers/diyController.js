const express = require('express'),
      router = express.Router();
const global = require("../my_modules/global");

const fs = require("fs"),path = require("path");

const flow = require("../core/flow"),
      tpl = require("../core/template");

//获取模板树
router.get("/diy/listTplTree",function(req,res,next){
  var index = 0;
  var result = [];

  function readdir(filePath,result,success){
    var files = fs.readdirSync(filePath);
    files.forEach(function(item){
      item = path.join(filePath,item);
      index++;
      var node = {
        id:index,
        label:path.basename(item),
        path:global.removeTplDir(item),
        children:[]
      };
      var stat = fs.statSync(item);
      if(stat.isDirectory()){
        readdir(item,node.children);
      }
      result.push(node);
    });
    success && success();
  }

  readdir(path.join(__dirname,"../template"),result,function(){
    res.status(200).send(global.result({
      object:result
    }));
  });


});

router.get('/diy/listFlow',function(req,res,next){
  res.status(200).send(global.result({
    object:flow.list
  }));
});

router.post('/diy/create',function(req,res,next){
  var postData = req.body;
  //step1 先验证数据的合法性
  if(!postData.plan.file_list || postData.plan.file_list.length == 0){
    return res.status(200).send(global.result({
      success:false,
      message:"请传入正确的文件列表"
    }));
  }
  if(!postData.inData){
    return res.status(200).send(global.result({
      success:false,
      message:"请传入正确的源数据"
    }));
  }
  //step2 先处理元数据
  var inData = postData.inData || {};
  console.log("flow:",postData.plan.flow);
  flow.handle(postData.plan.flow,inData);
  var result = [];
  //step3 生成文件
  postData.plan.file_list.forEach(file => {
    result.push(tpl.handle(file,postData.plan,inData,postData.override));
  });

  res.status(200).send(global.result({
    object:result
  }));

});


module.exports = router;
