<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="所属订单">
           <el-select v-model="listQuery.theOrderId" class="filter-item"
                      placeholder="所属订单"
                     filterable clearable>
                <el-option v-for="item in options.theOrder"
                           :key="item.id"
                           :label="item.theOrderName"
                           :value="item.id">
                </el-option>
          </el-select>
      </el-form-item>
        <el-form-item label="爱好">
            <el-select v-model="listQuery.hobby" class="filter-item"
                     placeholder="爱好"
                     filterable clearable>
                      <el-option v-for="item in dictList['hobby']"
                                 :key="item.value"
                                 :label="item.name"
                                 :value="item.value">
                      </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属物流">
           <el-select v-model="listQuery.logId" class="filter-item"
                      placeholder="所属物流"
                     filterable clearable>
                <el-option v-for="item in options.logisticsEntity"
                           :key="item.id"
                           :label="item.logName"
                           :value="item.id">
                </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">
          <i class="el-btn-icon-show el-icon-search" /> 搜索
        </el-button>
        <el-button @click="handleReset">
          <i class="el-btn-icon-show el-icon-refresh-left" /> 重置
        </el-button>
      </el-form-item>
    </el-form>
</div>
<div class="button-container">
      <el-button  @click="handleCreate"><i class="el-btn-icon-show el-icon-plus" /> 新增</el-button>
      <el-button @click="handleDeleteBatch"><i class="el-btn-icon-show el-icon-delete" /> 批量删除</el-button>
      <el-button @click="exportExcel"><i class="el-btn-icon-show el-icon-download" /> 导出当前页</el-button>
      <el-button @click="exportAllExcel"><i class="el-btn-icon-show  el-icon-download" /> 导出全部</el-button>
     <el-button>
        <label class="export-excel" for="el-upload"><i class="el-btn-icon-show  el-icon-upload2" /> 导入Excel</label>
        <el-upload
          v-show="false"
          class="filter-item"
          ref="uploadFile"
          action=""
          :on-change="importExcel"
          :show-file-list="false"
          accept=".xlw,.xls,.xlsx"
          :auto-upload="false">
          <el-button slot="trigger" id="el-upload" class="filter-item" icon="el-icon-upload2">导入Excel</el-button>
        </el-upload>
      </el-button>
