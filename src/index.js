/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-08-27 10:53:23
 * @LastEditors: Please set LastEditors
 */
import dva from 'dva';
import 'antd/dist/antd.css';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
