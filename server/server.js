const express =require('express')
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const path=require('path')
const app=express()

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
app.listen(9093,(req,res)=>{
	console.log("连接9093成功")
})












