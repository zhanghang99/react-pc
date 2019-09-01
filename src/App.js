/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-08-23 16:23:52
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Switch, Route, Redirect } from "dva/router";
import dynamic from 'dva/dynamic';
import styles from './App.less';
import route from './routerLink'
import Head from "./components/head/head";
import MenuLeft from "./components/Menu/Menu";
import { InputVerification } from './utils/utils';
const ah = require("ajax-hook")



// function tryParseJson1(xhr){
//   var contentType=xhr.getResponseHeader("content-type")||"";
//   if(contentType.toLocaleLowerCase().indexOf("json")!==-1){
//       xhr.responseText=JSON.parse(xhr.responseText);
//   }
// }
// console.log(tryParseJson1);
export default class App extends React.Component{
  componentDidMount(){
    ah.hookAjax(
      {
        open:function(arg,xhr){
          if(arg[1].includes('?')){
            arg[1] += `&ajaxHookSendTime=${new Date().getTime()}`
          }
          // console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2])
        },
        responseText: {
            getter: this.tryParseJson
        },
        response: {
            getter:this.tryParseJson
        }
      }
    )
  }
  addZero = (date) => {
    return date < 10 ? `0${date}` : date
  }
  tryParseJson = (v,xhr) => {
    let ajaxHookSendTime = new URLSearchParams(xhr.responseURL).get('ajaxHookSendTime');
    let outTime = 100;
    let reponseTime = new Date().getTime() - ajaxHookSendTime;
    console.log(ajaxHookSendTime,outTime,reponseTime,'ajaxHookSendTime');
    // console.log(xhr,'xhr');
    if(xhr.status !== 200 || reponseTime >= outTime){
      let updateTime = new Date();
      updateTime = `${updateTime.getFullYear()}:${this.addZero(updateTime.getMonth() + 1)}:${this.addZero(updateTime.getDate())} ${this.addZero(updateTime.getHours())}:${this.addZero(updateTime.getMinutes())}:${this.addZero(updateTime.getSeconds())}`
      console.log(xhr.status,'status');
      console.log(window.location.href,'href');
      console.log(xhr.responseURL,'responseURL');
      console.log(updateTime,'time');
      console.log(reponseTime,'reponseOutTime');
    }
    var contentType=xhr.getResponseHeader("content-type")||"";
    if(contentType.toLocaleLowerCase().indexOf("json")!==-1){
        v=JSON.parse(v);
        //不能在属性的getter钩子中再读取该属性，这会导致循环调用
        //v=JSON.parse(xhr.responseText);
    }
    return v;
}
  render(){
    const data = '';
    console.log(InputVerification(data));
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