var template = require("art-template");
require("./template-helper")(template);

var fs = require("fs"),
    path = require("path");

var global = require("../../my_modules/global");

var tpl = {
  mkdir(dirPath){
    try{
      var exists = fs.existsSync(dirPath);
      if(!exists){
        this.mkdir(path.dirname(dirPath));
        fs.mkdirSync(dirPath);
      }
    }catch(e){
      console.log(e);
    }
  },
  handle(file,plan,data,override){
    plan.ext = plan.ext || [];
    var ext = {};
    plan.ext.forEach(function(item){
      if(!item.key) return true;
      ext[item.key] = item.value;
    });
    var renderData = {
      data:data,
      ext:ext,
      file:file,
      plan:plan
    };
    file.path = template.compile(file.path)(renderData || {});
    if(!file.target){
      return "没有目标地址跳过"+file.path;
    }
    file.target = template.compile(file.target)(renderData || {});
    var filePath = global.formatTplDir(file.path);
    var fileContent = fs.readFileSync(filePath,"utf-8");
    var targetContent = template.compile(fileContent)(renderData || {});
    var target = template.compile(file.target || "")(renderData || {});
    var base_dir = template.compile(plan.base_dir || "")(renderData || {});

    if(target == "{Template Error}"){
      return "{Template Error}"+file.path;
    }
    var targetPath = path.join(base_dir,target);
    this.mkdir(path.dirname(targetPath));
    if(override){
      //覆盖
      fs.writeFileSync(targetPath,targetContent);
      return "覆盖写入"+targetPath+" 成功";
    }else{
      //不覆盖
      if(fs.existsSync(targetPath)){
        return "文件"+targetPath+" 已经存在";
      }else{
        fs.writeFileSync(targetPath,targetContent);
        return "不覆盖写入"+targetPath+" 成功";
      }
    }

  }
};

module.exports = tpl;
