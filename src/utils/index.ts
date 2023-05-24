import { Ref } from 'vue';

// 解析日期
export function getBirth(value) {
  if (value == null || value == "") return "";
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "-" + month + "-" + day;
}

export function toRFC3339(date){
  const y = date.getFullYear()
  const m = date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1)
  const d = date.getDate()<10?'0'+date.getDate():date.getDate()
  const hh = date.getHours()<10?'0'+date.getHours():date.getHours();            
  const mm = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
  const ss = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
  let endDate = y +'-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  endDate = endDate.replace(/\s+/g, 'T')+'+08:00'
  return endDate
}

/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == "") return "";
  const date = new Date(cellValue);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

// 解析歌词
export function parseLyric(text) {
  let lines = text.split("\n");
  const pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
  const result = [];

  // 对于歌词格式不对的特殊处理
  if (!/\[.+\]/.test(text)) {
    return [[0, text]];
  }

  while (!pattern.test(lines[0])) {
    lines = lines.slice(1);
  }

  lines[lines.length - 1].length === 0 && lines.pop();
  for (const item of lines) {
    const time = item.match(pattern); // 存前面的时间段
    const value = item.replace(pattern, ""); // 存歌词
    for (const item1 of time) {
      const t = item1.slice(1, -1).split(":");
      if (value !== "") {
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      }
    }
  }
  result.sort((a, b) => a[0] - b[0]);
  return result;
}

// 解析播放时间
export function formatSeconds(value) {
  let theTime = parseInt(value);
  let theTime1 = 0;
  let theTime2 = 0;
  if (theTime > 60) {
    theTime1 = parseInt((theTime / 60).toString()); // 分
    theTime = parseInt((theTime % 60).toString()); // 秒
    // 是否超过一个小时
    if (theTime1 > 60) {
      theTime2 = parseInt((theTime1 / 60).toString()); // 小时
      theTime1 = 60; // 分
    }
  }
  // 多少秒
  let result = "";
  if (parseInt(theTime.toString()) < 10) {
    result = "0:0" + parseInt(theTime.toString());
  } else {
    result = "0:" + parseInt(theTime.toString());
  }
  // 多少分钟时
  if (theTime1 > 0) {
    if (parseInt(theTime.toString()) < 10) {
      result = "0" + parseInt(theTime.toString());
    } else {
      result = parseInt(theTime.toString()).toString();
    }
    result = parseInt(theTime1.toString()) + ":" + result;
  }
  // 多少小时时
  if (theTime2 > 0) {
    if (parseInt(theTime.toString()) < 10) {
      result = "0" + parseInt(theTime.toString());
    } else {
      result = parseInt(theTime.toString()).toString();
    }
    result = parseInt(theTime2.toString()) + ":" + parseInt(theTime1.toString()) + ":" + result;
  }
  return result;
}

// 鼠标移入延时展示内容
export default function tipsUtils(visible: Ref<boolean>) {
  let conSetTimeout: NodeJS.Timer | null = null;
  //鼠标移入
  const vMouseenter = () => {
    conSetTimeout && clearTimeout(conSetTimeout);
    conSetTimeout = setTimeout(function () {
      visible.value = true
      //通过改变 visible 去控制显示或者隐藏
    }, 1500);//通过延时器控制多久后显示
  }
  //鼠标移出
  const vMouseleave = () => {
    conSetTimeout && clearTimeout(conSetTimeout);
    //清除延时器
    clearTimeout(Number(conSetTimeout));
    visible.value = false
  }
  //鼠标点击
  const visibleClick = () => {
    conSetTimeout && clearTimeout(conSetTimeout);
    visible.value = false
  }
  return {
    vMouseenter,
    vMouseleave,
    visibleClick
  }
}
