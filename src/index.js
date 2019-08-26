/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-04-09 16:11:19
 * @LastEditors: your name
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
