import React, {Component} from 'react'
import config from './config.json';
import axios from 'axios'
import io from 'socket.io-client'
var socket=io("ws://192.168.64.101:9093")
// const socket=io("ws://localhost:9093")
//const socket=io("ws://127.0.0.1:9093")

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
	componentDidMount(){
		const b=this
		var a=function(data){
			b.setState({
				msg:data[data.length-1].user
			})
		}
		socket.emit('/test',{msg:"初始化前台发送连接测试"})
		socket.on("/phone",(data)=>{//这里接收后端广播的事件--这里远程没有接收到
			console.log(data[data.length-1].user,"接收到后台广播",29)//这个data同样是，后端广播的事件
			a(data)
			// b.setState({
			// 	msg:data[data.length-1].user
			// })
		})
		
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
			// socket.on("/data/phone1",(data)=>{
			// 	console.log(data,21)
			// })
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
