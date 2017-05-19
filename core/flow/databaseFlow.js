
var type = {
  "^bigint":{
    JavaType:{
      package:"",
      type:"Long"
    },
    SqlType:"BIGINT"
  },
  "^varchar":{
    JavaType:{
      package:"",
      type:"String"
    },
    SqlType:"VARCHAR"
  },
  "^char":{
    JavaType:{
      package:"",
      type:"String"
    },
    SqlType:"CHAR"
  },
  "^date":{
    JavaType:{
      package:"java.util.Date",
      type:"Date"
    },
    SqlType:"TIMESTAMP"
  },
  "^decimal":{
    JavaType:{
      package:"java.math.BigDecimal",
      type:"BigDecimal"
    },
    SqlType:"DECIMAL"
  },
  "^tinyint":{
    JavaType:{
      package:"",
      type:"Byte"
    },
    SqlType:"TINYINT"
  },
  "^int":{
    JavaType:{
      package:"",
      type:"Integer"
    },
    SqlType:"INTEGER"
  },
  "^text":{
    JavaType:{
      package:"",
      type:"String"
    },
    SqlType:"TEXT"
  }
};

function formatType(field){
  for(var key in type){
    if(new RegExp(key).test(field.Type)){
      for(var k in type[key]){
        field[k] = type[key][k];
      }
    }
  }
}

var databaseFlow = {
  name:"数据库流程",
  id:'databaseFlow',
  handle(data){
    if(data.fields && data.fields.length>0){
      data.fields.forEach(field =>{
        formatType(field);
        if(field.Key == "PRI"){
          data.priField = field;
        }
      });
    }
  }
};

module.exports = databaseFlow;
