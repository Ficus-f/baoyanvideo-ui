import { getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
import { LocationQueryRaw } from "vue-router";
import { RouterName } from "@/enums";
import { HttpManager } from "@/api";

interface routerOptions {
  path?: string;
  query?: LocationQueryRaw;
}

export default function () {
  const { proxy } = getCurrentInstance();

  const store = useStore();
  const token = computed(() => store.getters.token);

  function getUserGender(gender) {
    if (gender === 2) {
      return "女";
    } else if (gender === 1) {
      return "男";
    }
  }

  // 转换课程的状态
  function getCourseStatus(status) {
    if (status === 0) {
      return "连载中";
    } else if (status === 1) {
      return "已完结";
    }
  }

  // 获取图片途径
  function getImageUrl(url) {
    return "https://baoyanvideo.oss-cn-hongkong.aliyuncs.com/" + url
  }

  // 获取歌曲名
  function getSongTitle(str) {
    return str.split("-")[1];
  }

  // 获取歌手名
  function getSingerName(str) {
    return str.split("-")[0];
  }

  // 判断登录状态
  function checkStatus(status?: boolean) {
    if (!token.value) {
      if (status !== false)
        (proxy as any).$message({
          message: "请先登录",
          type: "warning",
        });
      return false;
    }
    return true;
  }

  // 判断简介的内容
  function getIntroduction(content) {
    if (content === "") {
      return "暂无内容"
    } else {
      return content
    }
  }

  // 播放
  function playMusic({ id, url, pic, index, name, lyric, currentSongList }) {
    const songTitle = getSongTitle(name);
    const singerName = getSingerName(name);
    proxy.$store.dispatch("playMusic", {
      id,
      url,
      pic,
      index,
      songTitle,
      singerName,
      lyric,
      currentSongList,
    });
  }

  // 下载
  async function downloadMusic({ songUrl, songName }) {
    if (!songUrl) {
      (proxy as any).$message({
        message: "下载链接为空！",
        type: "error",
      });
      console.error("下载链接为空！");
      return;
    }

    const result = (await HttpManager.downloadMusic(songUrl)) as ResponseBody;
    const eleLink = document.createElement("a");
    eleLink.download = `${songName}.mp3`;
    eleLink.style.display = "none";
    // 字符内容转变成 blob 地址
    const blob = new Blob([result.data]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink); // 触发点击
    eleLink.click();
    document.body.removeChild(eleLink); // 移除
  }

  // 导航索引
  function changeIndex(value) {
    proxy.$store.commit("setActiveNavName", value);
  }
  // 路由管理
  function routerManager(routerName: string | number, options: routerOptions) {
    switch (routerName) {
      case RouterName.Search:
        proxy.$router.push({ path: options.path, query: options.query });
        break;
      case RouterName.Home:
      case RouterName.Video:
      case RouterName.CourseDetail:
      case RouterName.GuruDetail:
      case RouterName.SongSheet:
      case RouterName.SongSheetDetail:
      case RouterName.Singer:
      case RouterName.SingerDetail:
      case RouterName.Personal:
      case RouterName.PersonalData:
      case RouterName.Setting:
      case RouterName.SignIn:
      case RouterName.SignUp:
      case RouterName.SignOut:
      case RouterName.Lyric:
      case RouterName.Error:
      default:
        proxy.$router.push({ path: options.path });
        break;
    }
  }

  function goBack(step = -1) {
    proxy.$router.go(step);
  }

  return {
    getUserGender,
    getCourseStatus,
    getSongTitle,
    getSingerName,
    changeIndex,
    checkStatus,
    playMusic,
    routerManager,
    goBack,
    downloadMusic,
    getImageUrl,
    getIntroduction,
  };
}
