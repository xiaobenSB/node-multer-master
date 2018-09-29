new  FormData() 方法可以使Blob对象数据上传到后台



    <input type="file" accept="image/*" />
    <script type="text/javascript">
        $("input").change(function () {
            var files = this.files;
            if (!files.length) {
                return;
            }
            var fd = new FormData();
            fd.append('name', 'www');
            fd.append('myfile', this.files[0]); //这里不是blob对象时，node里的busboy的on 'file'就不会执行回调
            $.ajax({
                type: 'POST',
                url: '/b',
                data: fd,
                processData: false,
                contentType: false
            }).done(function (data) {
                console.log(data);
            });
        });


                if (req.method === 'POST') {
            if (!/multipart\/form-data/i.test(req.headers['content-type'])) {
                return res.end('wrong');
            }
            var busboy = new Busboy({ headers: req.headers });
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                console.log(filename)
                let writeStream = fs.createWriteStream('./upload/' + filename);

                //监听data事件，接收传过来的文件，如果文件过大，此事件将会执行多次，此方法必须写在file方法里
                file.on('data', function (data) {
                    writeStream.write(data);
                    console.log(data);
                })

                //监听end事件，文件数据接收完毕，关闭这个可写流
                file.on('end', function (data) {
                    writeStream.end();
                });

            });
            busboy.on('finish', function () {
                res.writeHead(200, { 'Connection': 'close' });
                res.end("That's all folks!");
            });
            return req.pipe(busboy);
        }
            res.writeHead(404);
            res.end();
