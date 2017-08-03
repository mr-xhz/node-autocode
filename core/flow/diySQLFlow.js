var type = {
  "^bigint":{
    JavaType:{
      package:"",
      type:"NUMBER"
    },
    SqlType:"BIGINT"
  },
  "^varchar":{
    JavaType:{
      package:"",
      type:"STRING"
    },
    SqlType:"VARCHAR"
  },
  "^char":{
    JavaType:{
      package:"",
      type:"STRING"
    },
    SqlType:"CHAR"
  },
  "^date":{
    JavaType:{
      package:"java.util.Date",
      type:"DATE"
    },
    SqlType:"TIMESTAMP"
  },
  "^decimal":{
    JavaType:{
      package:"java.math.BigDecimal",
      type:"NUMBER"
    },
    SqlType:"DECIMAL"
  },
  "^tinyint":{
    JavaType:{
      package:"",
      type:"STRING"
    },
    SqlType:"TINYINT"
  },
  "^int":{
    JavaType:{
      package:"",
      type:"NUMBER"
    },
    SqlType:"INTEGER"
  },
  "^text":{
    JavaType:{
      package:"",
      type:"STRING"
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
