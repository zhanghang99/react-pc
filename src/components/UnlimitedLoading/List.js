import React from 'react';
import styles from './List.less'

export default class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    // positionTarget为true即data-target='true'的元素
    if(nextProps.positionTarget){
      this.props.positionTargetEle(this.positionTarget)
    }
  }
  render(){
    const { data,positionTarget } = this.props;
    return <p className={styles.list} data-target={positionTarget} ref={(ref)=>{this.positionTarget = ref}}>{data}</p>
  }
}