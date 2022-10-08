/**
 * 用户相关模块
 *
 */
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1/authorizations',
    data
  })
}
