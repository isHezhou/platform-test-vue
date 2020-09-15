import request from '@/utils/request'

const theOrderApi = {

  /**
   * 保存【订单菜单】
   */
  insert(theOrder) {
    return request({
      url: '/platofrmTest11/theOrder/insert',
      method: 'post',
      data: theOrder
    })
  },
  /**
   * 保存【订单菜单】
   */
  insertBatch(theOrder) {
    return request({
      url: '/platofrmTest11/theOrder/insertBatch',
      method: 'post',
      data: theOrder
    })
  },

  /**
  * 修改【订单菜单】
  */
  update(theOrder) {
    return request({
      url: '/platofrmTest11/theOrder/update',
      method: 'post',
      data: theOrder
    })
  },
  /**
  * 分页查询
  */
  finds(queryParam) {
    return request({
      url: '/platofrmTest11/theOrder/finds',
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
      url: '/platofrmTest11/theOrder/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【订单菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/theOrder/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【订单菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/theOrder/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【订单菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/theOrder/deleteBatch',
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
      url: '/platofrmTest11/theOrder/exportExcel',
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
      url: '/platofrmTest11/theOrder/exportExcelAll',
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
      url: '/platofrmTest11/theOrder/importExcel',
      method: 'post',
      data: fileInfo
    })
  }


}

export default theOrderApi
