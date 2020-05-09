/**
 * PostCSS 的配置文件
 * PostCSS 是基于 Node.js 运行的一个处理 CSS 的工具
 * 所以它的配置文件也是运行在 Node.js 中
 */

// PostCSS 配置文件需要导出一个对象
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀, 用来兼容不同浏览器
    // // VueCLI 已经在内部默认配置了 autoprefixer
    // autoprefixer: {
    //   // browsers 用来配置要兼容到的系统(浏览器)环境
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 把 px 转为 rem
    'postcss-pxtorem': {
      // 转换的根元素基准值
      // 正常情况下, 按照设计稿来
      // 750 宽的设计稿, 值为 750 / 10 = 75
      rootValue: 37.5,

      // 需要转换的 css 属性, * 表示所有
      propList: ['*']
    }
  }
}
