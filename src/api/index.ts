import { getBaseURL, get, post, deletes, put } from "./request";

const HttpManager = {
  // 获取图片信息
  attachImageUrl: (url) => get(`/api/v2/image/${url}`),
  // 首页轮播图
  getCarouselList: () => get(`/api/v2/carousel`),
  
  // =======================> 用户 API
  // 登录
  signIn: (params) => post(`/api/v2/user/login`, params),
  // 注册
  SignUp: (params) => post(`/api/v2/user/register`, params),
  // 返回指定ID的用户
  getUserOfId: (id) => get(`/api/v2/user/detail?id=${id}`),
  // 删除用户
  deleteUser: (id) => deletes(`/api/v2/user/delete?id=${id}`),
  // 更新用户信息
  updateUserDetail: (params) => put(`/api/v2/user/update`, params),
  // 更新用户密码
  updateUserPassword: (params) => put(`/api/v2/user/password`, params),
  // 更新用户头像
  uploadAvatarURL: (params) => post(`/api/v2/user/avatar`, params),
  // 用户退出
  logoutUser: (id) => deletes(`/api/v2/user/logout?id=${id}`),

  // =======================> 课程 /  最新课程 API
  // 获取全部课程
  getCourseList: (start, limit) => get(`/api/v2/courseList?start=${start}&limit=${limit}`),
  // 依据选项筛选课程
  getCourseListOfStyle: (start, limit, style) => get(`/api/v2/courseList/style?start=${start}&limit=${limit}&style=${style}`),
  // 根据法师ID 获取课程列表
  getCourseOfGuruId: (guruId) => get(`/api/v2/courseList/guru?guruId=${guruId}`),
  // 根据视频ID 获取对应的是课程详情和其视频列表
  getCourseAndVideosOfVideoId: (videoId) => get(`/api/v2/courseVideoList?videoId=${videoId}`),
  // 根据关键词搜索课程
  getCourseOfSearchWord: (keywords) => get(`/api/v2/course/search?keyword=${keywords}`),


  // =======================> 法师 API
  // 获取全部法师
  getGuruList: (start, limit) => get(`/api/v2/guruList?start=${start}&limit=${limit}`),
  // 依据选项筛选法师
  getGuruListOfStyle: (start, limit, style) => get(`/api/v2/guruList/style?start=${start}&limit=${limit}&style=${style}`),
  // 根据法师ID 获取法师详情
  getGuruOfId: (guruId) => get(`/api/v2/guru/detail?guruId=${guruId}`),
  // 根据关键词搜索法师
  getGuruOfSearchWord: (keywords) => get(`/api/v2/guru/search?keyword=${keywords}`),


  // =======================> 视频 API
  // 获取最新视频
  getNewVideoList: () => get("/api/v2/newVideoList"),
  // 根据视频ID，获取视频信息
  getVideoOfId: (id) => get(`/api/v2/video/detail?id=${id}`),
  // showVideo 获取视频的url
  getVideoURLOfId: (id) => get(`/api/v2/video/${id}`),
  // 根据课程 ID 获取对应的视频ID列表
  getVideoIDListOfCourseId: (courseId) => get(`/api/v2/courseVideoList/detail?courseId=${courseId}`),
  // 根据课程 ID 获取对应的视频详情列表
  getVideoListOfCourseId: (courseId, start, limit) => get(`/api/v2/video/course?courseId=${courseId}&start=${start}&limit=${limit}`),


  // =======================> 评论 API
  // 添加评论
  setComment: (params) => post(`/api/v2/comment`, params),
  // 删除评论
  deleteComment: (id) => get(`comment/delete?id=${id}`),
  // 点赞
  setSupport: (params) => post(`comment/like`, params),
  // 返回所有评论
  getAllComment: (type, id) => {
    let url = "";
    if (type === 1) {
      url = `/api/v2/comment/course/detail?courseId=${id}`;
    } else if (type === 0) {
      url = `/api/v2/comment/video/detail?videoId=${id}`;
    }
    return get(url);
  },


  // 获取指定课程的评分
  getRankOfCourseId: (courseId) => get(`rankList?courseId=${courseId}`),

  // =======================> 歌单 API
  // 获取全部歌单
  getSongList: () => get("songList"),
  // 获取歌单类型
  getSongListOfStyle: (style) => get(`songList/style/detail?style=${style}`),
  // 返回标题包含文字的歌单
  getSongListOfLikeTitle: (keywords) => get(`songList/likeTitle/detail?title=${keywords}`),
  // 返回歌单里指定歌单ID的歌曲
  getListSongOfSongId: (songListId) => get(`listSong/detail?songListId=${songListId}`),

  // =======================> 歌手 API
  // 返回所有歌手
  getAllSinger: () => get("singer"),
  // 通过性别对歌手分类
  getSingerOfSex: (sex) => get(`singer/sex/detail?sex=${sex}`),

  // =======================> 收藏 API
  // 返回的指定用户ID的收藏列表
  getCollectionOfUser: (userId) => get(`collection/detail?userId=${userId}`),
  // 添加收藏的歌曲 type: 0 代表歌曲， 1 代表歌单
  setCollection: (params) => post(`collection/add`, params),

  deleteCollection: (userId, songId) => deletes(`collection/delete?userId=${userId}&&songId=${songId}`),

  isCollection: (params) => post(`collection/status`, params),

  // =======================> 评分 API
  // 提交评分
  setRank: (params) => post(`rankList/add`, params),
  // 获取指定歌单的评分
  getRankOfSongListId: (songListId) => get(`rankList?songListId=${songListId}`),
  // 获取指定用户的歌单评分
  getUserRank: (consumerId, songListId) => get(`/rankList/user?consumerId=${consumerId}&songListId=${songListId}`),


  // =======================> 歌曲 API
  // 返回指定歌曲ID的歌曲
  getSongOfId: (id) => get(`song/detail?id=${id}`),
  // 返回指定歌手ID的歌曲
  getSongOfSingerId: (id) => get(`song/singer/detail?singerId=${id}`),
  // 返回指定歌手名的歌曲
  getSongOfSingerName: (keywords) => get(`song/singerName/detail?name=${keywords}`),
  // 下载音乐
  downloadMusic: (url) => get(url, { responseType: "blob" }),
};

export { HttpManager };
