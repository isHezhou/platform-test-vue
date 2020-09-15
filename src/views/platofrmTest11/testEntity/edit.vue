<template>
  <el-dialog :close-on-click-modal="false"
             title="编辑普通菜单"
             v-el-drag-dialog
             :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px">
      <el-form-item label="名称" prop="testName">
        <el-input style="width:100%;" v-model="form.testName"/>
      </el-form-item>
      <el-form-item label="所属订单" prop="theOrderId">
        <el-select v-model="form.theOrderId"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in options.theOrder"
                     :key="item.id"
                     :label="item.theOrderName"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-select v-model="form.hobby"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in dictList['hobby']"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属物流" prop="logId">
        <el-select v-model="form.logId"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in options.logisticsEntity"
                     :key="item.id"
                     :label="item.logName"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开关" prop="isOpen">
            <el-switch v-model="form.isOpen"></el-switch>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio v-for="item in dictList['Sex']"
                    :key="item.value"
                    :label="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
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
import testEntityApi from '@/api/platofrmTest11/testEntity'
import theOrderApi from '@/api/platofrmTest11/theOrder'
import logisticsEntityApi from '@/api/platofrmTest11/logisticsEntity'
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'

function initFormBean() {
  const formBean = {
    id: null,
    tenantId: null,
    groupId: null,
    orgId: null,
    deptId: null,
    testName: null,
    theOrderId: null,
    hobby: null,
    logId: null,
    isOpen: null,
    sex: null,
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
  name: 'TestEntityEdit',
  directives: { elDragDialog },
  data() {
    return {
      options: {
        theOrder: [],
        logisticsEntity: []
      },
      old: initFormBean(),
      form: initFormBean(),
      formVisible: false,
      formRules: {
        testName: [
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        theOrderId: [
        ],
        hobby: [
        ],
        logId: [
            { required: true, message: '请输入所属物流', trigger: 'change' }
        ],
        isOpen: [
        ],
        sex: [
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ])
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
      let query = {sortBy: 'id',sortOrder: 'desc',q: ''}
      theOrderApi.findOptions(query).then(res => { this.options.theOrder = res.data })
      logisticsEntityApi.findOptions(query).then(res => { this.options.logisticsEntity = res.data })
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
        .then(() => testEntityApi.update(this.form))
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
