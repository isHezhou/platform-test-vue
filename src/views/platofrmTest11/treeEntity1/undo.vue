<template>
  <el-dialog title="撤销表单"
             :close-on-click-modal="false"
             v-el-drag-dialog
             :visible.sync="formVisible"
             :append-to-body="true">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="'撤销原因:'">
        <el-input type="textarea" :rows="4" v-model="form.reason" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
      <el-button type="primary"
                 @click="handleUndo()">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
import treeEntity1Api from '@/api/platofrmTest11/treeEntity1'

function initUndoFormBean(businessKey) {
  const formBean = {
    businessKey: businessKey,
    reason: null
  }
  return formBean
}

  //撤销
  export default {
    name: "TreeEntity1Undo",
    directives: { elDragDialog },
    data() {
      return {
        form: initUndoFormBean(null),
        formVisible: false,
        loading:false
      }
    },
    methods: {
      /**
       * 打开撤销表单
       */
      handleCreate(businessKey) {
        this.form = initUndoFormBean(businessKey)
        this.formVisible = true
      },
      /**
       * 执行撤销
       */
      handleUndo(){
        this.$common.confirm('是否撤销')
          .then(()=>{
            this.loading = true
            let form = Object.assign({},this.form)
            treeEntity1Api.undo(form).then(res=>{
              if(res.code === '000000'){
                this.$message({
                  type: 'success',
                  message: '撤销成功!'
                })
                this.loading = false
                this.formVisible = false
                this.$emit('undo', res.data)
              }else{
                this.$message({
                  type: 'error',
                  message: '撤销失败!'
                })
                this.loading = false
              }
            }).catch(() =>{
                this.loading = false
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
