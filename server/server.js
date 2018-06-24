const express =require('express')
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const path=require('path')
const app=express()
const server=require("http").createServer(app)
const io=require('socket.io')(server)  

io.on("connection",function(socket){
	console.log('全局监听事件')
	socket.on("/test",function(data){
		console.log(data,10)
		//io.emit("recvmg",data)
	})
})
app.use(bodyParser.json())
const mongoose =require("mongoose")
const connect="mongodb://127.0.0.1:27017/my"
mongoose.connect(connect)
mongoose.connection.on("connected",function(){
})

const User =mongoose.model("user",new mongoose.Schema({
	user:{type:String,require:true},
	age:{type:Number,require:true}
}))

app.get('/data',function(req,res){//这里是自定义端口后面的路径
	//console.log('接收到前台请求')
	User.find({},function(err,doc){//从数据库查询出数据病输出到页面上
		if(!err){
			//console.log("接收到后台数据")
			res.json(doc)
		}else{
			//console.log(err)
		}
	})
})
app.post('/data/sendmsg',function(req,res){
	console.log(req.body)
	User.create({                       //之后写入数据库
		'user':req.body.msg, 
		age:11  
	},function(err,doc){
		if(!err){
			User.find({},function(e,d){//从数据库查询出数据并广播到前台
				if(!e){
					console.log('在远程这个事件也是触发了的')
					return res.json(d)
					//io.emit("/phone",d) //就是这里没有广播到远程-但是广播到了 本地
				}else{console.log(e)}//也就是说远程根本没接收到，为什么？
			})
		}else{
			// console.log(err)
		}
	})
	// User.find({},function(err,doc){
	// 	if(!err){
	// 		//console.log("接收到后台数据")
	// 		res.json(doc)
	// 	}else{
	// 		//console.log(err)
	// 	}
	// })
})
server.listen(9093,(req,res)=>{
	console.log("连接9093成功")
})












