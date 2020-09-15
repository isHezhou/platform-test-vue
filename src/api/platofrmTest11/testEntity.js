import request from '@/utils/request'

const testEntityApi = {

  /**
   * 保存【普通菜单】
   */
  insert(testEntity) {
    return request({
      url: '/platofrmTest11/testEntity/insert',
      method: 'post',
      data: testEntity
    })
  },
  /**
   * 保存【普通菜单】
   */
  insertBatch(testEntity) {
    return request({
      url: '/platofrmTest11/testEntity/insertBatch',
      method: 'post',
      data: testEntity
    })
  },

  /**
   * 批量保存或修改
   */
  insertOrUpdateBatch(testEntity) {
    return request({
      url: '/platofrmTest11/testEntity/insertOrUpdateBatch',
      method: 'post',
      data: testEntity
    })
  },
  /**
  * 修改【普通菜单】
  */
  update(testEntity) {
    return request({
      url: '/platofrmTest11/testEntity/update',
      method: 'post',
      data: testEntity
    })
  },
  /**
  * 分页查询
  */
  finds(queryParam) {
    return request({
      url: '/platofrmTest11/testEntity/finds',
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
      url: '/platofrmTest11/testEntity/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【普通菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/testEntity/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【普通菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/testEntity/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【普通菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/testEntity/deleteBatch',
      method: 'post',
      data: ids
    })
  },



  /**
   * 导出excel
   *
   * @param queryParam
   */
  exportExcel(queryParam) {
    return request({
      url: '/platofrmTest11/testEntity/exportExcel',
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
      url: '/platofrmTest11/testEntity/exportExcelAll',
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
      url: '/platofrmTest11/testEntity/importExcel',
      method: 'post',
      data: fileInfo
    })
  }


}

export default testEntityApi
