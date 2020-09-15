<template>
  <el-dialog :close-on-click-modal="false"
             title="查看普通审批菜单"
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
      <el-form-item label="内容1">
        <span class="form-item-show">
          {{ form.content1 }}
        </span>
      </el-form-item>
      <el-form-item label="编码">
        <span class="form-item-show">
          {{ form.csCode }}
        </span>
      </el-form-item>
      <el-form-item label="内容2">
        <span class="form-item-show">
          {{ form.content2 }}
        </span>
      </el-form-item>
      <el-form-item label="名称">
        <span class="form-item-show">
          {{ form.csName }}
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
import approvalEntityApi from '@/api/platofrmTest11/approvalEntity'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'ApprovalEntityShow',
  directives: { elDragDialog },
  data() {
    return {
      form: {
        id: null,
        content1: null,
        csCode: null,
        content2: null,
        csName: null
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
