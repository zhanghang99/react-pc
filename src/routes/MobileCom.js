import React from 'react';
import Drag from '../components/Drag/Drag'
export default class MobileCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      a:1
    }
  }
  componentWillMount(){
    console.log("父componentWillMount");
  }
  componentDidMount(){
    console.log('父componentDidMount');
    setTimeout(()=>{this.setState({a:2})},1000);
  }
  componentWillReceiveProps(){
    console.log("父componentWillReceiveProps");
  }
  render(){
    console.log("父render");
    return (
      <div>
        <Drag a={this.state.a}/>
      </div>
    )
  }
}
