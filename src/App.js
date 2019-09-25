/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-09-25 10:42:03
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Switch, Route, Redirect } from "dva/router";
import dynamic from 'dva/dynamic';
import styles from './App.less';
import route from './routerLink'
import Head from "./components/head/head";
import MenuLeft from "./components/Menu/Menu";


export default class App extends React.Component{
  render(){
    return (
      <div className={styles.App}>
        {/* 左侧导航组件 */}
        <MenuLeft />
        <div className={styles.Main}>
          {/* 头部导航组件 */}
          <Head />
          {/* 路由页面 */}
          <Switch>
            {route.map(({ path, ...dynamics }) => {
              return (
                <Route key={path} path={path} exact component={dynamic({
                  ...dynamics,
                })} />
              );
            })}
            <Redirect path="/" exact to="Index" />
          </Switch>
        </div>
      </div>
    );
  }
}