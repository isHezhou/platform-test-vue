import request from '@/utils/request'

const workflowEntity1Api = {

  /**
   * 保存【普通工作流菜单】
   */
  insert(workflowEntity1) {
    return request({
      url: '/platofrmTest11/workflowEntity1/insert',
      method: 'post',
      data: workflowEntity1
    })
  },
  /**
   * 保存【普通工作流菜单】
   */
  insertBatch(workflowEntity1) {
    return request({
      url: '/platofrmTest11/workflowEntity1/insertBatch',
      method: 'post',
      data: workflowEntity1
    })
  },

  /**
  * 修改【普通工作流菜单】
  */
  update(workflowEntity1) {
    return request({
      url: '/platofrmTest11/workflowEntity1/update',
      method: 'post',
      data: workflowEntity1
    })
  },
  /**
  * 分页查询
  */
  finds(queryParam) {
    return request({
      url: '/platofrmTest11/workflowEntity1/finds',
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
      url: '/platofrmTest11/workflowEntity1/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【普通工作流菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/workflowEntity1/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【普通工作流菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/workflowEntity1/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【普通工作流菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/workflowEntity1/deleteBatch',
      method: 'post',
      data: ids
    })
  },


   /**
    * 提交工作流
    */
   submit(workflowEntity1) {
     return request({
       url: '/platofrmTest11/workflowEntity1/submit',
       method: 'post',
       data: workflowEntity1
     })
   },

   /**
    * 无流程 修改数据为结束状态
    */
   endProcess(workflowEntity1){
     return request({
       url: '/platofrmTest11/workflowEntity1/endProcess',
       method: 'post',
       data: workflowEntity1
     })
   },

   /**
    * 根据数据任务 渲染详情中表单信息
    *
    * @param workflowEntity1
    * @returns {AxiosPromise}
    */
   getTasksTable(workflowEntity1){
     return request({
       url: '/platofrmTest11/workflowEntity1/getTasksTable',
       method: 'post',
       data: workflowEntity1
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
      url: '/platofrmTest11/workflowEntity1/exportExcel',
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
      url: '/platofrmTest11/workflowEntity1/exportExcelAll',
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
      url: '/platofrmTest11/workflowEntity1/importExcel',
      method: 'post',
      data: fileInfo
    })
  }


}

export default workflowEntity1Api
