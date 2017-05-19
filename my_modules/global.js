const fs = require('fs'),
      path = require('path');
const sqilte3 = require("./node-generator-sqlite3");

var model = {
  result(args){
    args = args || {};
    return {
      code:args.code || (args.success === false?-1:0),
      success:(args.success === false?false:true),
      message:args.message || "",
      object:args.object || null
    }
  }
};

module.exports = {
  removeTplDir(path){
    return path.replace(this.getTplDir(),"");
  },
  formatTplDir(file){
    return path.join(this.getTplDir(),this.removeTplDir(file));
  },
  getTplDir(){
    return path.join(__dirname,"../template");
  },
  format(str){
    var args = Array.prototype.slice.call(arguments,1);
    args.forEach(function(item){
      var m = str.match(/\{(.*?)\}/im);
      if(!m) return false;
      var formater = m[1];
      var char,len;

      var replace = item+"";
      if(typeof item == "object"){
        replace = JSON.stringify(item);
      }

      if(typeof formater != "undefined" && formater != null){
        if(formater.length == 2){
          char = formater[0] + "";
          formater = formater[1];
        }
        len = Number(formater);
        char = char || " ";
      }
      if(len > replace.length){
        var oldLen = replace.length;
        for(var i=0;i<len-oldLen;i++){
          replace = char+replace;
        }
      }
      str = str.replace(m[0],replace);
    });
    return str;
  },
  result(args){
    return model.result(args);
  },
  interceptor(){
    return function(req,res,next){
      //权限校验
      next();
    }
  },
  loadRouters(app,apiPrefix){
    var routerPath = path.join(__dirname,"../routers/");
    var files = fs.readdirSync(routerPath);
    for(var i=0;i<files.length;i++){
      var file = files[i];
      if(file.indexOf("Controller.js") == -1){
          continue;
      }
      var routerPath = path.join("../routers/",file);
      var router = require(routerPath);
      console.log("加载路由:"+routerPath);
      app.use(apiPrefix,router);
    }
  },
  initDatabase(config){
    //初始化sqlite3
    config.sqlite3.dataSource.forEach(function(item,index){
      if(fs.existsSync(path.dirname(item.path))){
        return true;
      }
      fs.mkdirSync(path.dirname(item.path),0770);
    });
    sqilte3.configure(config.sqlite3).init();
  }
};
