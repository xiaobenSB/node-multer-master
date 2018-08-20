
var http = require('http');
const fs = require('fs');
const zlib = require('zlib');//注意不能同时操作zlib.createxxxx()方法，必须等先开始的执行结束再执行
const file = process.argv[2];  //对应node  xx.js （这里）



var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req,file,cb){
     cb(null,"public");
   },
  filename: function (req,file,cb) {  //用时间来防止重名
     cb(null,Date.now()+".png");
   }
})

var upload = multer({ storage: storage });

//编译成gzip时做了编码记号，当用gzip编码解析时会解析成编码记号的编码 on是先注册让返回的pipe方法触发，pipe里面是空数据就不会触发大部分on注册的方法

http.createServer(function(request, response) {
  if(request.url==="/b"){

    //传统post数据获取方式
	/*request.on('data',function(data){
      //data是buffer编码,里面的toString方法可以转化成为转化成未转化成buffer的编码
    console.log(data.toString());
  })

    request.on('end',function(){
     
    console.log('ok');
	response.end('ok');
  })*/

  //依照上面传统来获取然后改变数据传到 request对象里的files或body里
  

	upload.single("myfile")(request,response,function(){
      console.log(request)

      console.log(1);
	});

  
   }
  if(request.url==="/favicon.ico") return;
  if(request.url==="/a") {    var raw = fs.createReadStream('2.html');   raw.pipe(response);                      return;}


  response.end('hello world!');

  
  
}).listen(7000);
