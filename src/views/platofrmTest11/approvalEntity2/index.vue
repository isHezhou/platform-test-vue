<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="内容1">
          <el-input v-model="listQuery.content1" placeholder="内容1"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="内容2">
          <el-input v-model="listQuery.content2" placeholder="内容2"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="内容3">
          <el-input v-model="listQuery.content3" placeholder="内容3"
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
      <el-table-column type="selection"  :selectable="checkboxT"
                       width="50" />
      <el-table-column
            type="index"
            width="65"
            fixed="left"
            align="center"
            label="序号"/>
      <el-table-column label="流程状态"
                       prop="workflowState"
                       align="center">
        <template slot-scope="{row}">
          <span v-if="row.workflowState === '1'">草稿</span>
          <span v-if="row.workflowState === '2'">已驳回</span>
          <span v-if="row.workflowState === '3'">已提交</span>
          <span v-if="row.workflowState === '4'">已通过</span>
          <span v-if="row.workflowState === '5'">未通过</span>
          <span v-if="row.workflowState === '6'">已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="编码"
                       prop="treeCode"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.treeCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称"
                       prop="treeName"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.treeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容1"
                       prop="content1"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.content1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容2"
                       prop="content2"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.content2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容3"
                       prop="content3"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.content3 }}</span>
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
            {{getFieldFeature(row)}}
          <el-link v-if="isAttrHide(row,'details')" :disabled="row.workflowState === '1'" class="padding-right-10" :underline="false" type="primary" @click="handleDetails(row)">
            <i class="el-btn-icon-show el-icon-info" /> 流程
          </el-link>
          <el-dropdown v-if="row.workflowState != '6'" trigger="click" style="margin-left:10px;" @command="handleCommand">
            <span class="el-dropdown-link button-font">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="isAttrHide(row,'edit')" :command="{method:'handleUpdate',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-edit-outline" />编辑</el-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="isAttrHide(row,'delete')" :command="{method:'handleDeleteSingle',arg:row}">
                <el-link type="danger" :underline="false"><i class="el-btn-icon-show el-icon-delete" />删除</el-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="isAttrHide(row,'submit') && userId === row.createId" :command="{method:'handleSubmit',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-check" />提交</el-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="isAttrHide(row,'undo')" :command="{method:'handleUndo',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-back" />撤销</el-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="isAttrHide(row,'rushDo') && userId === row.createId" :command="{method:'handleRushDo',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-bell" />催办</el-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="isAttrHide(row,'archive')" :command="{method:'handleShow',arg:row}">
                <el-link type="primary" :underline="false"><i class="el-btn-icon-show el-icon-s-cooperation" />归档</el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
</div>
        <!-- 查看表单 -->
        <approvalEntity2-show ref="approvalEntity2Show"/>
        <!-- 新建表单 -->
        <approvalEntity2-add ref="approvalEntity2Add"
                                :treeList = "treeOptions"
                                @created="doQueryList({})"/>
        <!-- 编辑表单 -->
        <approvalEntity2-edit ref="approvalEntity2Edit"
                                :treeList = "treeOptions"
                                @updated="doQueryList({})"/>
    <!-- 详情表单 -->
    <Tabs ref="tabs" :params="params" @doQueryList="doQueryList({})"/>
    <!-- 撤销表单 -->
    <approvalEntity2-undo ref="approvalEntity2Undo" @undo="doQueryList({})"/>
  </div>
</template>

