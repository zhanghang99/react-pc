/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 17:11:12
 * @LastEditTime: 2019-08-21 17:04:12
 * @LastEditors: Please set LastEditors
 */
export default {
  entry: "src/index.js",
  hash: true,
  manifest: {
    basePath: "/app/"
  },
  html: {
    template: "./src/index.ejs"
  },
  proxy: {
    "/api1": {
      target: "http://127.0.0.1:7077",
      changeOrigin: true,
      pathRewrite: { "^/api1" : "" }
    },
    "/api2": {
      target: "https://robertdev1.kingdee.com",
      changeOrigin: true,
      pathRewrite: { "^/api2" : "" }
    }
  }
}
