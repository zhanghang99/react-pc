import React from 'react';
import UnlimitedLoading from '../components/UnlimitedLoading/UnlimitedLoading'
export default class PCCom extends React.Component{
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
        <UnlimitedLoading/>
      </div>
    )
  }
}
