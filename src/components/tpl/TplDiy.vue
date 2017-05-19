<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="20"
          placeholder="自定义数据"
          resize="none"
          v-model="inData">
        </el-input>
      </el-col>
    </el-row>
    <el-row class="mgt15">
      <el-col :span="24">
      <el-form :inline="true" :model="plan">
        <el-form-item label="方案">
          <el-select v-model="planId" placeholder="请选择" class="w150" @change="planChanged">
            <el-option v-for="(item,index) in planList" :key="item" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据流程">
          <el-select v-model="plan.flow" placeholder="请选择" class="w150">
            <el-option v-for="(item,index) in flowList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="根目录">
          <el-input v-model="plan.base_dir" placeholder="根目录" style="width:390px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onNewClick">新建</el-button>
          <el-button type="success" @click="onSaveClick">保存</el-button>
          <el-button type="success" @click="onEditClick">修改</el-button>
          <el-button type="danger" @click="onDeleteClick">删除</el-button>
        </el-form-item>
      </el-form>
        </el-col>
    </el-row>

    <el-row>
      <template v-for="(item,index) in plan.ext">
        <el-col :span="11" >
          <div style="margin-top: 15px;" class="input-key">
            <el-input v-model="item.key" placeholder="扩展字段(key)"></el-input>
          </div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div style="margin-top: 15px;" class="input-value">
            <el-input v-model="item.value" placeholder="扩展字段(value)"></el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div style="margin-top: 15px;" class="input-value">
            <el-tooltip v-if="plan.ext.length > 1" class="item" effect="dark" content="删除" placement="right">
              <el-button @click="deleteRowClick(plan.ext,index)" type="text" icon="delete"></el-button>
            </el-tooltip>
          </div>
        </el-col>
      </template>

    </el-row>

    <el-row>
      <el-col :span="6">
        <div style="margin-top: 15px;">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>

        <el-tree
          class="filter-tree"
          show-checkbox
          :data="fileList"
          :props="defaultProps"
          :highlight-current="true"
          default-expand-all
          :filter-node-method="filterNode"
          @check-change="treeCheckChange"
          node-key="path"
          ref="tree">
        </el-tree>
        </div>
      </el-col>
      <el-col :span="17" :offset="1">
          <el-row style="margin-top: 15px;">
            <el-col :span="12">
                <ul class="list">
                  <li :class="(index == selectedListActive)?'active':''" @click="selectedListClick(index)" v-for="(item,index) in plan.file_list">{{item.label}}</li>
                </ul>
            </el-col>
            <el-col :span="12">
                <div class="file-setting" v-if="selectedListActive >= 0">
                  <el-form ref="selectedListActiveFile" :model="selectedListActiveFile" label-width="80px">
                  <el-form-item label="备注">
                    <el-input v-model="selectedListActiveFile.marker" placeholder="备注"></el-input>
                  </el-form-item>
                  <el-form-item label="目标地址">
                    <el-input v-model="selectedListActiveFile.target" placeholder="目标地址"></el-input>
                  </el-form-item>
                  </el-form>
                </div>
            </el-col>
          </el-row>
      </el-col>
    </el-row>


    <el-row class="mgt15" style="background:#dedede;padding:15px;">
      <el-col :span="24">
        <el-button type="danger" @click="onCreateClick(true)">覆盖生成</el-button>
        <el-button type="primary" @click="onCreateClick(false)">不覆盖生成</el-button>
        <el-button type="primary" @click="onClearClick()">清空日志</el-button>
      </el-col>
    </el-row>

    <el-row class="mgt15">
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="20"
          placeholder="结果"
          resize="none"
          readonly="readonly"
          v-model="outData">
        </el-input>
      </el-col>
    </el-row>

    <el-dialog title="方案" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="方案名称" label-width="80px">
          <el-input v-model="formPlanName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDialogOK()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog
      title="是否删除"
      :visible.sync="dialogVisible"
      size="tiny">
      <span>是否删除该方案</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDialogDeleteOK()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    mounted(){
      this.$http.get('/api/diy/listTplTree').then(res => {
        this.fileList = res.body.object;
      });
      this.$http.get('/api/diy/listFlow').then(res => {
        this.flowList = res.body.object;
      });
      this.$http.get('/api/plan/list').then(res => {
        this.planList = res.body.object;
      });
    },
    data(){
      return {
        inData:'',
        outData:'',
        filterText:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        fileList:[
        ],
        selectedListActive:-1,
        selectedListActiveFile:{
          marker:'',
          target:''
        },
        flowList:[],
        planList:[],
        dialogFormVisible:false,
        dialogVisible:false,
        dialogType:'NEW',
        formPlanName:'',
        planId:'',
        plan:{
          id:0,
          name:'',
          base_dir:'',
          flow:'defaultFlow',
          ext:[{key:'',value:''}],
          file_list:[]
        }
      }
    },
    methods:{
      onDialogOK(){
        this.dialogFormVisible = false;

        var postData = JSON.parse(JSON.stringify(this.plan));
        var isNew = this.dialogType == "NEW";
        if(this.dialogType == "NEW"){
          postData.name = this.formPlanName;
          postData.id = 0;
          this.formPlanName = "";
        }else if(this.dialogType == "EDIT"){
          this.plan.name = this.formPlanName;
          postData.name = this.formPlanName;
          this.formPlanName = "";
        }

        this.$http.post('/api/plan/save',postData).then(res => {
          this.initData(res.body.object,isNew);
          this.$message({
            message: '操作成功',
            type: 'success'
          });

        });
      },
      onClearClick(){
        this.outData = '';
      },
      deleteRowClick(row,index){
        row.splice(index,1);
      },
      onNewClick(){
        this.dialogFormVisible = true;
        this.dialogType = 'NEW';
      },
      onSaveClick(){
        this.dialogType = 'SAVE';
        this.onDialogOK();
      },
      onEditClick(){
        this.dialogFormVisible = true;
        this.dialogType = 'EDIT';
        this.formPlanName = this.plan.name;
      },
      onDeleteClick(){
        if(!this.plan.id){
          return this.$message.error("请先选择一个方案");
        }
        this.dialogVisible = true;
      },
      onDialogDeleteOK(){
        this.dialogVisible = false;
        if(!this.plan.id){
          return this.$message.error("请先选择一个方案");
        }
        this.$http.post("/api/plan/delete",{id:this.plan.id}).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          var index = 0;
          this.planList.forEach((item,i) => {
            if(item.id == this.plan.id){
              index = i;
            }
          });
          this.planList.splice(index,1);
          this.initData(this.planList[0],false);
        });
      },
      onCreateClick(override){
        var inData = eval("("+(this.inData || "{}")+")");
        this.$http.post("/api/diy/create",{
          inData:inData,
          override:(override === true?true:false),
          plan:this.plan
        }).then(res => {
          this.outData+="------------------------------------------\r\n"+res.body.object.join("\r\n")+"\r\n";
        });
      },
      selectedListClick(index){
        this.selectedListActive = index;
      },
      treeCheckChange(data){
        if(data.children && data.children.length >0)return;
        var selectedList = [];
        this.$refs.tree.getCheckedNodes().forEach(item =>{
          if(!item.children || item.children.length == 0){
            selectedList.push(item);
          }
        });
        this.plan.file_list = selectedList;
        this.selectedListActive = selectedList.length == 0?-1:0;
        this.onSelectedListChange();
      },
      //////////////////////////////////////////////////////////////
      planChanged(){
        var self = this;
        if(this.planList.length == 0){
          this.plan = {
            id:0,
            name:'',
            base_dir:'',
            flow:'defaultFlow',
            ext:[{key:'',value:''}],
            file_list:[]
          };
        }else{
          this.planList.forEach(item => {
            if(item.id == this.planId){
              this.plan = item;
            }
          });
        }
        function replacePath(path){
          while(path.indexOf("\\") != -1){
            path = path.replace("\\","/");
          }
          return path;
        }
        //根据plan去还原整个文件树
        function formatTree(tree){
          if(!tree || tree.length == 0) return;
          tree.forEach(item => {
            item.marker = '';
            item.target = '';
            self.$refs.tree.setChecked(item,false);
            self.plan.file_list.forEach(file => {
              if(!file.file || replacePath(item.path) == replacePath(file.file)){
                //勾选
                item.marker = file.marker;
                item.target = file.target;
                self.$refs.tree.setChecked(item,true);
              }
            });
            formatTree(item.children);
          });
        }
        formatTree(this.fileList);

      },
      initData(data,isNew){
        data = data || {};
        if(isNew){
          this.planList.push(data);
        }
        this.planId = data.id;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      onSelectedListChange(){
        var index = this.selectedListActive;
        if(index < 0)return;
        this.selectedListActiveFile = this.plan.file_list[index];
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
      selectedListActive(){
        this.onSelectedListChange();
      },
      "plan.ext":{
        handler(){
          this.formatRow(this.plan.ext);
        },
        deep:true
      },
    }
  }
</script>


<style>
  ul,li{
    padding: 0;margin: 0;
  }
  li{
    list-style: none;
  }
  .list,.file-setting{
    box-sizing: border-box;
    width: 100%;
    height: 500px;
    border: 1px solid #bfcbd9;
    overflow: auto;
  }
  .file-setting{
    box-sizing: border-box;
    padding:10px 20px;
  }
  .list li{
    box-sizing: border-box;
    width: 100%;
    padding:10px;
    cursor: pointer;
  }
  .list li:hover{
    background: #e4e8f1;
  }
  .list li.active{
    background: #edf7ff;
  }
  .w150,.w150 .el-input{
    width:150px;
  }
  .mgt15{
    margin-top: 15px;
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
