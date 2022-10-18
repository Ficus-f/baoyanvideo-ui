/**
 * 用户相关模块
 *
 */
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/api/v1/user/login',
    data
  })
}

export const checkMe = () => {
  return request({
    method: 'GET',
    url: '/api/v1/user/me'
  })
}
