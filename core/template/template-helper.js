var path = require('path');
var helper = {
  H(s){
    while(/_\w/i.test(s)){
      var m = s.match(/(_\w)/im);
      s = s.replace(m[1],m[1].replace("_","").toUpperCase());
    }
    return s;
  },
  FU(s){
    return s.replace(/^\w/ig,s[0].toUpperCase());
  },
  FL(s){
    return s.replace(/^\w/ig,s[0].toLowerCase());
  },
  U(s){
    return this.FU(this.H(s));
  },
  L(s){
    return this.FL(this.H(s));
  }
};

module.exports = function(template){
  template.helper("U",function(s){
    return helper.U(s);
  });
  template.helper("L",function(s){
    return helper.L(s);
  });
  template.helper("FU",function(s){
    return helper.FU(s);
  });
  template.helper("FL",function(s){
    return helper.FL(s);
  });
  template.helper("H",function(s){
    return helper.H(s);
  });
  template.helper("P",function(file){
    var p = file.target.replace(/\\/g,"/");
    return "package "+path.dirname(p.split("/main/java/")[1]).replace(/\//g,".")+";";
  });
  template.helper("I",function(fields){
    var imp = {};
    fields.forEach(function(field){
      if(!field.JavaType.package) return true;
      imp[field.JavaType.package] = "import "+field.JavaType.package+";";
    });
    var impArr = [];
    for(var key in imp){
      impArr.push(imp[key]);
    }
    return impArr.join("\n");
  });
}
