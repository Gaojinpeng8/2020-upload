var http = require('http')
var fs = require('fs')
var path = require('path')
var formidable = require('formidable')
var tt = require('./time.js')

http.createServer(function (req, res) {
    var url = req.url

    if (url === '/') {
        fs.readFile('./indext.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found ...')
            }
            return res.end(data)
        })
    } else if (url === '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm() //创建表单
    
        form.uploadDir = './upload'  //上传到目的文件夹
        form.parse(req, function (err, fields, files) {
            //所有文本域都在fields里存放
            //所有文件域都在files里存放
            // console.log('文件名:'+files.wenjian.name);
            // console.log(files.wenjian.path);
            
            var ran = parseInt(Math.random() * 89999 + 10000)
            var extname = path.extname(files.wenjian.name)
            var oldpath = __dirname + '/' +files.wenjian.path
            var newpath = __dirname + '/upload/' + tt.time + ran + extname;
            // var newpath = __dirname + '/upload/' + files.wenjian.name;

            // console.log(extname)
            fs.rename(oldpath, newpath, function (err) {  //给文件命名
                res.writeHead(200, {'content-type': 'text/html'})
                if (err) {
                    return res.end('失败')
                }
                fs.readFile('./indext.html', function (err, data) {
                    if (err) {
                        return res.end('404 Not Found ...')
                    }
                    return res.end(data)
                })
            })
        })
    } else {
        fs.readFile('.' + url, function (err, data) {
            res.writeHead(200, {'content-type': 'text/html'})
            if (err) {
                return res.end('404 Not Found ...')
            }
            return res.end(data)
        })
    }
})
    .listen(3000, () => {
        console.log('running ...')
    })