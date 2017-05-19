
var defaultFlow = require('./defaultFlow'),
    databaseFlow = require('./databaseFlow');

function Flow(){
  this.map = {};
  this.list = [
    defaultFlow,
    databaseFlow
  ];
  this.list.forEach((item,index) => {
    this.map[item.id] = item;
  });
}

Flow.prototype = {
  handle(id){
    var args = Array.prototype.slice.call(arguments,1);
    this.map[id] && this.map[id].handle.apply(this.map[id],args);
  }
};

module.exports = new Flow();
