文件保存的编码是用文件的源编码，不管你怎么对数据进行修改（编码）

multer这个模块用了busboy这个模块来处理前台发送的上传数据  enctype="multipart/form-data" 上传必须要设置的

busboy的使用

on('file') 是响应文件形式的post数据
on('field') 是响应键值形式的post数据

var Busboy = require('busboy')
 if (!/multipart\/form-data/i.test(request.headers['content-type'])) {
                return response.end('wrong');
            }
			var a = '';
            var busboy = new Busboy({ headers: request.headers });
			request.pipe(busboy);
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {  //处理上传的数据就执行这个，有多少个input type =file类型的数据就执行多少次
				console.log(122222);
                console.log(fieldname, file, filename, encoding, mimetype)
                let writeStream = fs.createWriteStream('./public/' + filename);

                //监听data事件，接收传过来的文件，如果文件过大，此事件将会执行多次，此方法必须写在file方法里
                file.on('data', function (data) {
                    writeStream.write(data);
					
				//a+=data 会破坏数据，就是buffter不能加等于buffter,大文件时会多次触发这里所以会加等于
				a+=data.toString('binary');//latin1编码和binary编码都可以处理ANSI编码
              
                })

                //监听end事件，文件数据接收完毕，关闭这个可写流
                file.on('end', function (data) {
		//fs.writeFile('./xiaoben1.txt',Buffer.from(a, 'binary').toString('binary'),{encoding:'binary'},function(){})
					fs.writeFile('./xiaoben1.png',a,{encoding:'binary'},function(){})   //encoding是类似于toString以什么的编码
                    writeStream.end();
                });

            });
            busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {  //busboy接受到请求的数据就执行这个
                console.log('Field [' + fieldname + ']: value: ' );
            });
            busboy.on('finish', function () {  //busboy事件都处理完成就执行这个
                response.writeHead(200, { 'Connection': 'close' });
                response.end("That's all folks!");
				console.log(222);
            });
             
        }



用了form action="xxxx" method="POST" enctype="multipart/form-data" 上传 <br/>
  和js的new FormData() 上传 -->（这里同样也用到了enctype=multipart/form-data） <br/> 
  enctype=multipart/form-data是上传必须的，enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。上传里的内容数据是得有multipart/form-data浏览器才会进行解析内容然后上传到服务器，而不设置的话的浏览器不会上传内容数据，只会上传该文件名<br/>
  
  依照传统的post数据获取来改变数据传到 request对象里的files或body里<br/>
  files对应上传的数据 body对应不是上传的数据
  
  application/x-www-form-urlencoded	默认。在发送前对所有字符进行编码（将空格转换为 "+" 符号，特殊字符转换为 ASCII HEX 值）。
multipart/form-data	不对字符编码。当使用有文件上传控件的表单时，该值是必需的。
text/plain	将空格转换为 "+" 符号，但不编码特殊字符。
