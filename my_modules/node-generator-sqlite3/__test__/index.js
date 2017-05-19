var path = require("path");
var sqlite3 = require("../index");
var databasePath = path.join(__dirname,"test.db");

sqlite3.configure({
  dataSource:[
    {
      path:databasePath,
      prefix:"",
      model:[]
    }
  ],
  logger:{
    error:console.log.bind(console),
    sql:console.log.bind(console)
  }
})
.init();



var testModel =  require("./model/testModel");
var insertObj = [{
  test_id:22,
  test_json:{
    a:1,
    b:2
  },
  test_text:"mytext"
},{
  test_id:22,
  test_json:{
    a:1,
    b:2
  },
  test_text:"mytext"
}];
//testModel.insert(insertObj);
//console.log("insert",insertObj);
testModel.update({
  "test_id":1,
  "test_text":"xxx"
});
testModel.where("test_id",20).or("test_id",20).delete();
testModel.where("test_id",1).list(function(rs){
  console.log(rs);
});
testModel.where("test_id",2).where("test_text",2,"%").limit(20).list(function(rs){
  console.log(rs);
});

testModel.field("test_id,test_text").where("test_id",3).listSingle(function(rs){
  console.log(rs);
});
console.log("init success");
