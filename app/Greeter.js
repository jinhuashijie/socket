import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
	constructor(props){
		super(props)
		this.state={
			msg:'初始消息',
			test:''
		}
		this.testChange=this.testChange.bind(this)
	}
	testChange(event){
		let val=event.target.value
		this.setState({
			test:val
		})
	}
	render() {
	    return (
		    <div>
		        {config.greetText}
		        <div>测试react里面的热更新-成功</div>
				<p>发送即时消息{this.state.msg}</p>
				<p onChange={this.testChange}>测试双向绑定{this.state.test}</p>
				<input type="text"onChange={this.testChange} />
		    </div>
	    );
	}
}

export default Greeter
