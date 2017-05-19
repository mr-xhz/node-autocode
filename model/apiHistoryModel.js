var sqilte3 = require("../my_modules/node-generator-sqlite3");

function ApiHistoryModel(){

}

ApiHistoryModel.prototype = sqilte3.createModel({
  table:"api_history",
  desc:"API历史库",
  priKey:"api_history_id",
  fieldInfo:{
    "api_history_id":{
        "type":"INTEGER",
        "not_null":true,
        "auto_increment":true,
        "key":"PRIMARY KEY"
    },
    "type":{
      "type":"TEXT" //API,DATABASE,DIY
    },
    "create_time":{
        "type":"INTEGER",
        "not_null":true
    },
    "args":{
        "type":"JSON"
    }
  },
  version:1
});

var fn = {

};


for(var key in fn){
  ApiHistoryModel.prototype[key] = fn[key];
}

module.exports = new ApiHistoryModel();
