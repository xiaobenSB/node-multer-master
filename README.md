用了form action="xxxx" method="POST" enctype="multipart/form-data" 上传 <br/>
  和js的new FormData() 上传 -->（这里同样也用到了enctype=multipart/form-data） <br/> 
  enctype=multipart/form-data是上传必须的，enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。上传里的内容数据是得有multipart/form-data浏览器才会进行编码然后上传到服务器，而不设置的话的浏览器不会上传内容数据，只会上传该文件名<br/>
  
  依照传统的post数据获取来改变数据传到 request对象里的files或body里<br/>
  files对应上传的数据 body对应不是上传的数据
