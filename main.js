let express = require("express");
let fs = require("fs");
let path = require("path");
let iconv = require("iconv-lite");
let http =require("http");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req,file,cb){
     cb(null,"public/");
   },
  filename: function (req,file,cb) {  //用时间来防止重名
     cb(null,Date.now()+".png");
   }
})

var upload = multer({ storage: storage });

let app = express();

app.all('*', function(req, res, next) {  //all是匹配当前所有 use是匹配当前和当前之后路径所有 如all："/a" 时只能匹配/a的get和post
	 if (req.path !== "/" && !req.path.includes(".")) {  //匹配不是访问根目录和路径没有.的请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Content-Type", "application/json;charset=utf-8");
	 }
    next();
});

//app.use(express.static("public"));
app.all("/a",upload.single("myfile"),function(req,res){  //myfile是限制前台只能上传名为myfile的文件（name）
console.log(req.file);
	fs.readFile(path.join(__dirname,"./public/1.txt"),function(err,data){  
	
           res.send(iconv.decode(data,"GB2312"));
           var readStream = fs.createReadStream(path.join(__dirname,"./public/1.txt"));
		   var writeStream = fs.createWriteStream(path.join(__dirname,"./public/2.txt"));
		   readStream.pipe(writeStream);
	});
	console.log(1);
	console.log("有人上传东西了！");  //乱码时得设置这个js的文件编码utf-8
	
});
/*
app.post("/public/index",upload.single("myfile"),(req,res,next)=>{
  console.log(req.file);
  res.send(req.file);
});*/

app.use(function(req,res,next){  
	 var err = new Error("zhe ge ye mian hai mei chu li!Not Found!");
	  err.status = 404;
	  next(err);  //注意使用next时里面如果传了参数，后面接收的只会处理这个参数并且返回
});

app.use(function(err,req,res){ //因为发送请求不是你这里发的,你只是接受请求并处理请求
	res.send("100"); //这个是不会处理的
	res.locals.error = req.app.get("env") === "development" ? err : {};
	next();
	
});


var server=http.createServer(app).listen(process.env.POR||8800);  //process.env.POR  window下 process.env == set 后面可以任意名process.env.xxx == set xxx

//监听当前控制台触发事件
process.on('uncaughtException', function (err) {  //拦截控制台的报错信息并处理，防止退出 虽然不会退出但错误语句后面也不执行
　　console.log('Caught exception: ' + err);  
}); 

process.on('SIGNAL_ONE', function(data){  //监听自定义事件并接受
    console.log(data);
});

process.emit("SIGNAL_ONE","欢迎使用process.env.POR或8800端口");   //触发事件并发送参数

console.log(b);


