/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-08-26 15:28:34
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from "./index.css";

@connect(({example,global})=>({
  example,
  global
}))
export default class Index extends React.Component{
  componentDidMount(){
    // console.log(1);
  }
  jump = () => {
    this.props.history.push('/login');
  }
  triggerGet = () => {
    console.log(this.props.dispatch, "this.props.dispatch");
    this.props.dispatch({
      type: 'global/queryGet',
    });
  };
  triggerPost = () => {
    this.props.dispatch({
      type: 'global/queryPost',
      payload: {
        code:'123',
      },
    });
  };
  mobileJump = () => {
    this.props.history.push('/MobileCom');
  }
  PCJump = () => {
    this.props.history.push('/PCCom');
  }
  render(){
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li onClick={this.jump}>
            To get started, edit <code>src/index.js</code> and save to
            reload.
          </li>
        </ul>
        <button type="danger" onClick={() => this.triggerGet()}>
          GIT请求数据
        </button>
        <button type="danger" onClick={() => this.triggerPost()}>
          POST请求数据
        </button>
        <Button onClick={this.PCJump}>PC组件</Button>
        <Button onClick={this.mobileJump}>Mobile组件</Button>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}
