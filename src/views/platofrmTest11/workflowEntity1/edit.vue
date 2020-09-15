<template>
  <el-dialog :close-on-click-modal="false"
             title="编辑普通工作流菜单"
             v-el-drag-dialog
             :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px">
      <el-form-item label="编号" prop="workCode">
        <el-input style="width:100%;" type="number" v-model="form.workCode"/>
      </el-form-item>
      <el-form-item label="内容1" prop="content1">
        <el-input style="width:100%;" v-model="form.content1"/>
      </el-form-item>
      <el-form-item label="内容2" prop="content2">
        <el-input style="width:100%;" v-model="form.content2"/>
      </el-form-item>
      <el-form-item label="内容3" prop="content3">
        <el-input style="width:100%;" v-model="form.content3"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
      <el-button type="primary"
                 @click="doUpdate()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import workflowEntity1Api from '@/api/platofrmTest11/workflowEntity1'
import elDragDialog from '@/directive/el-drag-dialog'

function initFormBean() {
  const formBean = {
    id: null,
    tenantId: null,
    groupId: null,
    orgId: null,
    deptId: null,
    workflowState: null,
    workCode: null,
    content1: null,
    content2: null,
    content3: null,
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
  name: 'WorkflowEntity1Edit',
  directives: { elDragDialog },
  data() {
    return {
      old: initFormBean(),
      form: initFormBean(),
      formVisible: false,
      formRules: {
        workCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        content1: [
            { required: true, message: '请输入内容1', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        content2: [
            { required: true, message: '请输入内容2', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        content3: [
            { required: true, message: '请输入内容3', trigger: 'blur' },
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
      for (const key in initFormBean()) {
        this.form[key] = this.old[key]
      }
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.old = Object.assign({},row)
        this.resetForm()
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
    },
    /**
     * 执行修改操作
     */
    doUpdate() {
      this.$refs['dataForm'].validate()
        .then(() => workflowEntity1Api.update(this.form))
        .then(res => {
          if (res.code === '000000') {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.formVisible = false
            this.$emit('updated', res.data)
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
