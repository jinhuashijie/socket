1：界面需要先写出来
2：express服务器需要先开启；
	所需依赖：cnpm install express mongoose body-parser cookie-parser socket.io nodemon socket.io-client axios  --save-dev
3：前后端连接信息成功，webpack转发端口的设置是在config里面，axios传递的必须是json数据；前台react必须通过函数套函数的方式来解决this的问题;函数可以直接在组件下面，也要绑定this
	从后台传回来的数据在res的data里面的，
4:8080端口为什么老是无法暴露到局域网中？设置路由器没用；防火墙设置没用
	webpack-server打开的80端口局域网无法访问的问题；需要改配置
		historyApiFallback: true,//不跳转
	    inline: true,//实时刷新
        host: '0.0.0.0',  会导致自动打开 0.0.0.0的路径，原路径并没有失效，局域网也可以正常访问
5：引入socket-io；
	 服务端socketio实例化之后 app.listen需要改成server.listen 
	前台io监听的还是9093端口
6：解决其他客户端不能访问的问题
	const socket=io("ws://192.168.64.101:9093")   局域网没有一直报错了












