/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-08-22 17:34:38
 * @LastEditors: Please set LastEditors
 */
const route = [
  {
    path: "/Index",
    component: () => import("./routes/index.js")
  },
  {
    path: "/MobileCom",
    component: () => import("./routes/MobileCom")
  },
  {
    path: "/PCCom",
    component: () => import("./routes/PCCom")
  }
];
export default route;
