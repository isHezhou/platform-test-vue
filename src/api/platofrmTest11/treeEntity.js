import request from '@/utils/request'

const treeEntityApi = {

  /**
   * 保存【树形菜单】
   */
  insert(treeEntity) {
    return request({
      url: '/platofrmTest11/treeEntity/insert',
      method: 'post',
      data: treeEntity
    })
  },
  /**
   * 保存【树形菜单】
   */
  insertBatch(treeEntity) {
    return request({
      url: '/platofrmTest11/treeEntity/insertBatch',
      method: 'post',
      data: treeEntity
    })
  },

  /**
  * 修改【树形菜单】
  */
  update(treeEntity) {
    return request({
      url: '/platofrmTest11/treeEntity/update',
      method: 'post',
      data: treeEntity
    })
  },
  /**
   * 树结构查询
   * @param queryParam 查询参数
   */
  treeList(queryParam) {
    return request({
      url: '/platofrmTest11/treeEntity/treeList',
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
      url: '/platofrmTest11/treeEntity/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【树形菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/treeEntity/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【树形菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/treeEntity/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【树形菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/treeEntity/deleteBatch',
      method: 'post',
      data: ids
    })
  },



  /**
   * 下载
   *
   * @param id
   * @returns {AxiosPromise}
   */
  download(id) {
    return request({
      url: '/platofrmTest11/treeEntity/download',
      method: 'get',
      responseType: 'blob',
      params: {
        'id': id
      }
    })
  },

  /**
   * 根据code 查询文件集合
   * @param businessCode
   * @returns {AxiosPromise}
   */
  findAllByBusinessCode(businessCode){
    return request({
      url: '/platofrmTest11/treeEntity/findAllByBusinessCode',
      method: 'get',
      params: {
        'businessCode': businessCode
      }
    })
  }


}

export default treeEntityApi
