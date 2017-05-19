export default{
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
  }
}
