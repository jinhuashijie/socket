import React, {Component} from 'react'
import config from './config.json';
import axios from 'axios'
class Greeter extends Component{
	constructor(props){
		super(props)
		this.state={
			msg:'初始消息',
			test:''
		}
		this.testChange=this.testChange.bind(this)
		this.sendMsg=this.sendMsg.bind(this)
		this.changeMsg=this.changeMsg.bind(this)
	}
	testChange(event){
		let val=event.target.value
		this.setState({
			test:val
		})
	}
	changeMsg(v){
		this.setState({
			msg:v
		})
	}
	sendMsg(){
		const datamsg=this.state.test
		const t=this.changeMsg;
		axios.post("/data/sendmsg",{msg:datamsg})
		.then(function(res){
			console.log(res.data)
			const v=res.data[res.data.length-1].user
			t(v)
		})
	}
	render() {
	    return (
		    <div>
		        {config.greetText}
		        <div>测试react里面的热更新-成功</div>
				<p>发送即时消息：{this.state.msg}</p>
				<button onClick={this.sendMsg}>发送到后台</button>
				<p onChange={this.testChange}>测试双向绑定：{this.state.test}</p>
				<input type="text"onChange={this.testChange} />
		    </div>
	    );
	}
}

export default Greeter
