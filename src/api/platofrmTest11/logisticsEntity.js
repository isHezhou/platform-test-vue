import request from '@/utils/request'

const logisticsEntityApi = {

  /**
   * 保存【物流菜单】
   */
  insert(logisticsEntity) {
    return request({
      url: '/platofrmTest11/logisticsEntity/insert',
      method: 'post',
      data: logisticsEntity
    })
  },
  /**
   * 保存【物流菜单】
   */
  insertBatch(logisticsEntity) {
    return request({
      url: '/platofrmTest11/logisticsEntity/insertBatch',
      method: 'post',
      data: logisticsEntity
    })
  },

  /**
  * 修改【物流菜单】
  */
  update(logisticsEntity) {
    return request({
      url: '/platofrmTest11/logisticsEntity/update',
      method: 'post',
      data: logisticsEntity
    })
  },
  /**
  * 分页查询
  */
  finds(queryParam) {
    return request({
      url: '/platofrmTest11/logisticsEntity/finds',
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
      url: '/platofrmTest11/logisticsEntity/find',
      method: 'get',
      params: {
        'sortBy': queryParam.sortBy,
        'sortOrder': queryParam.sortOrder,
        'q': queryParam.q
      }
    })
  },
  /**
  * 查看【物流菜单】详情
  */
  get(id) {
    return request({
      url: '/platofrmTest11/logisticsEntity/get',
      method: 'get',
      params: {
        'id': id
      }
    })
  },

  /**
  * 删除单个【物流菜单】
  */
  del(id) {
    return request({
      url: '/platofrmTest11/logisticsEntity/delete',
      method: 'post',
      params: {
        'id': id
      }
    })
  },

  /**
  * 批量删除【物流菜单】
  */
  deleteBatch(ids) {
    return request({
      url: '/platofrmTest11/logisticsEntity/deleteBatch',
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
      url: '/platofrmTest11/logisticsEntity/download',
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
      url: '/platofrmTest11/logisticsEntity/findAllByBusinessCode',
      method: 'get',
      params: {
        'businessCode': businessCode
      }
    })
  },
  /**
   * 导出excel
   *
   * @param queryParam
   */
  exportExcel(queryParam) {
    return request({
      url: '/platofrmTest11/logisticsEntity/exportExcel',
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
      url: '/platofrmTest11/logisticsEntity/exportExcelAll',
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
      url: '/platofrmTest11/logisticsEntity/importExcel',
      method: 'post',
      data: fileInfo
    })
  }


}

export default logisticsEntityApi
