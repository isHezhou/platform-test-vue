
<template>
  <el-dialog title="新建树形菜单"
             v-el-drag-dialog
             :visible.sync="formVisible"
             :close-on-click-modal="false">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px">
      <el-form-item label="编码" prop="taCode">
        <el-input style="width:100%;" v-model="form.taCode"/>
      </el-form-item>
      <el-form-item label="菜单名称" prop="taName">
        <el-input style="width:100%;" v-model="form.taName"/>
      </el-form-item>
      <el-form-item label="上传图片" prop="uploadPhoto">
        <el-upload
          class="upload-demo"
          ref="uploadPhoto"
          action=""
          :on-remove="handleUploadPhotoRemove"
          :on-change="imgUploadPhotoBroadcastChange"
          :file-list="uploadPhotoFileList"
          accept=".jpeg,.gif,.png,.jpg"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传文件" prop="uploadFile">
        <el-upload
          class="upload-demo"
          ref="uploadFile"
          action=""
          :on-remove="handleUploadFileRemove"
          :on-change="imgUploadFileBroadcastChange"
          :file-list="uploadFileFileList"
          accept=".rar,.pdf,.PDF,.zip,.doc,.xls,.xlsx,.jpeg,.gif,.png,.jpg"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="开始时间" prop="stratDate">
        <el-date-picker v-model="form.stratDate" style="width:100%;" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDateTime">
        <el-date-picker v-model="form.endDateTime" style="width:100%;" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
      <el-form-item label="父ID" prop="parentId">
            <tree-select
              v-model="form.parentId"
              :options="treeOptions"
              :searchable="true"
              :default-expand-level="4"
              placeholder="请选择父菜单"/>
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
import treeEntityApi from '@/api/platofrmTest11/treeEntity'
import TreeSelect from '@riophae/vue-treeselect'
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'

function initFormBean() {
  const formBean = {
    id: null,
    tenantId: null,
    groupId: null,
    orgId: null,
    deptId: null,
    taCode: null,
    taName: null,
    uploadPhoto: null,
    uploadFile: null,
    stratDate: null,
    endDateTime: null,
    hobby: null,
    deleted: null,
    parentId: null,
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
  name: 'TreeEntityAdd',
  directives: { elDragDialog },
  components: {
      TreeSelect
    },
  props: {
    treeList: {}
  },
  watch: {
    treeList: {
      handler(treeList) {
        this.treeOptions = treeList
      }
    },
  },
  data() {
    return {
      uploadPhotoFileList: [],
      uploadFileFileList: [],
      treeOptions: undefined,
      form: initFormBean(),
      formVisible: false,
      formRules: {
        taCode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        taName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        uploadPhoto: [
        ],
        uploadFile: [
        ],
        stratDate: [
            { required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endDateTime: [
            { required: true, message: '请输入结束时间', trigger: 'change' }
        ],
        hobby: [
            { required: true, message: '请输入爱好', trigger: 'change' }
        ],
        parentId: [
            { required: true, message: '请输入父ID', trigger: 'blur' }
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
      this.form = initFormBean()
    },

    /**
     * 打开新建表单
     */
    handleCreate(treeOptions) {
      this.uploadPhotoFileList= [],
      this.uploadFileFileList= [],
      this.resetForm()
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 打开新建子菜单表单
     */
    handleCreateChild(id) {
      this.uploadPhotoFileList= [],
      this.uploadFileFileList= [],
      this.resetForm()
      this.formVisible = true
      //赋值父id
      this.form.parentId = id
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 执行新建操作
     */
    doCreate() {
      //赋值上传文件集合
      this.form.uploadPhotoFileList = this.uploadPhotoFileList
      //赋值上传文件集合
      this.form.uploadFileFileList = this.uploadFileFileList

      this.$refs['dataForm'].validate()
        .then(() => treeEntityApi.insert(this.form))
        .then(res => {
          if (res.code === '000000') {
            //清空uploadPhoto 上传文件列表
            this.$refs.uploadPhoto.clearFiles()
            //清空uploadFile 上传文件列表
            this.$refs.uploadFile.clearFiles()
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
    //删除图片时
    handleUploadPhotoRemove(file, fileList) {
      //更新fileList
      this.uploadPhotoFileList = fileList
    },
    /**
     * 上传图片
     * @param file
     */
    imgUploadPhotoBroadcastChange(file, fileList) {
      const isLtM = file.size / 1024 / 1024 < 10
      if (!isLtM) {
        this.uploadPhotoFileList = Object.assign([],fileList)
        this.uploadPhotoFileList.splice(this.uploadPhotoFileList.length-1,1)
        this.$message.error('文件大小不能超过 10M!')
        return false
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = (e) => {
          file.base64Str = e.target.result
          this.uploadPhotoFileList.push(file)
        }
      }
    },
    //删除文件时
    handleUploadFileRemove(file, fileList) {
      //更新fileList
      this.uploadFileFileList = fileList
    },
    /**
     * 上传文件
     * @param file
     */
    imgUploadFileBroadcastChange(file, fileList) {
      const isLtM = file.size / 1024 / 1024 < 10
      if (!isLtM) {
        this.uploadFileFileList = Object.assign([],fileList)
        this.uploadFileFileList.splice(this.uploadFileFileList.length-1,1)
        this.$message.error('文件大小不能超过 10M!')
        return false
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = (e) => {
          file.base64Str = e.target.result
          this.uploadFileFileList.push(file)
        }
      }
    },
  }
}
</script>
