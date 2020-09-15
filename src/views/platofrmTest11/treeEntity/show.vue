<template>
  <el-dialog :close-on-click-modal="false"
             title="查看树形菜单"
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
      <el-form-item label="编码">
        <span class="form-item-show">
          {{ form.taCode }}
        </span>
      </el-form-item>
      <el-form-item label="菜单名称">
        <span class="form-item-show">
          {{ form.taName }}
        </span>
      </el-form-item>
      <el-form-item label="上传图片">
        <span class="form-item-show">
          {{ form.uploadPhoto }}
        </span>
      </el-form-item>
      <el-form-item label="上传文件">
        <span class="form-item-show">
          {{ form.uploadFile }}
        </span>
      </el-form-item>
      <el-form-item label="开始时间">
        <span class="form-item-show">
          <span>{{ form.stratDate | utoDateToBeijing }}</span>
        </span>
      </el-form-item>
      <el-form-item label="结束时间">
        <span class="form-item-show">
          <span>{{ form.endDateTime | utoTimeToBeijing }}</span>
        </span>
      </el-form-item>
      <el-form-item label="爱好">
        <span class="form-item-show">
          <span>{{ form.hobby | findEnumLabel(dictList['hobby']) }}</span>
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
import treeEntityApi from '@/api/platofrmTest11/treeEntity'
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'TreeEntityShow',
  directives: { elDragDialog },
  data() {
    return {
      form: {
        id: null,
        taCode: null,
        taName: null,
        uploadPhoto: null,
        uploadFile: null,
        stratDate: null,
        endDateTime: null,
        hobby: null
      },
      formVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ])
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
