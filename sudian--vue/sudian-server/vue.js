

var express = require("express");
var router = express.Router()

var { Banner1, Banner2, Good1, Good2, Goodinfo, Findgood, Findbanner, User, Shopcar, AddreList } = require("./utils/schema")

var { aesEncrypt, keys } = require("./utils/index");

//首页banner1
//http://localhost:1911/vue/sudian/banner
router.get("/sudian/banner", (req, res) => {
    Banner1.find().then(result => {
        res.json({
            msg: "请求素店banner数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})


//首页banner2
//http://localhost:1911/vue/sudian/navigator
router.get("/sudian/navigator", (req, res) => {
    Banner2.find().then(result => {
        res.json({
            msg: "请求素店banner2数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})


//首页good1
//http://localhost:1911/vue/sudian/good1
router.get("/sudian/good1", (req, res) => {
    Good1.find().then(result => {
        res.json({
            msg: "请求素店good1数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})

//首页good2
//http://localhost:1911/vue/sudian/good2
router.get("/sudian/good2", (req, res) => {
    Good2.find().then(result => {
        res.json({
            msg: "请求素店good2数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})

//detail详情页
//http://localhost:1911/vue/sudian/goodinfo
router.get("/sudian/goodinfo", (req, res) => {
    Goodinfo.findOne({
        goodsId: req.query.goodsId
    }).then(result => {
        res.json({
            msg: "请求素店goodDetail数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})


//find-tuijian内容
//http://localhost:1911/vue/sudian/findgood
router.get("/sudian/findgood", (req, res) => {
    Findgood.find().then(result => {
        res.json({
            msg: "请求素店findgood数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})

//find-tuijian-banner内容
//http://localhost:1911/vue/sudian/tuanjianbanner
router.get("/sudian/tuanjianbanner", (req, res) => {
    Findbanner.find().then(result => {
        res.json({
            msg: "请求素店findgood-banner数据成功",
            code: 200,
            result,
            type: 1
        })
    })
})


//注册
router.post("/register", (req, res) => {
    const body = req.body
    console.log(body)
    //先判断手机号是否存在
    User.findOne({
        $or: [
            { mobile: body.mobile },
            { username: body.username }
        ]
    }).then(data => {
        if (data) {
            res.json({
                code: 200,
                msg: "用户名或手机号已存在，请重新注册",
                type: 0,
                result: null,
            })
        } else {
            body.time = new Date();
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功，欢迎登陆",
                    result,
                    type: 1
                })
            })
        }
    })
})


//login
router.post("/login", (req, res) => {
    var body = req.body;
    //先判断手机号是否一致，再判断密码是否一致
    User.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data) {
            if (data.password == body.password) {
                //加密方式：密码+手机号
                //tokan永远是登录成功后生成的,后端生成传给前端
                var str = body.mobile + "-" + body.password;
                var token = aesEncrypt(str, keys);

                req.session.token = token;
                req.session.mobile = body.mobile;
                req.session.username = data.username
                res.json({
                    code: 200,
                    msg: "登录成功",
                    result: data,
                    type: 1,
                    token
                })
            } else {
                res.json({
                    code: 200,
                    msg: "登录失败，手机号或密码错误",
                    result: data,
                    type: 0
                })
            }

        } else {
            res.json({
                code: 200,
                msg: "登录失败，手机号码不存在",
                result: data,
                type: 0
            })
        }
    })
})


//个人中心
//http://localhost:1911/vue/sudian/mineinfo
router.get("/sudian/mineinfo", (req, res) => {
    User.findOne({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            msg: "获取个人用户信息成功",
            code: 200,
            result

        })
    })
})


//注销
router.get("/sudian/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("login")
    })
})


//加入购物车差
router.post("/sudian/addgood", (req, res) => {
    const body = req.body;
    console.log(body)
    Shopcar.insertMany(body)
        .then(result => {
            res.json({
                msg: "加入购物车成功",
                code: 200,
                mobile: req.session.mobile,
                result

            })
        })
})



//查询购物车
router.get("/sudian/findshopcar", (req, res) => {
    Shopcar.find({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            msg: "查询购物车成功",
            code: 200,
            result,
            type: 1

        })
    })

})



//添加收货地址
router.post("/sudian/addreList", (req, res) => {
    const body = req.body
    console.log(body)
    AddreList.insertMany(body).then(result => {
        res.json({
            msg: "地址添加成功",
            code: 200,
            mobile: req.session.mobile,
            result

        })
    })
})

//查询收货地址
router.get("/sudian/findAddreList", (req, res) => {

    AddreList.find({
        mobile: req.session.mobile
    }).then(result => {
        console.log(result)
        if (result) {
            res.json({
                msg: "查询收货地址成功",
                code: 200,
                result,
                type: 1,
             
            })
        } else {
            res.json({
                msg: "无地址",
                code: 200,
                result: null,
                type: 0
            })
        }

    })
})

//删除地址
router.get("/sudian/getdele", (req, res) => {

    AddreList.deleteOne({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            code: 200,
            msg: "地址删除成功",
            result,
            type:1
        })
    })
})











var multer = require("multer");
// 磁盘存储数据 
var storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./public/upload");  // 存储到 /public/upload
    },
    filename(req, file, cb) {
        console.log(file.originalname)
        cb(null, Date.now() + "wh1910" + file.originalname); //防止文件重名，所以加上时间戳和任意字段
    }
})
var upload = multer({ storage: storage }).any();  // 接收任何格式的文件

//图片上传
router.post("/uploadImg", upload, (req, res) => {
    console.log(req.files[0]);
    var path = req.files[0].path;   //得到图片路径

    User.updateOne({                //将上传的头像存数据库中
        mobile: req.session.mobile
    }, {
        $set: {
            pic: path
        }
    }).then(result => {
        res.json({
            msg: '头像上传成功',
            code: 200,
            pic: path,
            type: 1,
            mobile: req.session.mobile,
            result
        })
    })
})

//根据手机号获取图片
router.post("/getImg", (req, res) => {
    User.findOne({
        mobile: req.session.mobile
    }).then(result => {
        if (result.pic) {
            res.json({
                msg: '获取头像成功',
                code: 200,
                result,
                type: 1
            })
        } else {
            res.json({
                msg: '获取头像失败',
                code: 200,
                result,
                type: 0
            })
        }
    })
})








module.exports = router