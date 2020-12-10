<template>
  <div clss="personnelInfoBasice-main" style="width:50%;border: 1px solid #c0c4cc;background: #FFF;margin: 0 auto">
      <el-form ref="form" :model="form" label-width="100px" style="margin: 30px; width: 80%">
        <el-form-item label="红包类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="红包名称">
          <el-col :span="24">
            <el-input v-model="form.date1" style="width: 52%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="总发放日期">
          <el-col :span="24">
            <el-input v-model="form.delivery" style="width: 52%"></el-input><span style="padding-left: 10px">元</span>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button type="danger">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default {
    name:'addRedEnvelopeRule',
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style  lang="scss">
  .personnelInfoBasice-main {
    width: 100%;
    height: auto;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin: 10px auto;

  }
</style>
