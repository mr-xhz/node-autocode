var http_request = require('request');var request = {    /**     * @param ops 必填     * {     *     url:"地址"  可出传 相对地址 和 绝对地址     * }     * @param dataType 返回数据类型 可选参数 默认json     * @param callback 可选参数     * */    get(url,in_headers,callback){        var headers = {        };        in_headers.forEach(function(item,index){          if(!item.key) return true;          headers[item.key] = item.value;        });        if(!/^https?:\/\//.test(url)){          url = "http://"+url;        }        console.log("访问链接:"+url);        http_request.get({url:url,headers:headers},function(error, response, body){            var result = null;            if(!response){                console.log(url+" 找不到该链接。。。");                result = {                  status:404,                  body:"找不到该链接"                };            }else if(response.statusCode != 200){                result = {                  status:response.statusCode,                  body:response.body                };                console.log("body {}",response.body);                console.log(url+" statusCode:"+response.statusCode);            }else{              result = {                status:200,                body:body              };            }            callback && callback(result);        });    },    post(url,params,in_headers,callback){        console.log("进入post");        var headers = {        };        in_headers.forEach(function(item,index){          if(!item.key) return true;          headers[item.key] = item.value;        });        if(!/^https?:\/\//.test(url)){          url = "http://"+url;        }        console.log("访问链接:"+url);        var body;        var form;        if(typeof params == "string"){            body = params;            headers['Content-Length'] = body.length;        }else{            form = params;        }        console.log('post参数 body {}',body,"form {}",form);        //post 方式的参数 用 form 参数去传        http_request.post({url:url,headers: headers,body:body,form:form},function(error, response, body){            var result = null;            if(!response){                console.log(url+" 找不到该链接。。。");                result = {                  status:404,                  body:"找不到该链接"                };            }else if(response.statusCode != 200){                result = {                  status:response.statusCode,                  body:response.body                };                console.log("body {}",response.body);                console.log(url+" statusCode:"+response.statusCode);            }else{              result = {                status:200,                body:body              };            }            callback && callback(result);        });    }};module.exports = request;