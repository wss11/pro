const crypto = require("crypto");   // Node 自带API 

// 加密函数  
// data 为需要加密的字段    key 为密钥
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;  // 密文  
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;  // 明文 
}

const keys = "wuhan1910";   //   zklabc ==> zklabcwuhan1910 

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 


// a.  请求头 没有 token  
// b.  请求头 有 token    后端 存储 token 已经消失
// c.  前端 发送 的请求头的 token 与 存储 在后台 的token 不一样  

//中间件
exports.checkToken = function (req, res, next) {
    console.log("middleware-中间件")
    const client_token = req.headers.token;   //从客户端，跟请求一起发过来
    const server_token = req.session.token;   // 服务器，登陆成功存储的  req.session
    console.log("client_token ==== " + client_token)
    console.log("server_token ==== " + server_token);
    //此时打印session是undefined，出现跨域问题（因为前后端分离）


    //有两个路径不需要做拦截
    console.log(req.path);
    //有2个不需要拦截

    if (req.path !== "/vue/login" && req.path !== "/vue/register") {

        if (client_token) {
            if (server_token) {
                if (client_token == server_token) {
                    next();
                } else {
                    res.json({
                        msg: "token验证失败，请重新登录",
                        code: 3000,
                        type: 0
                    })
                }

            } else {
                res.json({
                    msg: "token已经过期，请重新登录",
                    code: 3000,
                    type: 0
                })
            }

        } else {
            res.json({
                msg: "token不存在，请重新登录",
                code: 3000,
                type: 0
            })
        }
    } else {
        next();
    }





}