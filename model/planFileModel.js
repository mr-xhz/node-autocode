var sqilte3 = require("../my_modules/node-generator-sqlite3");

function PlanFileModel(){

}

PlanFileModel.prototype = sqilte3.createModel({
  table:"plan_file",
  desc:"方案文件",
  priKey:"plan_id",
  fieldInfo:{
    "plan_id":{
      "type":"INTEGER"
    },
    "file":{
        "type":"TEXT"
    },
    "marker":{
        "type":"TEXT"
    },
    "target":{
        "type":"TEXT"
    }
  },
  version:1
});

var fn = {

};


for(var key in fn){
  PlanFileModel.prototype[key] = fn[key];
}

module.exports = new PlanFileModel();
