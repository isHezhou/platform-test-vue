
<template>
  <el-dialog title="新建物流菜单"
             v-el-drag-dialog
             :visible.sync="formVisible"
             :close-on-click-modal="false">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px">
      <el-form-item label="物流名称" prop="logName">
        <el-input style="width:100%;" v-model="form.logName"/>
      </el-form-item>
      <el-form-item label="物流编号" prop="logCode">
        <el-input style="width:100%;" v-model="form.logCode"/>
      </el-form-item>
      <el-form-item label="上传照片" prop="uploadPhoto">
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
import logisticsEntityApi from '@/api/platofrmTest11/logisticsEntity'
import elDragDialog from '@/directive/el-drag-dialog'

function initFormBean() {
  const formBean = {
    id: null,
    tenantId: null,
    groupId: null,
    orgId: null,
    deptId: null,
    logName: null,
    logCode: null,
    uploadPhoto: null,
    uploadFile: null,
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
  name: 'LogisticsEntityAdd',
  directives: { elDragDialog },
  data() {
    return {
      uploadPhotoFileList: [],
      uploadFileFileList: [],
      form: initFormBean(),
      formVisible: false,
      formRules: {
        logName: [
            { required: true, message: '请输入物流名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        logCode: [
            { required: true, message: '请输入物流编号', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        uploadPhoto: [
        ],
        uploadFile: [
        ]
      }
    }
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
     * 执行新建操作
     */
    doCreate() {
      //赋值上传文件集合
      this.form.uploadPhotoFileList = this.uploadPhotoFileList
      //赋值上传文件集合
      this.form.uploadFileFileList = this.uploadFileFileList

      this.$refs['dataForm'].validate()
        .then(() => logisticsEntityApi.insert(this.form))
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
