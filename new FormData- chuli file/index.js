
var http = require('http');
const fs = require('fs');




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
  if(request.url==="/a") {    var raw = fs.createReadStream('2.html');  response.setHeader('Content-Type', 'text/html');  raw.pipe(response);                      return;}


  response.end('hello world!');

  
  
}).listen(7000);
