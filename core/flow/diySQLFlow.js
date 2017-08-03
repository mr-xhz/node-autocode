var type = {
  "^bigint":{
    JavaType:{
      package:"",
      type:"Number"
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
      type:"Number"
    },
    SqlType:"DECIMAL"
  },
  "^tinyint":{
    JavaType:{
      package:"",
      type:"String"
    },
    SqlType:"TINYINT"
  },
  "^int":{
    JavaType:{
      package:"",
      type:"Number"
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
  var isExists = false;
  for(var key in type){
    if(new RegExp(key).test(field.Type)){
      for(var k in type[key]){
        field[k] = type[key][k];
      }
      isExists = true;
    }
  }
  if(!isExists){
    console.log("Error can not find JavaType:"+field.Type);
  }
}

module.exports = {
  name:"自定义SQL流程",
  id:'diySQLFlow',
  handle(data){
    console.log("xxxxxxxxxxxxxxxxxxxxx");
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
