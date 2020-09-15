<template>
  <el-dialog :close-on-click-modal="false"
             title="查看订单菜单"
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
      <el-form-item label="订单名称">
        <span class="form-item-show">
          {{ form.theOrderName }}
        </span>
      </el-form-item>
      <el-form-item label="订单编号">
        <span class="form-item-show">
          {{ form.theOrderCode }}
        </span>
      </el-form-item>
      <el-form-item label="起始日期">
        <span class="form-item-show">
          <span>{{ form.startDate | utoDateToBeijing }}</span>
        </span>
      </el-form-item>
      <el-form-item label="结束时间">
        <span class="form-item-show">
          <span>{{ form.endDateTime | utoTimeToBeijing }}</span>
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
import theOrderApi from '@/api/platofrmTest11/theOrder'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'TheOrderShow',
  directives: { elDragDialog },
  data() {
    return {
      form: {
        id: null,
        theOrderName: null,
        theOrderCode: null,
        startDate: null,
        endDateTime: null
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
