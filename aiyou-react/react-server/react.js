var express = require("express");
var router = express.Router()

var { getResult } = require("./config")
var { createToken, decodeToken, getMobile } = require("./utils/token")
var multer = require("multer");

// var axios = require("axios")

// import { Liuyan } from "./utils/schema"   //ES6
var { Liuyan, Movie, Code, Pic } = require("./utils/schema")

router.get("/index", (req, res) => {
    res.send("这是  react - project 接口 文件")
})

// 查询留言
router.get("/getComments", (req, res) => {
    Liuyan.find().then(result => {
        res.json({
            code: 200,
            result,
            msg: "获取评论成功"
        })
    })
})

// 添加留言
router.post("/addComments", (req, res) => {
    var body = req.body;
    console.log(body)
    Liuyan.insertMany(body).then(data => {
        Liuyan.find().then(result => {
            res.json({
                code: 200,
                result,
                msg: "添加留言成功"
            })
        })
    })
})


// 删除留言
router.post("/delComments", (req, res) => {
    var body = req.body;

    Liuyan.deleteOne({
        _id: body.id
    }).then(result => {
        res.json({
            code: 200,
            result,
            msg: "删除留言成功"
        })
    })
})

//卖座电影数据
//http://localhost:2000/react/movie
router.get("/movie", (req, res) => {
    var limit = req.query.limit * 1 || 0    //0是不限制
    Movie.find().limit(limit).then(result => {
        res.json({
            msg: "获取电影数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})


//设置随机验证码
function getCode() {
    return 1000 + Math.floor((10000 - 1000) * Math.random())
}


//云之讯平台发送短信
router.post("/yunzhixun/sendSms", (req, res) => {
    var { mobile } = req.body;
    const code = getCode();
    if (!mobile) {
        res.json({
            code: 200,
            msg: "请先输入手机号"
        })
    }


    getResult(code, mobile).then(response => {
        console.log(response.data)
        console.log(response.data.code)

        if (response.data.code == "000000") {

            //插入数据库
            Code.insertMany({
                mobile,
                code,
                time: new Date()
            }).then(result => {
                res.json({
                    code: 200,
                    msg: "验证码发送成功",
                    param: code,
                    type: 1,
                    result
                })
            })

        } else {
            res.json({
                code: 200,
                msg: "验证码发送失败",
                type: 0
            })
        }

    }).catch(err => {
        res.json({
            code: 200,
            msg: "服务器错误",
            type: 0
        })
    })

})



//校验验证码
router.post("/checkCode", (req, res) => {
    var {
        mobile,
        code
    } = req.body;
    Code.findOne({
        mobile,
        code
    }).then(result => {
        if (result) {
            var time = new Date();
            //小于60s 有效  大于60s过期
            if (time - result.time < 60 * 1000 * 1186400) {
                var token = createToken(mobile)
                res.json({
                    code: 200,
                    msg: "验证码有效",
                    type: 1,
                    token
                })
            } else {
                res.json({
                    code: 200,
                    msg: "验证码过期",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "验证码错误",
                type: 0
            })
        }
    })
})


// 获取手机号
router.post("/getMobile", (req, res) => {
    var token = req.headers.token
    console.log(token)
    if (token) {
        decodeToken(token).then(result => {
            res.json({
                code: 200,
                msg: "token 验证成功",
                result: result,
                type: 1,
            })
        }).catch(err => {
            res.json({
                code: "3000",
                msg: "token 验证失败",
                err,
                type: 0,
            })
        })
    } else {
        res.json({
            code: "3000",
            msg: "token不存在，请重新登陆",
            type: 0
        })
    }
})



//图片上传相关
// 磁盘存储数据 
var storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./public/upload");  // 存储到 /public/upload
    },
    filename(req, file, cb) {

        cb(null, Date.now() + "wh1910" + file.originalname);
    }
})
var upload = multer({ storage: storage }).any();  // 接收任何格式的文件

//上传图像，并存数据库
router.post("/uploadImg", upload, (req, res) => {
    console.log(req.files[0]);
    var path = req.files[0].path;   // 上传的图片路径
    var time = new Date();   // 时间戳

    getMobile(req, res, (mobile) => {
        Pic.insertMany({
            mobile,
            pic: path,     //存所有的上传图像，最后取最新的
            time
        }).then(result => {
            res.json({
                code: 200,
                msg: "头像上传成功",
                pic: path,
                mobile,
                type: 1,
            })
        })
    })

})


//得到图片
router.post("/getlastPic", (req, res) => {
    getMobile(req, res, (mobile) => {
        Pic.findOne({
            mobile
        }).sort({_id:-1}).then(result => {
            if (result) {
                res.json({
                    code: 200,
                    msg: "获取最新头像成功",
                    result,
                    type: 1,
                })
            } else {
                res.json({
                    code: 200,
                    msg: "用户暂无头像",
                    result,
                    type: 0
                })
            }
        })
    })
})

module.exports = router