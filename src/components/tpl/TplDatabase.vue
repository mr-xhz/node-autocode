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
        <el-form ref="args" :model="args" label-width="80px" style="margin-top: 15px;">
          <el-form-item label="名字">
            <el-input v-model="args.name" placeholder="名字"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="args.url" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="帐号">
            <el-input v-model="args.user_name" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="args.password" placeholder="密码"></el-input>
          </el-form-item>

        </el-form>
        <div style="border: 1px solid #bfcbd9;padding:10px;">
          <div>
            <el-input v-model="databaseFilterText" style="width:200px;float:right;" placeholder="输入关键字进行过滤"></el-input>
            <el-button type="primary" @click="refreshClick" style="float:right;margin-right:15px;">刷新</el-button>
            <div  style="clear:both;"></div>
          </div>
          <ul class="database-table">
            <li @click="databaseClick(index)" :class="(databaseFilterActiveId == index)?'active':''" v-for="(item,index) in databaseFilter">{{item}}</li>
          </ul>
        </div>
        <el-row class="api__url-body">
          <el-col :span="24">
            <div>
              <h1>result</h1>
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

        filterText:'',
        historyList:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        databaseFilterText:'',
        database:[],
        databaseFilter:[],
        databaseFilterActiveId:-1,
        result:'',
        args:{
          url: '',
          name: '',
          password:'',
          user_name:''
        },

      }
    },
    mounted(){
      //被挂载上去
      this.$http.get("/api/database/listHistory").then(res => {
        this.historyList = [];
        var list = res.body.object;
        var today = [],yesterday = [];
        list.forEach(function(item,index){
            var node = {
              id:item.api_history_id,
              label:(item.args.name || "")+ " " +item.args.url,
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
      databaseClick(index){
        this.databaseFilterActiveId = index;
      },
      refreshClick(){
        this.databaseFilterText = '';
        this.$http.post('/api/database/refresh',this.args).then(res=>{
          if(res.body.success){
            this.database = res.body.object;
            this.filterDatabase();
            this.result = '';
          }else{
            if(typeof res.body.message == "object"){
              this.result = JSON.stringify(res.body.message);
            }else{
              this.result = res.body.message;
            }
          }
        });
      },
      handleNodeClick(data){
        this.args = data.args;
        this.result = '';
      },
      //////////////////////////////////////////////////////////////////////////
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      filterDatabase(){
        this.databaseFilter = [];
        this.databaseFilterActiveId = -1;
        this.database.forEach((item) => {
          if(!this.databaseFilterText){
            this.databaseFilter.push(item);
            return true;
          }
          if(item.indexOf(this.databaseFilterText)>=0){
            this.databaseFilter.push(item);
          }
        });
      }
    },
    watch:{
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      databaseFilterText(){
        this.filterDatabase();
      },
      databaseFilterActiveId(){
        var database = this.databaseFilter[this.databaseFilterActiveId];
        this.$http.post("/api/database/detail",{
          args:this.args,
          database:database
        }).then(res => {
          if(res.body.success){
            this.result = JSON.stringify(res.body.object);
          }else{
            if(typeof res.body.message == "object"){
              this.result = JSON.stringify(res.body.message);
            }else{
              this.result = res.body.message;
            }
          }
        });
      }
    }
  }
</script>

<style>
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
  .database-table{
    font-size: 0;
  }
  .database-table li{
    font-size:14px;
    display: inline-block;
    padding:10px;
    cursor: pointer;
    width: 180px;
    margin-right: 5px;
    margin-top: 10px;
  }
  .database-table li:hover{
    background: #e4e8f1;
  }
  .database-table li.active{
    background: #edf7ff;
  }
</style>
