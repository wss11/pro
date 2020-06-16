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
// b.  前端 发送 的请求头的 token 与 存储 在后台 的token 不一样  
// c.  请求头 有 token    后端 存储 token 已经消失

