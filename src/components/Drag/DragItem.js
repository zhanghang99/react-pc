import React from 'react';
import styles from './DragItem.less'
export default class DragItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showModel:false,//是否显示Model
      offsetLeft:0,//当前卡片离文档左侧的距离
      offsetTop:0,//当前卡片离文档顶部的距离
      mouseLeft:0,//鼠标在元素中离左侧的距离
      mouseTop:0,//鼠标在元素中离顶部的距离
      width:0,//当前卡片的宽度
      height:0,//当前卡片的高度
    }
  }
  componentDidMount(){
    this.changeOffset();
  }
  UNSAFE_componentWillReceiveProps(nextProps){
  }
  componentDidUpdate(){
    // this.changeOffset();
  }
  changeOffset = () => {
    const offsetLeft = this.CurrentItem.offsetLeft
    const offsetTop = this.CurrentItem.offsetTop
    this.setState({
      offsetLeft,
      offsetTop,
      width:parseFloat(window.getComputedStyle(this.CurrentItem,false)['width']),
      height:parseFloat(window.getComputedStyle(this.CurrentItem,false)['height']),
    })
    this.props.coordinate && this.props.coordinate({offsetLeft,offsetTop});
  }
  onTouchStart = (id,e) => {
    const { width,height} = this.state;
    const offsetLeft = this.CurrentItem.offsetLeft
    const offsetTop = this.CurrentItem.offsetTop
    const mouseLeft = e.targetTouches[0].clientX - this.CurrentItem.offsetLeft;
    const mouseTop = e.targetTouches[0].clientY - this.CurrentItem.offsetTop;
    this.setState({
      showModel:true,
      mouseLeft,
      mouseTop
    })
    this.props.showModel && this.props.showModel(width,height,offsetLeft,offsetTop);
  }
  onTouchEnd = (order) => {
    this.setState({
      showModel:false,
      mouseLeft:0,
      mouseTop:0
    })
    this.props.closeModel && this.props.closeModel(order);
  }
  onTouchMove = (order,e) => {
    const { mouseLeft, mouseTop } = this.state;
    const left = e.targetTouches[0].clientX - mouseLeft
    const top = e.targetTouches[0].clientY - mouseTop
    // console.log(left,top);
    this.props.moveModel && this.props.moveModel(left,top);
  }
  render(){
    const { id ,order} = this.props;
    return (
      <div className={styles.DragItems}
        order={order}
        ref={ (ref) => this.CurrentItem = ref}
        onTouchStart={this.onTouchStart.bind(this,id)}
        onTouchEnd={this.onTouchEnd.bind(this,order)}
        onTouchMove={this.onTouchMove.bind(this,order)}
      >
        {id}
      </div>
    )
  }
}
