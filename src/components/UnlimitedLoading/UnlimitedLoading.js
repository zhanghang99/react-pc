import React from 'react';
import List from './List';
import styles from './UnlimitedLoading.less'

export default class UnlimitedLoading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ListData:[1,2,3,4,5,6,7,8,9,10],//总共加载过的数据
      showData:[1,2,3,4,5,6,7,8,9,10],//限制当前页面展示的数据,ListData.slice(startShowPage*pageNum,(startShowPage+showPage)*pageNum)
      page:0,//总共加载过多少页
      pageNum:10,//每页多少条内容
      startShowPage:0,//从第几页开始取数，从ListData按startShowPage*pageNum指定位置取数
      showPage:3,//限制当前页面需要展示的页数,(startShowPage+showPage)*pageNum
      isSure:true,//是否显示更多加载
      positionEle:-1,//给需要定位的可视区域的子元素做标记第几个子元素需要添加data-target='true'
      direction:'down'//向上滚动还是向下滚动
    }
  }
  componentDidMount(){
    this.el.addEventListener('scroll',(e)=>{
      const { page,ListData,startShowPage,pageNum ,showPage,isSure} = this.state;
      const element = e.target;
      if(element.scrollTop === 0){
        if(page > showPage && startShowPage > 0){
          // console.log(page,startShowPage - 1,'到顶了');
          this.setState({
            startShowPage:startShowPage - 1,
            showData: [...ListData.slice((startShowPage - 1)*pageNum,(startShowPage + 2)*pageNum)],
            isSure:false,
            positionEle:pageNum,
            direction:'up'
          })
        }
      }else if(element.scrollTop + element.clientHeight === element.scrollHeight){
        // if(page > showPage - 1 && startShowPage + showPage - 1 <= page){
        if(!isSure){
          const startPage = startShowPage < 0 ? startShowPage + 2 :startShowPage + 1
          console.log(page,startPage,showPage,'到底了');
          this.setState({
            startShowPage:startPage,
            showData: [...ListData.slice((startPage)*pageNum,(startPage + showPage)*pageNum)],
            isSure:page - startPage >= showPage ? false : true,
            positionEle:pageNum*(showPage - 1),
            direction:'down'
          })
        }
      }
    })
  }
  //加载更多
  loadingMore = () => {
    const { ListData, page, pageNum,startShowPage,showPage } = this.state;
    const s = ListData.length;
    const addPage = page + 1;
    let showData = [];
    for(let i = s + 1 ; i < s + 11 ; i ++){
      ListData.push(i);
    }
    if(addPage < showPage){
      showData = [...ListData]
    }else{
      showData = [...ListData.slice((addPage-(showPage - 1))*pageNum,)]//(showPage - 1)表示要展示的页数
    }
    this.setState({
      ListData,
      showData,
      page:addPage,
      startShowPage: addPage < showPage ? startShowPage : startShowPage + 1,
      positionEle:pageNum*(showPage - 1)
    },()=>{
      const { page } = this.state;
      // 限制总页达到多少页时上下滚动有效
      if(page > showPage - 1){
        this.ele.scrollIntoView(false)
      }
    })
  }
  // 需要定位的目标子元素出现变化时触发
  positionTargetEle = (ele) => {
    const { direction ,page, showPage} = this.state;
    this.ele = ele;
    // 限制总页达到多少页时上下滚动有效
    if(page > showPage - 1){
      //scrollIntoView 子元素滚动到父元素的可视区域，参数为true时滚动到可视区域顶部，为false是滚动到底部
      ele.scrollIntoView(direction === 'up' ? true : false)
    }
  }
  render(){
    const { showData,isSure,positionEle } = this.state;
    return <div className={styles.layout} ref={(ref)=>{this.el = ref}}>
    {
      showData.map((v,i)=>{
        return <List data={v} key={i} positionTarget={ positionEle === i} positionTargetEle={this.positionTargetEle}/>
      })
    }
    {
      isSure && <div 
        className={styles.loadingMore}
        onClick={this.loadingMore.bind(this)}
        >
          加载更多...
      </div>
    }
    </div>
  }
}