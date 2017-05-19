<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div style="margin-top: 15px;">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>

        <el-tree
          class="filter-tree"
          :data="historyList"
          :props="defaultProps"
          :highlight-current="true"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="tree">
        </el-tree>
        </div>
      </el-col>
      <el-col :span="17" :offset="1">
        <!-- -->
        <el-row>
          <el-col :span="21">
            <div style="margin-top: 15px;" class="input-select">
              <el-input placeholder="请输入地址" v-model="args.url">
                <el-select v-model="args.type" slot="prepend" placeholder="GET" class="w90">
                  <el-option label="GET" value="GET"></el-option>
                  <el-option label="POST" value="POST"></el-option>
                </el-select>
                <el-button slot="append" @click="showParamClick">param</el-button>
              </el-input>
            </div>
        </el-col>
        <el-col :span="2" :offset="1">
          <div style="margin-top: 15px;">
            <el-button @click="sendClick" type="primary">发送</el-button>
          </div>
          </el-col>
        </el-row>
        <el-row v-show="showParam">
          <template v-for="(param,index) in args.params">
            <el-col :span="10" >
              <div style="margin-top: 15px;" class="input-key">
                <el-input v-model="param.key" placeholder="key"></el-input>
              </div>
            </el-col>
            <el-col :span="10" :offset="1">
              <div style="margin-top: 15px;" class="input-value">
                <el-input v-model="param.value" placeholder="value"></el-input>
              </div>
            </el-col>
            <el-col :span="1">
              <div style="margin-top: 15px;" class="input-value">
                <el-tooltip v-if="args.params.length > 1" class="item" effect="dark" content="删除" placement="right">
                  <el-button @click="deleteRowClick(args.params,index)" type="text" icon="delete"></el-button>
                </el-tooltip>
              </div>
            </el-col>
          </template>

        </el-row>

        <el-row class="api__url-header">
          <el-col :span="24">
            <el-tabs v-model="args.activeHeader">
            <el-tab-pane :label="urlHeaders" name="url-headers">
              <el-row>
                <template v-for="(header,index) in args.headers">
                  <el-col :span="10" >
                    <div style="margin-top: 15px;" class="input-key">
                      <el-input v-model="header.key" placeholder="key"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <div style="margin-top: 15px;" class="input-value">
                      <el-input v-model="header.value" placeholder="value"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="1">
                    <div style="margin-top: 15px;" class="input-value">
                      <el-tooltip v-if="args.headers.length > 1" class="item" effect="dark" content="删除" placement="right">
                        <el-button @click="deleteRowClick(args.headers,index)" type="text" icon="delete"></el-button>
                      </el-tooltip>
                    </div>
                  </el-col>
                </template>

              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Body" :disabled="args.type != 'POST'" name="url-body">
              <el-row class="h51">
                <el-col :span="24">
                  <div style="margin-top: 15px;line-height:51px;"class="h51">
                    <el-radio class="radio" v-model="args.postType" label="x-www-form-urlencoded">x-www-form-urlencoded</el-radio>
                    <el-radio class="radio" v-model="args.postType" label="raw">raw</el-radio>
                    <el-select v-if="args.postType == 'raw'" class="mgl10 w100" v-model="args.postContentType" placeholder="请选择">
                      <el-option
                        v-for="item in postContentTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.contentType">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="args.postType == 'x-www-form-urlencoded'">
                <template v-for="(form,index) in args.forms">
                  <el-col :span="10" >
                    <div style="margin-top: 15px;" class="input-key">
                      <el-input v-model="form.key" placeholder="key"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <div style="margin-top: 15px;" class="input-value">
                      <el-input v-model="form.value" placeholder="value"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="1">
                    <div style="margin-top: 15px;" class="input-value">
                      <el-tooltip v-if="args.forms.length > 1" class="item" effect="dark" content="删除" placement="right">
                        <el-button @click="deleteRowClick(args.forms,index)" type="text" icon="delete"></el-button>
                      </el-tooltip>
                    </div>
                  </el-col>
                </template>

              </el-row>
                <el-row v-if="args.postType == 'raw'">
                  <el-col :span="24" >
                    <el-input
                      type="textarea"
                      :rows="20"
                      placeholder="请输入需要上传的内容"
                      resize="none"
                      v-model="args.postData">
                    </el-input>
                  </el-col>
                </el-row>
            </el-tab-pane>
          </el-tabs>
          </el-col>
        </el-row>
        <el-row class="api__url-body">
          <el-col :span="24">
            <div>
              <h1>result:status({{resultStatus}})</h1>
            </div>
            <div>
            <el-input
              type="textarea"
              :rows="20"
              placeholder="结果"
              resize="none"
              readonly="readonly"
              v-model="result">
            </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- -->
      </el-col>
    </el-row>


</div>
</template>

