module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    // },
    'postcss-pxtorem': {
      // rootValue: 37.5,
      rootValue ({ file }) {
        // 如果是 vant 组件库的样式，则使用 37.5 的基准值，否则使用 75的基准值
        return file.indexOf('vant') > -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 不被编译的 选择器
      selectorBlackList: ['markdown-body'],
      // 不被编译的 css文件
      exclude: 'github-markdown'
    }
  }
}
