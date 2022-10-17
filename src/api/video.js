/**
 * 视频相关模块
 *
 */
import request from '@/utils/request'

// 创建视频
export const postVideo = data => {
  return request({
    method: 'POST',
    url: '/api/v1/video',
    data
  })
}

// 获取视频详情
export const getVideo = id => {
  return request({
    method: 'GET',
    url: `/api/v1/video/${id}`
  })
}

// 获取视频列表
export const getVideos = () => {
  return request({
    method: 'GET',
    url: '/api/v1/videos'
  })
}
