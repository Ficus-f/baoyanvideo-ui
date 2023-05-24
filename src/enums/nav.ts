import { RouterName } from "./router-name";

export const enum NavName {
  Home = "首页",
  Kid = "百萬童童",
  Course = "课程",
  Guru = "法师",
  // Mantra = "唱诵",
  // Resource = "资料",
  SongSheet = "歌单",
  Singer = "歌手",
  Personal = "个人主页",
  Setting = "设置",
  SignIn = "登录",
  SignUp = "注册",
  SignOut = "退出",
}

// 左侧导航栏
export const HEADERNAVLIST = [
  {
    name: NavName.Home,
    path: RouterName.Home,
  },
  {
    name: NavName.Kid,
    path: RouterName.Kid,
  },
  {
    name: NavName.Course,
    path: RouterName.Course,
  },
  {
    name: NavName.Guru,
    path: RouterName.Guru,
  },
  // {
  //   name: NavName.Resource,
  //   path: RouterName.Singer,
  // },
];

// 右侧导航栏
export const SIGNLIST = [
  {
    name: NavName.SignIn,
    path: RouterName.SignIn,
  },
  {
    name: NavName.SignUp,
    path: RouterName.SignUp,
  },
];

// 用户下拉菜单项
export const MENULIST = [
  {
    name: NavName.Personal,
    path: RouterName.Personal,
  },
  {
    name: NavName.Setting,
    path: RouterName.Setting,
  },
  {
    name: NavName.SignOut,
    path: RouterName.SignOut,
  },
];
