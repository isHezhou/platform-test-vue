
<template>
  <el-dialog title="新建普通审批菜单"
             v-el-drag-dialog
             :visible.sync="formVisible"
             :close-on-click-modal="false">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px">
      <el-form-item label="内容1" prop="content1">
        <el-input style="width:100%;" v-model="form.content1"/>
      </el-form-item>
      <el-form-item label="编码" prop="csCode">
        <el-input style="width:100%;" v-model="form.csCode"/>
      </el-form-item>
      <el-form-item label="内容2" prop="content2">
        <el-input style="width:100%;" v-model="form.content2"/>
      </el-form-item>
      <el-form-item label="名称" prop="csName">
        <el-input style="width:100%;" v-model="form.csName"/>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
      <el-button type="primary"
                 @click="doCreate()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import approvalEntityApi from '@/api/platofrmTest11/approvalEntity'
import elDragDialog from '@/directive/el-drag-dialog'

function initFormBean() {
  const formBean = {
    id: null,
    tenantId: null,
    groupId: null,
    orgId: null,
    deptId: null,
    workflowState: null,
    content1: null,
    csCode: null,
    content2: null,
    csName: null,
    deleted: null,
    processInstanceId: null,
    createId: null,
    createName: null,
    createTime: null,
    modifyId: null,
    modifyName: null,
    modifyTime: null,
    extension: null
  }
  return formBean
}


export default {
  name: 'ApprovalEntityAdd',
  directives: { elDragDialog },
  data() {
    return {
      form: initFormBean(),
      formVisible: false,
      formRules: {
        content1: [
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        csCode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        content2: [
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        csName: [
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 重置表单
     */
    resetForm() {
      this.form = initFormBean()
    },

    /**
     * 打开新建表单
     */
    handleCreate(treeOptions) {
      this.resetForm()
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 执行新建操作
     */
    doCreate() {

      this.$refs['dataForm'].validate()
        .then(() => approvalEntityApi.insert(this.form))
        .then(res => {
          if (res.code === '000000') {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.$emit('created')
            this.formVisible = false
          }else{
            this.$message({
            type: 'error',
            message: res.message
           })
         }
        })
    },
  }
}
</script>
