<template>
  <el-dialog :close-on-click-modal="false"
             title="编辑物流菜单"
             v-el-drag-dialog
             :visible.sync="formVisible">
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
          :file-list="uploadPhotoFileList"
          :on-remove="handleUploadPhotoRemove"
          :on-change="imgUploadPhotoBroadcastChange"
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
          :file-list="uploadFileFileList"
          :on-remove="handleUploadFileRemove"
          :on-change="imgUploadFileBroadcastChange"
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
                 @click="doUpdate()">
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
  name: 'LogisticsEntityEdit',
  directives: { elDragDialog },
  data() {
    return {
      //需删除成功上传后的文件集合
      delFileList: [],
      uploadPhotoFileList: [],
      uploadFileFileList: [],
      old: initFormBean(),
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
      for (const key in initFormBean()) {
        this.form[key] = this.old[key]
      }
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.old = Object.assign({},row)
      // 清空删除文件集合
      this.delFileList = []

      // 清空文件集合
      this.uploadPhotoFileList = []
      // 清空文件集合
      this.uploadFileFileList = []

      logisticsEntityApi.get(row.id).then(res=>{
      // 根据后台的文件集合,给前台文件赋值
        this.uploadPhotoFileList = res.data.uploadPhotoFileList
      // 根据后台的文件集合,给前台文件赋值
        this.uploadFileFileList = res.data.uploadFileFileList
      })
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
      //删除的文件集合
      this.form.delFileList = this.delFileList
      //赋值上传文件集合
      this.form.uploadPhotoFileList = this.uploadPhotoFileList
      //赋值上传文件集合
      this.form.uploadFileFileList = this.uploadFileFileList
      this.$refs['dataForm'].validate()
        .then(() => logisticsEntityApi.update(this.form))
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
    //删除图片时
    handleUploadPhotoRemove(file, fileList) {
      //更新fileList
      this.uploadPhotoFileList = fileList
      if(file.status === "success"){
        this.delFileList.push(file)
      }
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
      if(file.status === "success"){
        this.delFileList.push(file)
      }
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