<script>
import approvalEntity2Add from './add'
import approvalEntity2Edit from './edit'
import approvalEntity2Show from './show'
import Tabs from '@/components/Tabs/index'
import approvalEntity2Undo from './undo'
import defaultSettings from '@/settings'
import { getAccessToken } from '@/utils/auth'
import { getOffsetTop, queryToString } from '@/utils/public'
import approvalEntity2Api from '@/api/platofrmTest11/approvalEntity2'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'ApprovalEntity2Table',
  directives: { elDragDialog },
  components: {
    approvalEntity2Add,
    approvalEntity2Edit,
    approvalEntity2Show,
    approvalEntity2Undo,
    Tabs
  },
  data() {
    return {
      params: {
        'businessKey': '47d77a8e6e39455da7e7de2a1fee2e19',
        'variable-name': 'workflowPrefix_form'
      },
      listQuery: {},
      tableHeight: -1,
      likeArray: [
          'content1',
          'content2',
          'content3',
      ],
      userId: '',
      remoteCallPayload: {
        url: '',
        token: '',
        method: 'post',
        state: 0
      },
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
  this.userId = this.$store.getters.userId
    this.resize()
    this.doQueryList()
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
      return approvalEntity2Api.treeList(args)
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
          approvalEntity2Api.del(row.id)
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
        this.$common.showMsg('warning', '请选择树形审批菜单')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() =>{
            this.listLoading = true
            approvalEntity2Api.deleteBatch(this.selectItems.map(row => row.id))
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
      this.$refs.approvalEntity2Add.handleCreate()
    },
    /**
     * 打开子菜单
     */
    handleCreateChild(row) {
      this.$refs.approvalEntity2Add.handleCreateChild(row.id)
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.approvalEntity2Show.handleShow(row)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.approvalEntity2Edit.handleUpdate(row)
    },
    dealTreeOptions(list) {
      const treeList = []
      if (!list) {
        return treeList
      }
      list.map(menu => {
        const treeMenu = {
          id: menu.id,
          label: menu.treeName
        }
        if (menu.children && menu.children.length) {
          treeMenu.children = this.dealTreeOptions(menu.children)
        }
        treeList.push(treeMenu)
      })
      return treeList
    },
    /**
     * 根据数据状态按钮是否隐藏
     */
    isAttrHide(row,attr) {
      return row.hiddenAttrs.includes(attr)
    },
    /**
     * 获取数据状态特性
     */
    getFieldFeature(row){
      //草稿
      if(row.workflowState === '1'){
        //'详情','编辑','删除','提交'
        row.hiddenAttrs =  ['details','edit','delete','submit']
      //已驳回
      }else if(row.workflowState === '2'){
        //'详情','编辑','删除','提交'
        row.hiddenAttrs =  ['details','edit','delete','submit']
      //已提交
      }else if(row.workflowState === '3'){
        //'详情','撤销','催办'
        row.hiddenAttrs =  ['details','undo','rushDo']
      //已通过
      }else if(row.workflowState === '4'){
        //'详情','存档'
        row.hiddenAttrs =  ['details','archive']
      //未通过
      }else if(row.workflowState === '5'){
        //'详情','存档'
        row.hiddenAttrs =  ['details','archive']
      }else{
        row.hiddenAttrs = []
      }

    },
    /**
     * 提交
     */
    handleSubmit(row) {
      this.$common.confirm('是否确认提交')
        .then(()=>{
          this.listLoading = true
          //移除 hiddenAttrs   （不移除临时使用的 hiddenAttrs的话,与后台接收的json对象对应不上喽，导致后台接收参数为null）
          let form = Object.assign({},row)
          this.remoteCallPayload.url = 'http://' + defaultSettings.gateway + '/platofrmTest11/approvalEntity2/updateByWorkflow'
          this.remoteCallPayload.token = 'Bearer ' + getAccessToken()

          form.remoteCallPayload = this.remoteCallPayload
          delete form.hiddenAttrs
          //调用提交接口
          approvalEntity2Api.submit(form).then(res=>{
            //未找到流程实例
            if('000000' === res.code){
                this.doQueryList({ page: 1 });
                this.$message({
                  type: 'success',
                  message: '提交成功！'
                })
            }else if('222222' === res.code){
              this.$message({
                type: 'warn',
                message: '未找到流程实例'
              })
              //结束业务状态
              //this.handEndProcess(form)
              //this.listLoading = false
            }else if('500' === res.code){
              this.$message({
                type: 'error',
                message: '系统异常,联系管理员！'
              })
              this.listLoading = false
            }
          }).catch(()=>{
              this.listLoading = false
          })
        })
    },
    /**
     * 详情
     * @param row
     */
    handleDetails(row) {
      delete row.hiddenAttrs

      const params = {
        'businessKey': '47d77a8e6e39455da7e7de2a1fee2e19' + row.id,
        'variable-name': 'workflowPrefix_form'
      }
      this.$set(this, 'params', params)
      this.$refs['tabs'].showFn(row, this.params)
    },
    /**
     * 撤销
     */
    handleUndo(row) {
      this.$refs.approvalEntity2Undo.handleCreate(this.params.businessKey + row.id)
    },
    /**
     * 结束业务
     *
     * 未找到流程实例，是否结束业务
     * @param row
     */
    handEndProcess(row) {
      this.$common.confirm('未找到流程实例,是否结束业务')
        .then(()=>{
          this.listLoading = true
          approvalEntity2Api.endProcess(row).then(res=>{
            if(res.code === '000000'){
              this.doQueryList({ page: 1 });
              this.$message({
                type: 'success',
                message: '结束成功!'
              })
              this.listLoading = false
            }else{
              this.$message({
                type: 'error',
                message: '结束状态失败!'
              })
              this.listLoading = false
            }
          })
      })
    },
    /**
     * 催办
     * @param row 业务对象
     */
    handleRushDo(row) {
      this.$common.confirm('是否催办')
        .then(()=>{
          this.listLoading = true
          approvalEntity2Api.rushDo(this.params.businessKey + row.id).then(res=>{
            if(res.code === '000000'){
              this.$message({
                type: 'success',
                message: '催办成功!'
              })
              this.listLoading = false
            }else{
              this.$message({
                type: 'error',
                message: '催办失败!'
              })
              this.listLoading = false
            }
          })
        })
    },
    checkboxT(row, index) {
     if (!(row.workflowState === '1')) {
        return 0
      } else {
        return 1
      }
    }
  }
}
</script>
