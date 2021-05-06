importScripts("/music-vue/precache-manifest.bc05809e27f71bfb33cc8e1db2eb97b6.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/*eslint-disable*/
workbox.core.setCacheNameDetails({
  prefix: 'music',
  suffix: 'v1.0.0',
});
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.core.skipWaiting();
workbox.core.clientsClaim();

/*
 * 预缓存列表和预缓存他们，也就是html，js，css等* 静态文件
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// 对我们请求的数据进行缓存，这里采用 networkFirst 策略
// workbox.routing.registerRoute(
//   /.*\.(png|jpe?g|gif|webp)/,
//   workbox.strategies.cacheFirst()
// );
// workbox.routing.registerRoute(
//   /.*\.(?:js|css)/,
//   workbox.strategies.cacheFirst()
// );
// workbox.routing.registerRoute(
//   /''.*\.html'/,
//   workbox.strategies.networkFirst()
// );

workbox.routing.registerRoute(
  /^https:\/\/p1\.music\.126\.net/,
  workbox.strategies.networkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 5 * 24 * 60 * 60, // 设置缓存有效期为5天
      }),
    ],
  })
);
workbox.routing.registerRoute(
  /^https:\/\/netease-cloud-music-api-gilt\.vercel\.app/,
  workbox.strategies.networkFirst({
    cacheName: 'api',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60, // 设置缓存有效期为1天
      }),
    ],
  })
);

