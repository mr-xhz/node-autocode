<template>
  <div id="app">
    <header class="header">
    <el-row>
      <el-col :span="20">
        <el-menu  :router="true" theme="dark" :default-active="activeIndex" class="el-menu" mode="horizontal">
          <el-menu-item index="/">我的项目</el-menu-item>
          <el-menu-item index="/tpl/api">接口</el-menu-item>
          <el-menu-item index="/tpl/diy">自定义结构</el-menu-item>
          <el-menu-item index="/tpl/database">数据库模型</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <account></account>
      </el-col>
    </el-row>
    </header>
    <el-row>
      <el-col :span="24">
      <div class="grid-content">
        <router-view></router-view>
      </div>
    </el-col>
    </el-row>
    <footer>
      <div>autocode @copyright xhz</div>
    </footer>
</div>
</template>

<script>

import Account from '@/components/header/Account'

export default {
  name:"App",
  data(){
    return {
      activeIndex:"/"
    }
  },
  methods:{
  },
  components:{
    Account
  }
}
</script>


<style>
  html,body{
    padding: 0;margin: 0;
  }
  .header{
    background: #324157;
  }
  .grid-content{
    width:1200px;
    margin:0 auto;
    padding:50px 0 0 0;
  }
  footer{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
