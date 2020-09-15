import request from '@/utils/request'

const approvalEntityApi = {

  /**
   * 保存【普通审批菜单】
   */
  insert(approvalEntity) {
    return request({
      url: '/platofrmTest11/approvalEntity/insert',
      method: 'post',
      data: approvalEntity
    })
  },
  /**
   * 保存【普通审批菜单】
   */
  insertBatch(approvalEntity) {
    return request({
      url: '/platofrmTest11/approvalEntity/insertBatch',
      method: 'post',
      data: approvalEntity
    })
  },

  /**
  * 修改【普通审批菜单】
  */
  update(approvalEntity) {
    return request({
      url: '/platofrmTest11/approvalEntity/update',
      method: 'post',
      data: approvalEntity
    })
  },
  /**
  * 分页查询
  */
  finds(queryParam) {
    return request({
      url: '/platofrmTest11/approvalEntity/finds',
      method: 'get',
      params: {
        'pageNum': queryParam.pageNum,
        'pageSize': queryParam.pageSize,
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  findOptions(queryParam) {
    return request({
      url: '/platofrmTest11/approvalEntity/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【普通审批菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/approvalEntity/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【普通审批菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/approvalEntity/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【普通审批菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/approvalEntity/deleteBatch',
      method: 'post',
      data: ids
    })
  },


   /**
    * 提交工作流
    */
   submit(approvalEntity) {
     return request({
       url: '/platofrmTest11/approvalEntity/submit',
       method: 'post',
       data: approvalEntity
     })
   },

   /**
    * 无流程 修改数据为结束状态
    */
   endProcess(approvalEntity){
     return request({
       url: '/platofrmTest11/approvalEntity/endProcess',
       method: 'post',
       data: approvalEntity
     })
   },

   /**
    * 根据数据任务 渲染详情中表单信息
    *
    * @param approvalEntity
    * @returns {AxiosPromise}
    */
   getTasksTable(approvalEntity){
     return request({
       url: '/platofrmTest11/approvalEntity/getTasksTable',
       method: 'post',
       data: approvalEntity
     })
   },

  /**
   * 催办
   */
  rushDo(businessKey){
    return request({
      url: `/activiti/process/instance/${businessKey}/reminder`,
      method: 'post'
    })
  },

  /**
   * 撤销
   */
  undo(undoForm){
    console.log(undoForm)
    return request({
      url: `/activiti/process/instance/${undoForm.businessKey}/delete`,
      method: 'post',
      data: undoForm
    })
  },

  /**
   * 导出excel
   *
   * @param queryParam
   */
  exportExcel(queryParam) {
    return request({
      url: '/platofrmTest11/approvalEntity/exportExcel',
      method: 'get',
      responseType: 'blob',
      params: {
        'pageNum': queryParam.pageNum,
        'pageSize': queryParam.pageSize,
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
   * 导出excel
   *
   * @param queryParam
   */
  exportExcelAll(queryParam) {
    return request({
      url: '/platofrmTest11/approvalEntity/exportExcelAll',
      method: 'get',
      responseType: 'blob',
      params: {
        'pageNum': queryParam.pageNum,
        'pageSize': queryParam.pageSize,
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'total': queryParam.total,
        'q': queryParam.q
      }
    })
  },
  importExcel(fileInfo){
    return request({
      url: '/platofrmTest11/approvalEntity/importExcel',
      method: 'post',
      data: fileInfo
    })
  }


}

export default approvalEntityApi
