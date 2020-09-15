import request from '@/utils/request'

const approvalEntity2Api = {

  /**
   * 保存【树形审批菜单】
   */
  insert(approvalEntity2) {
    return request({
      url: '/platofrmTest11/approvalEntity2/insert',
      method: 'post',
      data: approvalEntity2
    })
  },
  /**
   * 保存【树形审批菜单】
   */
  insertBatch(approvalEntity2) {
    return request({
      url: '/platofrmTest11/approvalEntity2/insertBatch',
      method: 'post',
      data: approvalEntity2
    })
  },

  /**
  * 修改【树形审批菜单】
  */
  update(approvalEntity2) {
    return request({
      url: '/platofrmTest11/approvalEntity2/update',
      method: 'post',
      data: approvalEntity2
    })
  },
  /**
   * 树结构查询
   * @param queryParam 查询参数
   */
  treeList(queryParam) {
    return request({
      url: '/platofrmTest11/approvalEntity2/treeList',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  findOptions(queryParam) {
    return request({
      url: '/platofrmTest11/approvalEntity2/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【树形审批菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/approvalEntity2/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【树形审批菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/approvalEntity2/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【树形审批菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/approvalEntity2/deleteBatch',
      method: 'post',
      data: ids
    })
  },


   /**
    * 提交工作流
    */
   submit(approvalEntity2) {
     return request({
       url: '/platofrmTest11/approvalEntity2/submit',
       method: 'post',
       data: approvalEntity2
     })
   },

   /**
    * 无流程 修改数据为结束状态
    */
   endProcess(approvalEntity2){
     return request({
       url: '/platofrmTest11/approvalEntity2/endProcess',
       method: 'post',
       data: approvalEntity2
     })
   },

   /**
    * 根据数据任务 渲染详情中表单信息
    *
    * @param approvalEntity2
    * @returns {AxiosPromise}
    */
   getTasksTable(approvalEntity2){
     return request({
       url: '/platofrmTest11/approvalEntity2/getTasksTable',
       method: 'post',
       data: approvalEntity2
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
  }



}

export default approvalEntity2Api
