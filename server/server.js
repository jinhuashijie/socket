const express =require('express')
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const path=require('path')
const app=express()
const server=require("http").createServer(app)
const io=require('socket.io')(server)  
let socket0;
io.on("connection",function(socket){
	console.log('全局监听事件')
	socket0=socket;
	// socket.on("/test",function(data){
	// 	console.log(data,10,"初始化广播测试")
	// 	//io.emit("recvmg",data)
	// })
	//io.emit("/phone2",{a:100})
})
app.use(cookieParser())
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
					io.emit("/phone",d)
					console.log(d[0].user,"应该广播出去")
					return res.json(d)
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
app.use(function(req,res,next){
	if(req.url.startsWith('/user/')||req.url.startsWith('/static/')||req.url.startsWith('/data/')){
		return next        //我们是没有user，没有statec路径的
	}else{
		console.log('path',path.resolve('../build/'))
		return res.sendFile(path.resolve('../build/'))//修正路径的问题
	}
})
app.use('/',express.static(path.resolve('../build')))
server.listen(9093,(req,res)=>{
	console.log("连接9093成功")
})