</div>
<div class="table-container">
    <el-table  :data="list" highlight-current-row
              @selection-change="selectionChange"
              @sort-change="sortChange"
              :height="tableHeight"
              ref="el-table"
              border stripe style="width: 100%;">
      <el-table-column type="selection"  
                       width="50" />
      <el-table-column
            type="index"
            width="65"
            fixed="left"
            align="center"
            label="序号"/>
      <el-table-column label="名称"
                       prop="testName"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.testName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属订单"
                       prop="theOrderId"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
         <span>{{ row.theOrderId | findForeignKey(options.theOrder,'theOrderName')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="爱好"
                       prop="hobby"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.hobby | findEnumLabel(dictList['hobby']) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属物流"
                       prop="logId"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
         <span>{{ row.logId | findForeignKey(options.logisticsEntity,'logName')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开关"
                       prop="isOpen"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <svg-icon v-if="row.isOpen" class-name="table-cell-icon color-success" icon-class="check" />
          <svg-icon v-else class-name="table-cell-icon color-danger" icon-class="times" />
        </template>
      </el-table-column>
      <el-table-column label="性别"
                       prop="sex"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex | findEnumLabel(dictList['Sex']) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
                       prop="createName"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.createName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       prop="createTime"
                       width="200"
                       sortable="custom"
                       align="center">
        <template slot-scope="{row}">
         <span>{{ row.createTime | utoTimeToBeijing }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改人"
                       prop="modifyName"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.modifyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间"
                       prop="modifyTime"
                       width="200"
                       sortable="custom"
                       align="center">
        <template slot-scope="{row}">
         <span>{{ row.modifyTime | utoTimeToBeijing }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="{row}">
          <el-link class="padding-right-10" :underline="false" type="primary" @click="handleUpdate(row)">
            <i class="el-btn-icon-show el-icon-edit-outline" />编辑
          </el-link>
          <el-link class="padding-right-10" :underline="false" type="danger" @click="handleDeleteSingle(row)">
            <i class="el-btn-icon-show el-icon-delete" /> 删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
</div>
    <pagination
       v-show="total>0"
       ref="el-pagination"
       :total="total"
       :page.sync="query.page"
       :limit.sync="query.limit"
       @pagination="doQueryList"/>
        <!-- 新建表单 -->
        <testEntity-add ref="testEntityAdd"
                                @created="doQueryList({ page: 1 })"/>
        <!-- 编辑表单 -->
        <testEntity-edit ref="testEntityEdit"
                                @updated="doQueryList({})"/>
  </div>
</template>

<script>
import testEntityAdd from './add'
import testEntityEdit from './edit'
import { getOffsetTop, queryToString } from '@/utils/public'
import testEntityApi from '@/api/platofrmTest11/testEntity'
import theOrderApi from '@/api/platofrmTest11/theOrder'
import logisticsEntityApi from '@/api/platofrmTest11/logisticsEntity'
import elDragDialog from '@/directive/el-drag-dialog'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'TestEntityTable',
  directives: { elDragDialog },
  components: {
    Pagination,
    testEntityAdd,
    testEntityEdit
  },
  data() {
    return {
      listQuery: {},
      tableHeight: -1,
      likeArray: [
          'theOrderId',
          'hobby',
          'logId',
      ],
      options: {
        theOrder: [],
        logisticsEntity: []
      },
      list: [],
      total: 0,
      listLoading: true,
      query: {
        pageNum: 1,
        pageSize: 20,
        sortBy: 'id',
        sortOrder: 'desc',
        q: ''
      },
      selectItems: []
    }
  },
  mounted() {
    this.resize()
    this.doQueryList({ page: 1 })
    let query = {sortBy: 'id',sortOrder: 'desc',q: ''}
    theOrderApi.findOptions(query).then(res => { this.options.theOrder = res.data })
    logisticsEntityApi.findOptions(query).then(res => { this.options.logisticsEntity = res.data })
  },
  destroyed() {
    this.removeResize()
  },
  computed: {
    ...mapGetters([
      'dictList'
    ])
  },
  methods: {
    /**
     * 选择框变化
     */
    selectionChange(val) {
      this.selectItems = val
    },
    /**
     * 触发后端排序
     */
    sortChange({ prop, order }) {
      const sortKeyMap = {
        'createTime': 'createTimeSortSign',
        'modifyTime': 'modifyTimeSortSign'
      }
      for (var k in sortKeyMap) {
        const sortKey = sortKeyMap[k]
        if (k !== prop) {
          this.query[sortKey] = null
        } else {
          if (order === 'ascending') {
            this.query[sortKey] = 1
          } else {
            this.query[sortKey] = -1
          }
        }
      }
      this.doQueryList({})
    },
    /**
     * 触发搜索操作
     */
    handleQuery() {
      this.doQueryList({ page: 1 })
    },
    // 重置按钮方法
    handleReset() {
      this.query = {
        pageNum: 1,
        pageSize: 20,
        sortBy: 'id',
        sortOrder: 'desc'
      }
      this.listQuery = {
        searchText: ''
      }
      this.doQueryList({ page: 1 })
    },
    /**
     * 操作下拉对应方法
     * @param command
     */
    handleCommand: function(command) {
      this[command.method](command.arg)
    },
    /**
     * 计算列表高度
     */
    resizeHeight() {
      this.tableHeight = getOffsetTop({
        self: this,
        otherNumber: 20
      })
    },
    resize() {
      this.resizeHeight()
      window.addEventListener('resize', this.resizeHeight, false)
    },
    removeResize() {
      window.removeEventListener('resize', this.resizeHeight, false)
    },
    /**
     * 执行列表查询
     */
    doQueryList({ page, limit }) {
      if (page) {
        this.query.pageNum = page
      }
      if (limit) {
        this.query.pageSize = limit
      }
      this.listLoading = true

      const args = Object.assign({}, this.query)
      args.q = queryToString(this.listQuery)
      this.listLoading = true
      return testEntityApi.finds(args)
        .then(res => {
          this.list = res.data.list
          this.total = res.data.total
        })
        .finally(() => {
          this.listLoading = false
        })
    },

    /**
     * 删除单条记录
     */
    handleDeleteSingle(row) {
      return this.$common.confirm('是否确认删除')
        .then(() => {
          this.listLoading = true
          testEntityApi.del(row.id)
          .then(() => {
                this.$common.showMsg('success', '删除成功')
                return this.doQueryList({ page: 1 })
          })
        })
        .catch(() => {
          this.$message({type: 'info',message: '已取消删除'})
        })
    },
    /**
     * 批量删除记录
     */
    handleDeleteBatch() {
      if (this.selectItems.length <= 0) {
        this.$common.showMsg('warning', '请选择普通菜单')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() =>{
            this.listLoading = true
            testEntityApi.deleteBatch(this.selectItems.map(row => row.id))
            .then(() => {
                this.$common.showMsg('success', '删除成功')
                return this.doQueryList({ page: 1 })
            }).catch(()=>{
                this.listLoading = false
            })
        }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消删除'
          })
        })
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.$refs.testEntityAdd.handleCreate()
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.testEntityEdit.handleUpdate(row)
    },
    exportExcel() {
      this.export()
    },
    exportAllExcel() {
      this.listLoading = true
      const args = Object.assign({}, this.query)
      args.total = this.total
      args.q = queryToString(this.listQuery)
      testEntityApi.exportExcelAll(args).then(res=>{
        this.listLoading = false
        let link = document.createElement('a');
        let body = document.querySelector('body');
        link.href = window.URL.createObjectURL(res);
        link.download = "普通菜单记录.xlsx";
        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      })
    },
    export(pageNum) {
      this.listLoading = true
      const args = Object.assign({}, this.query)
      args.q = queryToString(this.listQuery)
      if (pageNum) {
        args.pageNum = pageNum
      }
      testEntityApi.exportExcel(args).then(res=>{
        this.listLoading = false
        let link = document.createElement('a');
        let body = document.querySelector('body');
        link.href = window.URL.createObjectURL(res);
        link.download = "普通菜单记录（第" + args.pageNum + "页）.xlsx";
        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      })
    },
    importExcel(file){
      this.listLoading = true
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        let excelFile = {}
        excelFile.base64Str = e.target.result
        testEntityApi.importExcel(excelFile).then(res=>{
          if (res.code === '000000') {
            this.$message({
              type: 'success',
              message: '导入成功!'
            })
            this.doQueryList({ page: 1 })
          }else{
            this.$message({
              type: 'error',
              message: res.message
            })
            this.listLoading = false
          }
        }).catch(()=>{
          this.listLoading = false
        })
      }
    }
  }
}
</script>
