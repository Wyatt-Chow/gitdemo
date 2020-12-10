<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>




<script>
  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }
    },
    created (){
      window.reload = this.reload;
    },
    components: {
    }
  }
</script>

<style lang="scss">
  .el-aside, .el-main {
    overflow: hidden;
  }
  .opinion_textarea_none{
    border-radius: 3px;
    border: 1px solid rgb(210, 0, 0);
    margin-right: 60px;
    padding-left: 8px;
    font-size: 14px;
    line-height: 40px;
    color: #606266;
  }
  body {
    .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: #eeb726;
      border-color: #eeb726;
    }
    .main_top{
      border: 1px solid #ebebeb;
    }
    .main_top_01{
      width:100%;background: #FFF;margin-bottom: 10px;margin-top: 10px
    }
    .el-table th {
      height: 40px;
      line-height: 40px;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #fff;
      background-color: #ee6401;
      border-color: #ee6401;
      -webkit-box-shadow: -1px 0 0 0 #ee6401;
      box-shadow: -1px 0 0 0 #ee6401;
    }
    .el-input {
      font-size: 14px;
    }
    .el-button--primary {
      background-color: #eeb726;
      border-color: #eeb726;
    }
    .el-button--primary:hover {
      background-color: #fe9409 !important;
      border-color: #fe9409 !important;
    }
    .el-button--primary:focus, .el-button--primary:hover {
      background: #fe9409 !important;
      border-color: #fe9409 !important;
    }
    .el-table__row:hover>td {background-color:#e6a23c47 !important;}
    .el-checkbox__input.is-checked  .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #ff6464;
      border-color: #ff6464;
    }
    .el-checkbox__inner:hover,.el-checkbox__input.is-focus .el-checkbox__inner  {
      border-color: #ff6464;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{background-color: #fef1f1;}
    .el-table--enable-row-focus .el-table__body tr:focus>td{background-color: #fef1f1;}
    .el-table th.is-leaf {border-bottom: 1px solid #dddddd;}
    .el-table--striped .el-table__body tr.el-table__row--striped td{background: #F8f8f8;}
    .el-table td {border-bottom: none; }
    .el-table td{
      padding: 5px 0;
    }
    .el-table th>.cell { text-align:center;color:#383838fa;font-size: 14px;font-weight: normal }
    // .el-table td>.cell { text-align:center; font-size: 12px; }
    .el-table .cell{ text-align:center; line-height: 34px;font-size: 14px;}
    .el-table thead{ color: #333; }

    .table-page {
      .el-input__inner{
        font-size: 12px;
      }
      .el-pager li .el-input__inner {
        font-size: 12px;
      }
      .el-pagination {
        white-space: nowrap;
        color: #303133;
        background: #FFF;
        font-weight: 700;
        text-align: right;
        padding-top: 10px;
      }
    }
    margin: 0px;
    padding: 0px;
    /*background: url(assets/bg1.jpg) center !important;
          background-size: cover;*/
    // background: #1F2D3D;
    font-family:"Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    //border:1px solid #dfe6ec;
    margin: 10px 0px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
