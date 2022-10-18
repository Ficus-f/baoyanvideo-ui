/**
 * 文件相关模块
 *
 */
import request from '@/utils/request'

// 创建视频
export const getUploadToken = filename => {
  return request({
    method: 'POST',
    url: '/api/v1/upload/token',
    data: {
      filename: filename
    }
  })
}
