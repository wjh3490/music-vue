const pxRem = require("postcss-pxtorem")
module.exports = {
    css:{
        loaderOptions:{
            postcss: {
                //selectorBlackList正则过滤，符合的class不进行rem转化
                //单个的css语句需过滤的情况下，可以使用PX或Px单位
                plugins:[pxRem({
                    autoprefixer:{},
                    rootValue: 37.5,
                    propList: ["*"],// 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部 默认全部处理
                    selectorBlackList:[".ig-",".dp-"]
                })]
            }
        }
    },
    pwa: {
    // 一些基础配置
    name: 'Music',
    themeColor: '#6476DB',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    /*
     * 两个模式，GenerateSW（默认）和 InjectManifest
     * GenerateSW 在我们build项目时候，每次都会新建一个service worker文件
     * InjectManifest 可以让我们编辑一个自定义的service worker文件，实现更多的功能，并且可以
     * 拿到预缓存列表
     */
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的service worker文件的位置
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    }
  }
}

// module.exports = {
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     //axios: 'axios'
  //   }
  // },
  // chainWebpack: config => {
  //   config.optimization.runtimeChunk('single'),
  //     config.module
  //       .rule('images')
  //       .use('image-webpack-loader')
  //       .loader('image-webpack-loader')
  //       .options({
  //         bypassOnDebug: true
  //       });
    // const cdn = {
    //   js: [
    //     // vue must at first!
    //     'https://cdn.jsdelivr.net/npm/vue',
    //     'https://unpkg.com/vue-router@3.0.1/dist/vue-router.min.js',
    //     // 'https://unpkg.com/axios/dist/axios.min.js'
    //   ]
    // };
    // config.plugin('html').tap(args => {
    //   args[0].cdn = cdn;
    //   return args;
    // });
  // },

  // productionSourceMap: false
// };

// module: {
//   rules: [
//     {
//       // 压缩图片
//       loader: 'image-webpack-loader',
//       options: {
//         mozjepg: {
//           pregressive: true,
//           quality: 65
//         },
//         optipng: {
//           enabled: false
//         },
//         pngquant: {
//           quality: '65-90',
//           speed: 4
//         },
//         gifsicle: {
//           interlaced: false
//         },
//         webp: {
//           quality: 75
//         }
//       }
//     }
//   ]
// }
// };
module.exports = {
  pwa: {
    // 一些基础配置
    name: 'Browsing-Exp',
    themeColor: '#6476DB',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    /*
     * 两个模式，GenerateSW（默认）和 InjectManifest
     * GenerateSW 在我们build项目时候，每次都会新建一个service worker文件
     * InjectManifest 可以让我们编辑一个自定义的service worker文件，实现更多的功能，并且可以
     * 拿到预缓存列表
     */
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的service worker文件的位置
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    }
  }
};
