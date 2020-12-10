<template>
  <div>
    <div class="main_top_01">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <label style="padding-left: 30px">商户名称:</label>
          <el-input size="mini" style="width:20%"></el-input>
          <label style="padding-left: 50px">商户类型:</label>
          <template>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 20%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <label style="padding-left: 50px">状态:</label>
          <el-select v-model="value"  placeholder="请选择" size="mini" style="width:20%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label style="padding-left: 30px">注册日期:</label>
          <el-date-picker
            size="mini"
            style="width:20%"
            v-model="endTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button size="mini" type="primary" style="margin-left:50.5%">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container style="padding: 10px 10px;border: 1px solid #ebebeb; border-radius: 4px;">
      <el-header style="height: 600px;overflow:auto;">
        <el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%">
          <el-table-column label="商户代码"  show-overflow-tooltip prop="title">
          </el-table-column>
          <el-table-column prop="appTypeName" label="商户名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="processname" label="账户类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="urgencyName" label="账户ID" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="creatorName" label="账户余额" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="senderName" label="账户可用余额" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="senderName" label="账户冻结金额" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="senderName" label="状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="createDate" label="注册时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.createDate | date('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="activityName" label="操作" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="table-page" >
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="searchParams.page"
                         :page-sizes="[5, 10, 15, 20]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "membershipManagement",
    data() {
      return {
        outgoingIsOpen: true,
        tableData: [],
        multipleSelection: [],
        myDoneappTypeList:'',
        secretOptionObject:{},
        simpleSearchValue:'',
        searchParams: {
          page: 1,
          pageSize: 10,
        },
        currentPage: 1,
        total:0,
        styleObj: {
          'color':'red'
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },

  }
</script>


<style  lang="scss">

</style>
