var sqilte3 = require("../my_modules/node-generator-sqlite3");

function PlanModel(){

}

PlanModel.prototype = sqilte3.createModel({
  table:"plan",
  desc:"方案",
  priKey:"id",
  fieldInfo:{
    "id":{
        "type":"INTEGER",
        "not_null":true,
        "auto_increment":true,
        "key":"PRIMARY KEY"
    },
    "name":{
      "type":"TEXT"
    },
    "create_time":{
        "type":"INTEGER",
        "not_null":true
    },
    "base_dir":{
        "type":"TEXT"
    },
    "ext":{
      "type":"JSON"
    },
    "flow":{
        "type":"TEXT"
    }
  },
  version:1
});

var fn = {

};


for(var key in fn){
  PlanModel.prototype[key] = fn[key];
}

module.exports = new PlanModel();
