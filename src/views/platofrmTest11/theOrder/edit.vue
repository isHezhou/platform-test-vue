<template>
  <el-dialog :close-on-click-modal="false"
             title="编辑订单菜单"
             v-el-drag-dialog
             :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px">
      <el-form-item label="订单名称" prop="theOrderName">
        <el-input style="width:100%;" v-model="form.theOrderName"/>
      </el-form-item>
      <el-form-item label="订单编号" prop="theOrderCode">
        <el-input style="width:100%;" v-model="form.theOrderCode"/>
      </el-form-item>
      <el-form-item label="起始日期" prop="startDate">
        <el-date-picker v-model="form.startDate" style="width:100%;" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDateTime">
        <el-date-picker v-model="form.endDateTime" style="width:100%;" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
import theOrderApi from '@/api/platofrmTest11/theOrder'
import elDragDialog from '@/directive/el-drag-dialog'

function initFormBean() {
  const formBean = {
    id: null,
    tenantId: null,
    groupId: null,
    orgId: null,
    deptId: null,
    theOrderName: null,
    theOrderCode: null,
    startDate: null,
    endDateTime: null,
    deleted: null,
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
  name: 'TheOrderEdit',
  directives: { elDragDialog },
  data() {
    return {
      old: initFormBean(),
      form: initFormBean(),
      formVisible: false,
      formRules: {
        theOrderName: [
            { required: true, message: '请输入订单名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        theOrderCode: [
            { required: true, message: '请输入订单编号', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        startDate: [
            { required: true, message: '请输入起始日期', trigger: 'change' }
        ],
        endDateTime: [
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
        .then(() => theOrderApi.update(this.form))
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
