

var jwt = require("jsonwebtoken");

//创建密钥
const serect = "wh2020-daydayup";


// 加密  data是需要加密的字段 (手机号)
exports.createToken = function (data) {
    return jwt.sign(data, serect)
}

//解密
const decodeToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, serect, function (err, data) {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.decodeToken = decodeToken;    //这里为什么不能在上面写暴露

//获取token里面解密的手机号  封装，免得每次都像react.js中getMobile接口那样获取
// 这不是中间件，中间件标志next()    sudian vue中是中间件
exports.getMobile = function (req, res, callback) {
    var token = req.headers.token;
    if (token) {
        decodeToken(token).then(mobile => {
            callback(mobile)   //callback  表示要执行的结果
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
}