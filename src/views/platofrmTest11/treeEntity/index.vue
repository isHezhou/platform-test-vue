<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="编码">
          <el-input v-model="listQuery.taCode" placeholder="编码"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="菜单名称">
          <el-input v-model="listQuery.taName" placeholder="菜单名称"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="开始时间">
          <el-date-picker v-model="listQuery.stratDate" type="date"
                          class="filter-item"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
          <el-date-picker v-model="listQuery.endDateTime" type="datetime"
                          class="filter-item"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="结束时间"></el-date-picker>
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
</div>
<div class="table-container">
    <el-table  :data="list" highlight-current-row
              @selection-change="selectionChange"
              @sort-change="sortChange"
              :tree-props="{children: 'children'}"
              row-key="id"
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
      <el-table-column label="编码"
                       prop="taCode"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.taCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单名称"
                       prop="taName"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.taName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传图片"
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
      <el-table-column label="开始时间"
                       prop="stratDate"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
         <span>{{ row.stratDate | utoDateToBeijing }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间"
                       prop="endDateTime"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
         <span>{{ row.endDateTime | utoTimeToBeijing }}</span>
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
              <el-dropdown-item :command="{method:'handleCreateChild',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-plus" />添加下级</el-link>
              </el-dropdown-item>
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
        <!-- 查看表单 -->
        <treeEntity-show ref="treeEntityShow"/>
        <!-- 新建表单 -->
        <treeEntity-add ref="treeEntityAdd"
                                :treeList = "treeOptions"
                                @created="doQueryList({})"/>
        <!-- 编辑表单 -->
        <treeEntity-edit ref="treeEntityEdit"
                                :treeList = "treeOptions"
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
import treeEntityAdd from './add'
import treeEntityEdit from './edit'
import treeEntityShow from './show'
import { getOffsetTop, queryToString } from '@/utils/public'
import treeEntityApi from '@/api/platofrmTest11/treeEntity'
import elDragDialog from '@/directive/el-drag-dialog'
import { mapGetters } from 'vuex'

export default {
  name: 'TreeEntityTable',
  directives: { elDragDialog },
  components: {
    treeEntityAdd,
    treeEntityEdit,
    treeEntityShow
  },
  data() {
    return {
      listQuery: {},
      tableHeight: -1,
      likeArray: [
          'taCode',
          'taName',
          'stratDate',
          'endDateTime',
          'hobby',
      ],
      uploadPhotoVisible: false,
      uploadPhotoFileList: [],
      uploadFileVisible: false,
      uploadFileFileList: [],
       treeOptions: undefined,
      list: [],
      total: 0,
      listLoading: true,
      query: {
        sortBy: 'id',
        sortOrder: 'desc',
        q: ''
      },
      selectItems: []
    }
  },
  mounted() {
    this.resize()
    this.doQueryList()
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
      this.doQueryList()
    },
    // 重置按钮方法
    handleReset() {
      this.query = {
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
    doQueryList() {
      this.listLoading = true

      const args = Object.assign({}, this.query)
      args.q = queryToString(this.listQuery)
      this.listLoading = true
      return treeEntityApi.treeList(args)
        .then(res => {
          this.list = res.data
          this.treeOptions = [{ 'id': 0, 'label': '无上级' }].concat(this.dealTreeOptions(this.list))
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
          treeEntityApi.del(row.id)
          .then(() => {
                this.$common.showMsg('success', '删除成功')
                return this.doQueryList()
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
        this.$common.showMsg('warning', '请选择树形菜单')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() =>{
            this.listLoading = true
            treeEntityApi.deleteBatch(this.selectItems.map(row => row.id))
            .then(() => {
                this.$common.showMsg('success', '删除成功')
                return this.doQueryList()
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
      this.$refs.treeEntityAdd.handleCreate()
    },
    /**
     * 打开子菜单
     */
    handleCreateChild(row) {
      this.$refs.treeEntityAdd.handleCreateChild(row.id)
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.treeEntityShow.handleShow(row)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.treeEntityEdit.handleUpdate(row)
    },
    dealTreeOptions(list) {
      const treeList = []
      if (!list) {
        return treeList
      }
      list.map(menu => {
        const treeMenu = {
          id: menu.id,
          label: menu.taName
        }
        if (menu.children && menu.children.length) {
          treeMenu.children = this.dealTreeOptions(menu.children)
        }
        treeList.push(treeMenu)
      })
      return treeList
    },
    /**
     * 展示文件详情
     * @param row
     */
    handleUploadPhotoFileShow(row){
      //情况详情列表
      this.uploadPhotoFileList = []
      treeEntityApi.findAllByBusinessCode(row.uploadPhoto)
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
      treeEntityApi.findAllByBusinessCode(row.uploadFile)
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
      treeEntityApi.download(row.id).then(res => {
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
    }
  }
}
</script>
