import request from '@/utils/request'

const treeEntity1Api = {

  /**
   * 保存【树形工作流菜单】
   */
  insert(treeEntity1) {
    return request({
      url: '/platofrmTest11/treeEntity1/insert',
      method: 'post',
      data: treeEntity1
    })
  },
  /**
   * 保存【树形工作流菜单】
   */
  insertBatch(treeEntity1) {
    return request({
      url: '/platofrmTest11/treeEntity1/insertBatch',
      method: 'post',
      data: treeEntity1
    })
  },

  /**
  * 修改【树形工作流菜单】
  */
  update(treeEntity1) {
    return request({
      url: '/platofrmTest11/treeEntity1/update',
      method: 'post',
      data: treeEntity1
    })
  },
  /**
   * 树结构查询
   * @param queryParam 查询参数
   */
  treeList(queryParam) {
    return request({
      url: '/platofrmTest11/treeEntity1/treeList',
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
      url: '/platofrmTest11/treeEntity1/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【树形工作流菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/treeEntity1/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【树形工作流菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/treeEntity1/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【树形工作流菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/treeEntity1/deleteBatch',
      method: 'post',
      data: ids
    })
  },


   /**
    * 提交工作流
    */
   submit(treeEntity1) {
     return request({
       url: '/platofrmTest11/treeEntity1/submit',
       method: 'post',
       data: treeEntity1
     })
   },

   /**
    * 无流程 修改数据为结束状态
    */
   endProcess(treeEntity1){
     return request({
       url: '/platofrmTest11/treeEntity1/endProcess',
       method: 'post',
       data: treeEntity1
     })
   },

   /**
    * 根据数据任务 渲染详情中表单信息
    *
    * @param treeEntity1
    * @returns {AxiosPromise}
    */
   getTasksTable(treeEntity1){
     return request({
       url: '/platofrmTest11/treeEntity1/getTasksTable',
       method: 'post',
       data: treeEntity1
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

export default treeEntity1Api