<script>
  import global from '@/public/global'
  export default {
    data() {
      return {
        postContentTypeOptions: [{
          value: 'text',
          label: 'Text',
          contentType:''
        }, {
          value: 'text/plain',
          label: 'Text(text/plain)',
          contentType:'text/plain'
        }, {
          value: 'json',
          label: 'JSON(application/json)',
          contentType:'application/json'
        }, {
          value: 'javascript',
          label: 'Javascript(application/javascript)',
          contentType:'application/javascript'
        }, {
          value: 'xml',
          label: 'XML(application/xml)',
          contentType:'application/xml'
        },{
          value: 'text/xml',
          label: 'XML(text/xml)',
          contentType:'text/xml'
        },{
          value: 'html',
          label: 'HTML(text/html)',
          contentType:'text/html'
        }],
        resultStatus:0,
        showParam:false,
        isParamChange:false,
        result:'',
        urlHeaders:'Headers',
        filterText:'',
        historyList:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        args:{
          url: '',
          type: 'GET',
          postType:'x-www-form-urlencoded',
          postContentType:'text',
          postData:'',
          activeHeader:'url-headers',
          params:[
            {key:'',value:''}
          ],
          headers:[
            {key:'',value:''}
          ],
          forms:[
            {key:'',value:''}
          ]
        },

      }
    },
    mounted(){
      //被挂载上去
      this.$http.get("/api/data/listHistory").then(res => {
        this.historyList = [];
        var list = res.body.object;
        var today = [],yesterday = [];
        list.forEach(function(item,index){
            var node = {
              id:item.api_history_id,
              label:item.args.type + " " +item.args.url,
              args:item.args
            };
            var date = new Date();
            var todayBegin = new Date(global.format("{04}-{02}-{02} 00:00:00",date.getFullYear(),date.getMonth()+1,date.getDate())),
            todayEnd = new Date(global.format("{04}-{02}-{02} 23:23:59",date.getFullYear(),date.getMonth()+1,date.getDate()));
            if(item.create_time >= todayBegin && item.create_time <= todayEnd){
              today.push(node);
            }else{
              yesterday.push(node);
            }
        });
        this.historyList.push({
          id:-1,
          label:"今天",
          children:today
        });
        this.historyList.push({
          id:-1,
          label:"昨天以及更早之前",
          children:yesterday
        });
      });
    },
    methods:{
      showParamClick(){
        this.showParam = !this.showParam;
      },
      deleteRowClick(row,index){
        row.splice(index,1);
      },
      sendClick(){
        var self = this;
        this.$http.post("/api/data/proxy",this.args).then(res => {
          if(res.body){
            self.resultStatus = res.body.object.status;
            self.result = res.body.object.body;

            if(res.body.object.status == 200){
              self.historyList[0].children.unshift({
                id:-1,
                label:self.args.type + " " + self.args.url,
                args:JSON.parse(JSON.stringify(self.args))
              });
            }
          }else{
            self.resultStatus = 0;
            self.result = "遇到未知错误";
          }

        });
      },
      handleNodeClick(data){
        this.args = data.args;
        this.result = '';
        this.resultStatus = 0;
      },
      //////////////////////////////////////////////////////////////////////////
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      setUrl(){
        if(!this.args.url) return false;
        var params = [];
        this.args.params.forEach(function(item,index){
          if(!item.key) return true;
          params.push(item.key+"="+item.value);
        });
        var newUrl = "";
        if(params.length == 0){
          newUrl = this.args.url.split("?")[0];
        }else{
          newUrl = this.args.url.split("?")[0]+"?"+params.join("&");
        }
        if(newUrl == this.args.url){
          return false;
        }
        this.args.url = newUrl;
        return true;
      },
      formatRow(row){
        if(row.length != 0){
          var last = row[row.length - 1];
          if(!last.key){
            if(row.length == 1){
              return;
            }
            if(!row[row.length -2].key){
              //删掉最后一行
              row.pop();
            }
            return;

          }
        }
        row.push({key:'',value:''});
      }
    },
    watch:{
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      "args.type"(){
        if(this.type == 'POST'){
          this.args.activeHeader = 'url-body';
        }else{
          this.args.activeHeader = 'url-headers';
        }
      },
      "args.url"(){
        var self = this;
        if(this.isParamChange){
          this.isParamChange = false;
          return;
        }
        //提取所有的参数
        this.params = [];
        if(this.url){
          var params = this.args.url.split("?")[1] || "";
          params.split("&").forEach(function(item,index){
            if(!item) return true;
            var key = item.split("=")[0];
            var value = item.split("=")[1] || '';
            if(!key){
              return true;
            }
            value = decodeURIComponent(value);
            self.args.params.push(
              {key:key,value:value},
            );
          });
        }
        this.args.params.push(
          {key:'',value:''},
        );
      },
      "args.params":{
        handler(){
          this.isParamChange = this.setUrl();
          this.formatRow(this.args.params);
        },
        deep:true
      },
      "args.headers":{
        handler(){
          this.formatRow(this.args.headers);
          this.urlHeaders = "Headers";
          if(this.args.headers.length > 1){
            this.urlHeaders = "Headers("+(this.args.headers.length-1)+")";
          }
        },
        deep:true
      },
      "args.forms":{
        handler(){
          this.formatRow(this.args.forms);
        },
        deep:true
      },
      "args.postContentType"(){
        var index = -1;
        this.args.headers.forEach(function(item,i){
          if(item.key && (item.key.toLowerCase() == 'content-type' || item.key.toLowerCase() == 'contenttype')){
            index = i;
          }
        });
        if(index == -1){
          index = this.args.headers.length - 1;
          this.args.headers[index].key = 'Content-Type';

        }
        if(!this.args.postContentType){
          this.args.headers.splice(index,1);
        }else{
          this.args.headers[index].value = this.args.postContentType;
        }
      }
    }
  }
</script>

<style>
  .w90{
    width: 90px;
  }
  .h51{
    height:51px;
  }
  .w100,.w100 .el-input{
    width: 100px;
  }
  .input-key input,.input-value input{
    border: none;
    border-bottom: 1px solid #bfcbd9;
  }
  .api__url-header{
    margin-top:30px;
    min-height: 550px;
  }
  .mgl10{
    margin-left: 10px;
  }
</style>
