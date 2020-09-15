<template>
  <el-dialog :close-on-click-modal="false"
             title="查看普通工作流菜单"
             v-el-drag-dialog
             :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="编号">
        <span class="form-item-show">
          {{ form.workCode }}
        </span>
      </el-form-item>
      <el-form-item label="内容1">
        <span class="form-item-show">
          {{ form.content1 }}
        </span>
      </el-form-item>
      <el-form-item label="内容2">
        <span class="form-item-show">
          {{ form.content2 }}
        </span>
      </el-form-item>
      <el-form-item label="内容3">
        <span class="form-item-show">
          {{ form.content3 }}
        </span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import workflowEntity1Api from '@/api/platofrmTest11/workflowEntity1'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'WorkflowEntity1Show',
  directives: { elDragDialog },
  data() {
    return {
      form: {
        id: null,
        workCode: null,
        content1: null,
        content2: null,
        content3: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.form = Object.assign({}, row)
      this.formVisible = true
    },
  }
}
</script>
