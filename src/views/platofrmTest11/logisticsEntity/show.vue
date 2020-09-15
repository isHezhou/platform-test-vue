<template>
  <el-dialog :close-on-click-modal="false"
             title="查看物流菜单"
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
      <el-form-item label="物流名称">
        <span class="form-item-show">
          {{ form.logName }}
        </span>
      </el-form-item>
      <el-form-item label="物流编号">
        <span class="form-item-show">
          {{ form.logCode }}
        </span>
      </el-form-item>
      <el-form-item label="上传照片">
        <span class="form-item-show">
          {{ form.uploadPhoto }}
        </span>
      </el-form-item>
      <el-form-item label="上传文件">
        <span class="form-item-show">
          {{ form.uploadFile }}
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
import logisticsEntityApi from '@/api/platofrmTest11/logisticsEntity'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'LogisticsEntityShow',
  directives: { elDragDialog },
  data() {
    return {
      form: {
        id: null,
        logName: null,
        logCode: null,
        uploadPhoto: null,
        uploadFile: null
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
