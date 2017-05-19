const express = require('express'),
      router = express.Router();
const global = require("../my_modules/global");

const planModel = require("../model/planModel"),
      planFileModel = require("../model/planFileModel");

router.post('/plan/save',function(req,res,next){
  var postData = req.body;

  var plan = postData;
  postData.file_list = postData.file_list || [];
  postData.file_list.forEach(function(item,index){
    item.file = item.path;
  });

  var promise = null;

  if(!plan.id){
    plan.create_time = new Date().getTime();
    promise = planModel.insert(plan).then(function(rs){
      plan.file_list.forEach(item => {
        item.plan_id = rs.id;
      });
      if(plan.file_list.length>0){
        planFileModel.insert(plan.file_list).then(rs => {
          this.resolve();
        });
      }else{
        this.resolve();
      }
    });
  }else{
    promise = planModel.update(plan).then(function(){
      plan.file_list.forEach(item => {
        item.plan_id = plan.id;
      });
      planFileModel.where("plan_id",plan.id).delete().then(rs => {
        if(plan.file_list.length>0){
          planFileModel.insert(plan.file_list).then(rs => {
            this.resolve();
          });
        }else{
          this.resolve();
        }
      });
    });
  }

  promise.then(()=>{
    res.status(200).send(global.result({
      object:plan
    }));
  });
});


router.get('/plan/list',function(req,res,next){
  var result = [];
  planModel.list().then(function(rs){
    if(!rs || rs.length == 0){
      return res.status(200).send(global.result({
        object:result
      }));
    }
    result = rs;
    var planIds = [];
    rs.forEach(item => {
      planIds.push(item.id);
      item.file_list = [];
    });
    planFileModel
    //.where("plan_id",planIds,"in")
    .list(files => {
      if(files && files.length >0){
        files.forEach(file => {
          rs.forEach(item => {
            if(item.id == file.plan_id){
              item.file_list.push(file);
            }
          });
        });
      }
      return res.status(200).send(global.result({
        object:result
      }));
    });
  });
});

router.post('/plan/delete',function(req,res,next){
  var plan_id = req.body.id;
  planFileModel.where("plan_id",plan_id).delete().then(()=>{
    planModel.where("id",plan_id).delete().then(()=>{
      res.status(200).send(global.result());
    });
  });
});


module.exports = router;
