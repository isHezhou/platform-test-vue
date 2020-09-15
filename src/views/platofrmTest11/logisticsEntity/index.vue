<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="物流名称">
          <el-input v-model="listQuery.logName" placeholder="物流名称"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="物流编号">
          <el-input v-model="listQuery.logCode" placeholder="物流编号"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"/>
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
      <el-table-column label="物流名称"
                       prop="logName"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.logName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物流编号"
                       prop="logCode"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.logCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传照片"
                       prop="uploadPhoto"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
         <span><el-button type="text" @click="handleUploadPhotoFileShow(row)">图片详情</el-button></span>
        </template>
      </el-table-column>
      <el-table-column label="上传文件"
                       prop="uploadFile"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
         <span><el-button type="text" @click="handleUploadFileFileShow(row)">文件详情</el-button></span>
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
          <el-dropdown trigger="click" style="margin-left:10px;" @command="handleCommand">
            <span class="el-dropdown-link button-font">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{method:'handleShow',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-view" />查看</el-link>
              </el-dropdown-item>
              <el-dropdown-item :command="{method:'handleDeleteSingle',arg:row}">
                <el-link type="danger" :underline="false"><i class="el-btn-icon-show el-icon-delete" />删除</el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        <!-- 查看表单 -->
        <logisticsEntity-show ref="logisticsEntityShow"/>
        <!-- 新建表单 -->
        <logisticsEntity-add ref="logisticsEntityAdd"
                                @created="doQueryList({ page: 1 })"/>
        <!-- 编辑表单 -->
        <logisticsEntity-edit ref="logisticsEntityEdit"
                                @updated="doQueryList({})"/>
    <!-- 上传弹框 -->
    <el-dialog title="文件列表"
               :close-on-click-modal="false"
               v-el-drag-dialog
               :visible.sync="uploadPhotoVisible">
      <el-table :data="uploadPhotoFileList"
                highlight-current-row
                border stripe style="width: 100%;">
        <el-table-column
          type="index"
          width="100"
          fixed="left"
          align="center"
          label="序号"/>
        <el-table-column label="文件名称"
                         prop="name"
                         width="300"
                         align="center">
          <template slot-scope="{row}">
            <span><el-button type="text" @click="handleFileDownload(row)">{{ row.name }}</el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleFileDownload(row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadPhotoVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
    <!-- 上传弹框 -->
    <el-dialog title="文件列表"
               :close-on-click-modal="false"
               v-el-drag-dialog
               :visible.sync="uploadFileVisible">
      <el-table :data="uploadFileFileList"
                highlight-current-row
                border stripe style="width: 100%;">
        <el-table-column
          type="index"
          width="100"
          fixed="left"
          align="center"
          label="序号"/>
        <el-table-column label="文件名称"
                         prop="name"
                         width="300"
                         align="center">
          <template slot-scope="{row}">
            <span><el-button type="text" @click="handleFileDownload(row)">{{ row.name }}</el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleFileDownload(row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadFileVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import logisticsEntityAdd from './add'
import logisticsEntityEdit from './edit'
import logisticsEntityShow from './show'
import { getOffsetTop, queryToString } from '@/utils/public'
import logisticsEntityApi from '@/api/platofrmTest11/logisticsEntity'
import elDragDialog from '@/directive/el-drag-dialog'
import Pagination from '@/components/Pagination'

export default {
  name: 'LogisticsEntityTable',
  directives: { elDragDialog },
  components: {
    Pagination,
    logisticsEntityAdd,
    logisticsEntityEdit,
    logisticsEntityShow
  },
  data() {
    return {
      listQuery: {},
      tableHeight: -1,
      likeArray: [
          'logName',
          'logCode',
      ],
      uploadPhotoVisible: false,
      uploadPhotoFileList: [],
      uploadFileVisible: false,
      uploadFileFileList: [],
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
  },
  destroyed() {
    this.removeResize()
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
      return logisticsEntityApi.finds(args)
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
          logisticsEntityApi.del(row.id)
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
        this.$common.showMsg('warning', '请选择物流菜单')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() =>{
            this.listLoading = true
            logisticsEntityApi.deleteBatch(this.selectItems.map(row => row.id))
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
      this.$refs.logisticsEntityAdd.handleCreate()
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.logisticsEntityShow.handleShow(row)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.logisticsEntityEdit.handleUpdate(row)
    },
    /**
     * 展示文件详情
     * @param row
     */
    handleUploadPhotoFileShow(row){
      //情况详情列表
      this.uploadPhotoFileList = []
      logisticsEntityApi.findAllByBusinessCode(row.uploadPhoto)
        .then(res => {
          this.uploadPhotoFileList = res.data
        })
      this.uploadPhotoVisible = true
    },
    /**
     * 展示文件详情
     * @param row
     */
    handleUploadFileFileShow(row){
      //情况详情列表
      this.uploadFileFileList = []
      logisticsEntityApi.findAllByBusinessCode(row.uploadFile)
        .then(res => {
          this.uploadFileFileList = res.data
        })
      this.uploadFileVisible = true
    },
    /**
     * 文件下载
     * @param row
     */
    handleFileDownload(row){
      this.listLoading = true
      logisticsEntityApi.download(row.id).then(res => {
        this.listLoading = false
        let link = document.createElement('a');
        let body = document.querySelector('body');
        link.href = window.URL.createObjectURL(res);
        link.download = row.name;
        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }).catch(res => {
        this.listLoading = false
      })
    },
    exportExcel() {
      this.export()
    },
    exportAllExcel() {
      this.listLoading = true
      const args = Object.assign({}, this.query)
      args.total = this.total
      args.q = queryToString(this.listQuery)
      logisticsEntityApi.exportExcelAll(args).then(res=>{
        this.listLoading = false
        let link = document.createElement('a');
        let body = document.querySelector('body');
        link.href = window.URL.createObjectURL(res);
        link.download = "物流菜单记录.xlsx";
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
      logisticsEntityApi.exportExcel(args).then(res=>{
        this.listLoading = false
        let link = document.createElement('a');
        let body = document.querySelector('body');
        link.href = window.URL.createObjectURL(res);
        link.download = "物流菜单记录（第" + args.pageNum + "页）.xlsx";
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
        logisticsEntityApi.importExcel(excelFile).then(res=>{
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
